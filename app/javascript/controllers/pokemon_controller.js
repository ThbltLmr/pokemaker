import { Controller } from "@hotwired/stimulus"
import Typed from "typed.js";

// handles the step form for Pokemon creation (re-renders the form based on the step)
export default class extends Controller {
  static targets = ['step', 'types', 'form', 'gif', 'chen', 'background']

  connect() {
  }

  // simple form automatically creates select input with the multiple attribute, the function removes it
  fuckMultiple() {
    this.element.querySelectorAll("select").forEach((dropdown) => {
      dropdown.removeAttribute("multiple")
    });
  }

  async step(event) {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {"Accept": "application/json"},
      body: new FormData(this.formTarget)
    }

    const response = await fetch("/pokemons", options)
    const data = await response.json()
    // when switching to the last step, renders the loading animation if the image is not ready, the card otherwise
    if (document.getElementById("pokemon_step").value === 'bio') {
      this.chenTarget.classList.remove("container-shen")
      if (data.html.includes("loading")) {
        this.chenTarget.classList.add("d-none")
        this.gifTarget.classList.remove("d-none")
        this.gifTarget.innerHTML = data.html
        // check if image is now ready every 500ms
        setTimeout(() => {
          console.log("loading");
          this.step(event);
        }, 500);
      } else {
        console.log("done loading");
        this.chenTarget.classList.remove("d-none")
        this.gifTarget.innerHTML = ""
        this.formTarget.innerHTML = data.html
        this.formTarget.classList.add("background-black")
        this.formTarget.classList.add("hundred")
      }
    } else {
      this.stepTarget.innerHTML = data.html
    }
  }

  // checks that user has not selected more than 2 types
  checkboxlimit(event) {
    const checkboxes = this.typesTarget.querySelectorAll("input.check_boxes:checked")
    if (checkboxes.length > 2) {
      event.currentTarget.checked = false
      window.alert("Pokemons can only have two types");
    }
  }

  reveal() {
    let backgroundPosition = 0

    this.interval = setInterval(() => {
      if (backgroundPosition > 1700) {
        clearInterval(this.interval)
      }
        console.log("You're in the interval", backgroundPosition)
        backgroundPosition+=6;
        this.formTarget.style.backgroundImage = `radial-gradient(${backgroundPosition}px ${backgroundPosition}px at 50% 50%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)`;
    }, 5);
  }

  disconnect() {
    clearInterval(this.interval)
  }
}
