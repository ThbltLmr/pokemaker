import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="controller-signup"
export default class extends Controller {
  connect() {
    console.log("in signup controller")
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('containerSign');
    // const background = document.querySelector('.background-signup');

    // signUpButton.addEventListener('click', () => {
    //   background.classList.toggle('background-translate');
    // });

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

  }
}
