import { Controller } from "@hotwired/stimulus"
import Typed from "typed.js";

// Connects to data-controller="typed"
export default class extends Controller {
  static values = {
    dialog: Array
  }

  connect() {
    console.log("hey")
    console.log(this.dialogValue)
    const options = {strings: this.dialogValue, typeSpeed: 25, fadeOut: false, showCursor: false};
    new Typed(this.element, options);
  }
}
