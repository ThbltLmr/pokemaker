import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="pokemon"
export default class extends Controller {
  static targets = ['step']

  connect() {
    console.log('hello')
    console.log(this.stepTarget)
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
    this.element.innerHTML = data.html
  }
}
