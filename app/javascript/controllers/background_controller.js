import { Controller } from "@hotwired/stimulus"

// determines the background color of the card based on the Pokemon's type
export default class extends Controller {
  static targets = ["card"]
  static values = {
    type: String
  }


  connect() {
    this.cardTarget.classList.add(this.typeValue)
  }

}
