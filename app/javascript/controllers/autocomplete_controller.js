import { Controller } from "@hotwired/stimulus"

// autocompletes the search bar for Pokemon attacks
export default class extends Controller {
  static targets = ['search', 'list', 'attacks']
  static values = {
    id: Number
  }

  connect() {
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

  addAttack(attack, id) {
    this.attacksTarget.insertAdjacentHTML("beforeend",
    `<div class='attack-tag d-flex me-2'><p>${attack}</p><button data-action='click->autocomplete#remove' id=${id}><i class="fa-solid fa-xmark"></i></button>`
    )
  }

  remove(event) {
    const id = event.currentTarget.id;
    const select = this.element.querySelector("select")
    select.querySelector(`option[value="${id}"]`).removeAttribute("selected")
    event.currentTarget.parentNode.remove()
  }

  fill(event) {
    event.preventDefault()
    const id = event.currentTarget.firstChild.id
    console.log(id)
    const select = this.element.querySelector("select")
    if (select.querySelectorAll("option[selected='selected']").length > 2) {
      window.alert("You have already selected three attacks");
      this.listTarget.innerHTML = ""
    } else {
      select.querySelector(`option[value="${id}"]`).selected = "selected"
      const attackName = select.querySelector(`option[value="${id}"]`).innerText
      this.addAttack(attackName, id)
      this.listTarget.innerHTML = "";
      this.searchTarget.value = "";
    }
  }
}
