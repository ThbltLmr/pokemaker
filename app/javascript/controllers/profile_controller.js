import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="profile"
export default class extends Controller {
  static targets = ["chat", "profile", "flip", "index", "backbutton"]

  connect() {
    // this.chatTarget.style.setProperty("--r-x", -180 + "deg");
  }

  async render(event) {
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
    const response = await fetch(`/pokemons/${id}/chat`, options)
    const data = await response.json()
    this.chatTarget.outerHTML = data.html
    this.turn()
  }

  turn() {
    this.flipTarget.classList.toggle('is-switched')

    setTimeout(() => {
      this.profileTarget.classList.toggle('is-active')
      this.chatTarget.classList.toggle('is-active')
    }, 250);
  }

  async reset() {
    this.turn()
    const options = {
      method: 'GET',
      headers: {"Accept": "application/json"}
    }
    const response = await fetch(`/pokemons`, options)
    const data = await response.json()
    this.indexTarget.classList.remove("flex-column")
    this.backbuttonTarget.classList.add("d-none")
    this.indexTarget.innerHTML = data.html

  }
}
