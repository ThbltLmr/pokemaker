import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="profile"
export default class extends Controller {
  connect() {
    console.log("You're in profile")
  }

  render() {
    
  }
}
