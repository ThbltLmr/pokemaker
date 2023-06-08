import { Controller } from "@hotwired/stimulus"
import Typed from "typed.js";

// Connects to data-controller="pokemon"
export default class extends Controller {
  static targets = ['step', 'types', 'form', 'chen']

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
      console.log
      this.stepTarget.innerHTML = ""
      this.element.classList.remove("container-shen")
      this.formTarget.innerHTML = data.html
    } else {
      this.stepTarget.innerHTML = data.html
      this.fuckMultiple()
    }

    const current_chen = this.chenTarget.querySelector("div:not(.d-none)")
    opti
  }

  checkboxlimit(event) {
    const checkboxes = this.typesTarget.querySelectorAll("input.check_boxes:checked")
    if (checkboxes.length > 2) {
      event.currentTarget.checked = false
      window.alert("Pokemons can only have two types");
    }
  }
}
