import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { defaultMusic: String }

  connect() {
    // console.log('hello music')
    // this.playMusic();
    this.audio = new Audio(this.defaultMusicValue)
    this.audio.addEventListener("canplaythrough", () => {
      this.audio.play().catch(e => {
         window.addEventListener('click', () => {
            this.audio.play()
         }, { once: true })
      })
   });
  }

  // playMusic(evt) {
  //   console.log(evt.params)

  //   this.audio.pause();
  //   this.audio.currentTime = 0;
  //   audio.play()
  // }
}
