import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="card"
export default class extends Controller {
  static targets = ['location']

  connect() {
    console.log("card control")
  }

  async show(event) {
    const options = {
      method: 'GET',
      headers: {"Accept": "application/json"}
    }
    let id = 0
    if (event.currentTarget.classList.contains("pokemon-bubble")) {
      id = event.currentTarget.id
    } else {
      id = event.currentTarget.parentNode.id
    }
    console.log(id)
    const response = await fetch(`/pokemons/${id}/card`, options)
    const data = await response.json()
    this.locationTarget.innerHTML = data.html

    if (this.element.classList.contains("home-profile")) {
      this.locationTarget.classList.add("flex-column")
      this.locationTarget.insertAdjacentHTML("beforeend", "<div class='d-flex flex-column justify-content-end gat-1 mt-2'><button class='btn-pixel' data-action='click->profile#reset'>Back</button></div>")
    }
  }
}
