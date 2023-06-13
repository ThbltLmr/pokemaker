import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="background"
export default class extends Controller {
  static targets = ["card"]
  static values = {
    type: String
  }


  connect() {
    this.cardTarget.classList.add(this.typeValue)
  }

}
