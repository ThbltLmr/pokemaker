import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="pokemon"
export default class extends Controller {
  static targets = ['step', 'types']

  connect() {}

  async step(event) {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {"Accept": "application/json"},
      body: new FormData(this.element)
    }

    const response = await fetch("/pokemons", options)
    const data = await response.json()
    this.stepTarget.innerHTML = data.html
  }

  checkboxlimit(event) {
    const checkboxes = this.typesTarget.querySelectorAll("input.check_boxes:checked")
    if (checkboxes.length > 2) {
      event.currentTarget.checked = false
      window.alert("Pokemons can only have two types");
    }
  }
}
