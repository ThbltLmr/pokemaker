import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="message"
export default class extends Controller {
  static targets = ["messages","input"]
  static values =
  connect() {
    console.log("You're in message")
  }

  send(event) {
    console.log("Message sent");
    const input = this.inputTarget.value;
    // const newDiv = document.createElement("div");
    // newDiv.value = input
    this.messagesTarget.insertAdjacentHTML("beforeend", `<div>${input}</div>`);
    event.preventDefault();
    setTimeout(() => {
      this.inputTarget.value = "";
    }, 10);
  }
}
