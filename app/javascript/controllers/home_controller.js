import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="home"
export default class extends Controller {
  reveal(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    evt.currentTarget.classList.add('swashOut')
  }
}
