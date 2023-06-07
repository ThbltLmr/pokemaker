import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="pokemon"
export default class extends Controller {
  static targets = ['step', 'types']

  connect() {
    this.element.querySelectorAll("select").forEach((dropdown) => {
      console.log(dropdown);
      dropdown.removeAttribute("multiple")
      // dropdown.innerHTML = "class='form-select select optional' name='pokemon[attack_ids][] id='pokemon_attack-ids"
    });
  }

  fuckMultiple() {
    this.element.querySelectorAll("select").forEach((dropdown) => {
      console.log(dropdown);
      dropdown.removeAttribute("multiple")
      // dropdown.innerHTML = "class='form-select select optional' name='pokemon[attack_ids][] id='pokemon_attack-ids"
    });
  }

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
    this.fuckMultiple()
  }

  checkboxlimit(event) {
    const checkboxes = this.typesTarget.querySelectorAll("input.check_boxes:checked")
    if (checkboxes.length > 2) {
      event.currentTarget.checked = false
      window.alert("Pokemons can only have two types");
    }
  }
}
