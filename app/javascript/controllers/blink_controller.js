import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="blink"
export default class extends Controller {
  connect() {
    setInterval(function() {
      const blink = document.getElementById("blink")
      blink.style.opacity = (blink.style.opacity == 0 ? 1 : 0);
    }, 800);
  }
}
