import { Controller } from "@hotwired/stimulus"
import Typed from "typed.js";

// Connects to data-controller="pokemon"
export default class extends Controller {
  static targets = ['step', 'types', 'form', 'gif', 'chen']

  connect() {
    this.element.querySelectorAll("select").forEach((dropdown) => {
      dropdown.removeAttribute("multiple")
    });
  }

  fuckMultiple() {
    this.element.querySelectorAll("select").forEach((dropdown) => {
      dropdown.removeAttribute("multiple")
    });
  }

  async step(event) {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {"Accept": "application/json"},
      body: new FormData(this.formTarget)
    }

    const response = await fetch("/pokemons", options)
    const data = await response.json()
    if (document.getElementById("pokemon_step").value === 'bio') {
      this.chenTarget.classList.remove("container-shen")
      this.chenTarget.classList.add("container-reveal")
      if (data.html.includes("loading")) {
        this.chenTarget.classList.add("d-none")
        this.gifTarget.classList.remove("d-none")
        this.gifTarget.innerHTML = data.html
        setTimeout(() => {
          console.log("loading");
          this.step(event);
        }, 500);
      } else {
        console.log("done loading");
        this.chenTarget.classList.remove("d-none")
        this.gifTarget.innerHTML = ""
        this.formTarget.innerHTML = data.html
        this.formTarget.insertAdjacentHTML("beforeend",
        "<a href='/pokemons' class='text-decoration-none align-self-center mt-2'><button class='btn btn-primary text-white'>To Pokemon gallery</button></a>"
        )
      }
    } else {
      this.stepTarget.innerHTML = data.html
      this.fuckMultiple()
    }
  }

  checkboxlimit(event) {
    const checkboxes = this.typesTarget.querySelectorAll("input.check_boxes:checked")
    if (checkboxes.length > 2) {
      event.currentTarget.checked = false
      window.alert("Pokemons can only have two types");
    }
  }
}
