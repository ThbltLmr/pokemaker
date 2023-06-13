import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="message"
export default class extends Controller {
  static targets = ["messages","input"]
  static values = {sentences: Array}

  connect() {
    console.log("You're in message")
  }

  send(event) {
    console.log("Message sent");
    const input = this.inputTarget.value;
    this.messagesTarget.insertAdjacentHTML("beforeend", `<div>${input}</div>`);
    event.preventDefault();
    setTimeout(() => {
      this.inputTarget.value = "";
    }, 10);
    setTimeout(() => {
      this.messagesTarget.insertAdjacentHTML("beforeend", `<div>this.sentencesValue</div>` )
    }, 2000);
  }

  randomSentence() {
    
  }
}
