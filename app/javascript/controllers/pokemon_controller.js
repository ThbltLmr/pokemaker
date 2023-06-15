import { Controller } from "@hotwired/stimulus"
import Typed from "typed.js";

// Connects to data-controller="pokemon"
export default class extends Controller {
  static targets = ['step', 'types', 'form', 'gif', 'chen', "background"]

  connect() {
    // this.element.querySelectorAll("select").forEach((dropdown) => {
    //   dropdown.removeAttribute("multiple")
    // });
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
      // this.chenTarget.classList.add("container-reveal")
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
        this.formTarget.classList.add("background-black")
        this.formTarget.classList.add("hundred")
        this.formTarget.insertAdjacentHTML("beforeend",
        "<div class='d-flex justify-content-center mt-2'><a href='/pokemons' class='text-decoration-none mt-2 mx-2'><button class='btn btn-primary text-white mt-2'>To Pokemon gallery</button></a><a href='/profile' class='text-decoration-none mt-2 mx-2'><button class='btn btn-primary text-white mt-2'>To your profile</button></a></div>"
        )
      }
    } else {
      this.stepTarget.innerHTML = data.html
      // this.fuckMultiple()
    }
  }

  checkboxlimit(event) {
    const checkboxes = this.typesTarget.querySelectorAll("input.check_boxes:checked")
    if (checkboxes.length > 2) {
      event.currentTarget.checked = false
      window.alert("Pokemons can only have two types");
    }
  }

  reveal() {

    // this.element.classList.remove("background-black")
    let backgroundPosition = 0

    this.interval = setInterval(() => {
      if (backgroundPosition > 1700) {
        clearInterval(this.interval)
      }
        console.log("You're in the interval", backgroundPosition)
        backgroundPosition+=6;
        this.formTarget.style.backgroundImage = `radial-gradient(${backgroundPosition}px ${backgroundPosition}px at 50% 50%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)`;
    }, 5);
  }

  disconnect() {
    clearInterval(this.interval)
  }
}
