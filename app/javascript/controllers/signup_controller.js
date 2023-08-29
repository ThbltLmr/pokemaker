import { Controller } from "@hotwired/stimulus"

// Handles the signup/signin form with animation when switching from left panel to right panel
export default class extends Controller {
  connect() {
    console.log("in signup controller")
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('containerSign');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

  }
}
