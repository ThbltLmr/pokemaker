import { Controller } from "@hotwired/stimulus";

// handles music in main menu
export default class extends Controller {
  static values = { defaultMusic: String }

  connect() {
    this.audio = new Audio(this.defaultMusicValue)
    this.audio.addEventListener("canplaythrough", () => {
      this.audio.play().catch(e => {
         window.addEventListener('click', () => {
            this.audio.play()
         }, { once: true })
      })
   });
  }

  playMusic(evt) {
    console.log(evt.params)

    this.audio.pause();
    this.audio.currentTime = 0;
    audio.play()
  }
}
