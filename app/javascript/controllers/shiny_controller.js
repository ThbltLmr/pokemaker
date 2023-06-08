import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="shiny"
export default class extends Controller {
  connect() {
    console.log("check")

    let intensity_x = document.documentElement.style.setProperty("--x", 100 * X + "%");
    let intensity_y = document.documentElement.style.setProperty("--y", 100 * Y + "%");

    let diagonal_x = document.documentElement.style.setProperty("--bg-x", bgX + "%");
    let diagonal_y = document.documentElement.style.setProperty("--bg-y", bgY + "%");

    let rotation_x = document.documentElement.style.setProperty("--r-x", -1.364208 + "deg");
    let rotation_y = document.documentElement.style.setProperty("--r-y", -0.41755888650963624 + "deg");

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
      intensity_x = document.documentElement.style.setProperty("--x", 100 * X + "%");
      intensity_y = document.documentElement.style.setProperty("--y", 100 * Y + "%");

      diagonal_x = document.documentElement.style.setProperty("--bg-x", bgX + "%");
      diagonal_y = document.documentElement.style.setProperty("--bg-y", bgY + "%");

      rotation_x = document.documentElement.style.setProperty("--r-x", rX + "deg");
      rotation_y = document.documentElement.style.setProperty("--r-y", rY + "deg");
    });
  }
}
