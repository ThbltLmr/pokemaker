import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="pokemon"
export default class extends Controller {
  static targets = ['step']

  connect() {
    console.log('hello')
    console.log(this.stepTarget)
  }
}
