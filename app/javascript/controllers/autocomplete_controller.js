import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="autocomplete"
export default class extends Controller {
  static targets = ['search', 'list']
  static values = {
    id: Number
  }

  connect() {
    console.log("autocomplete")
  }

  async autocomplete() {
    const options = {
      method: 'GET',
      headers: {"Accept": "application/json"}
    }

    const response = await fetch(`/search_attacks/?query=${this.searchTarget.value}`, options)
    const data = await response.json()
    this.listTarget.innerHTML = data.html
  }

  fill(event) {
    event.preventDefault()
    console.log(event.currentTarget.firstChild)
    const id = event.currentTarget.firstChild.id
    console.log(id)
    const select = this.element.querySelector("select")
    select.querySelector(`option[value="${id}"]`).selected = "selected"
    console.log(select)
    console.log(select.querySelector(`option[value="${id}"]`))
    this.listTarget.innerHTML = ""
  }
}
