import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="message"
export default class extends Controller {
  static targets = ["messages","input"]
  static values = {sentences: Array}

  send(event) {
    const input = this.inputTarget.value;
    this.messagesTarget.insertAdjacentHTML("beforeend", `<div class="right">${input}</div>`);
    // this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)

    event.preventDefault();

    setTimeout(() => {
      this.inputTarget.value = "";
    }, 10);

    setTimeout(() => {
      this.showTypingBubble();
    }, 1000);

    setTimeout(() => {
      this.hideTypingBubble();
      const randomIndex = Math.floor(Math.random() * this.sentencesValue.length);
      const response = this.sentencesValue[randomIndex]
      this.messagesTarget.insertAdjacentHTML("beforeend", `<div>${response}</div>` )
    }, 3000);
  }

  showTypingBubble() {
    this.messagesTarget.insertAdjacentHTML("beforeend", `<div class="pokemon-message"><span class="typing-bubble"></span><span class="typing-bubble"></span><span class="typing-bubble"></span></div>`);
  }

  hideTypingBubble() {
    const typingBubble = this.messagesTarget.querySelector('.pokemon-message:last-child');
    if (typingBubble) {
      typingBubble.remove();
    }
  }
}
