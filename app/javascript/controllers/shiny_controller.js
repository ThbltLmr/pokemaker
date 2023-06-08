import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="shiny"
export default class extends Controller {
  connect() {
    console.log("check")
    const el = this.element;
// const wrap = document.querySelector(".card__wrapper");
    let w = el.clientWidth;
    let h = el.clientHeight;
    let b = el.getBoundingClientRect();
    el.addEventListener("mousemove", (e) => {
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
    });
  }
}
