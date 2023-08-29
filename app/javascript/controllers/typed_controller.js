import { Controller } from "@hotwired/stimulus"
import Typed from "typed.js";

// adds typed.js to the pokemon creation form
export default class extends Controller {
  static values = {
    dialog: Array
  }

  connect() {
    const options = {strings: this.dialogValue, typeSpeed: 15, fadeOut: false, showCursor: false};
    new Typed(this.element, options);
  }
}
