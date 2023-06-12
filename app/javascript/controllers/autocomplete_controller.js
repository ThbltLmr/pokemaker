import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="autocomplete"
export default class extends Controller {
  static targets = ['search', 'list', 'attackOne', 'attackTwo', 'attackThree']

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
    const input = event.currentTarget.innerText
    console.log(input)
    console.log(this.attackOneTarget)
    if (this.attackOneTarget.value === "") {
      this.attackOneTarget.value = input
    } else if (this.attackTwoTarget.value === "") {
      this.attackTwoTarget.value = input
    } else {
      this.attackThreeTarget.value = input
    }
    this.listTarget.innerHTML = ""
  }
}
