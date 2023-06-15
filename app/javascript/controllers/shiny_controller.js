import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="shiny"
export default class extends Controller {
  static targets = ["movement", "back", "front", "layer1", "layer2", "buttons"]

  connect() {
    console.log("check")

    this.stop = true

    document.documentElement.style.setProperty("--x", 50 + "%");
    document.documentElement.style.setProperty("--y", 50 + "%");

    document.documentElement.style.setProperty("--bg-x", 50 + "%");
    document.documentElement.style.setProperty("--bg-y", 50 + "%");

    document.documentElement.style.setProperty("--r-x", -180 + "deg");
    document.documentElement.style.setProperty("--r-y", 0 + "deg");
  }

  shine(e) {
    if (this.stop == true) return

    const el = this.element;
    // const wrap = document.querySelector(".card__wrapper");
    let w = el.clientWidth;
    let h = el.clientHeight;
    let b = el.getBoundingClientRect();

    let X = (e.clientX - b.left) / w;
    let Y = (e.clientY - b.top) / h;

    let rX = -(X - 0.5) * 26;
    let rY = (Y - 0.5) * 26;

    let bgX = 40 + 20 * X;
    let bgY = 40 + 20 * Y;

    console.log(X, Y);

    document.documentElement.style.setProperty("--x", 100 * X + "%");
    document.documentElement.style.setProperty("--y", 100 * Y + "%");

    document.documentElement.style.setProperty("--bg-x", bgX + "%");
    document.documentElement.style.setProperty("--bg-y", bgY + "%");

    document.documentElement.style.setProperty("--r-x", rX + "deg");
    document.documentElement.style.setProperty("--r-y", rY + "deg");
  }

  turn() {

    this.stop = true

    this.movementTarget.classList.add("smooth")
    document.documentElement.style.setProperty("--r-x", 0 + "deg");

    setTimeout(() => {
      this.backTarget.classList.add("d-none")
      this.frontTarget.classList.remove("d-none")
      this.layer1Target.classList.remove("d-none")
      this.layer2Target.classList.remove("d-none")
    }, 200);

    setTimeout(() => {
      this.stop = false
      this.movementTarget.classList.remove("smooth")
    }, 1000);

    // setTimeout(() => {
    //   this.buttonsTarget.classList.remove("d-none")
    // }, 2000);
  }
}
