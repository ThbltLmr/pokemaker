import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map-home"
// export default class extends Controller {
//   connect() {
//     const player = document.querySelector('.player')
//   const player_pos = {
//       x: parseInt(window.innerWidth / 2),
//       y: parseInt(window.innerHeight / 2)
//   }
//   const player_vel = {
//       x: 0,
//       y: 0
//   }
//   const backgroundWidth = 1600;
//   const backgroundHeight = 1000;

//   const redirectPage = "https://www.google.com";

//   function run(){
//     player_pos.x += player_vel.x
//     player_pos.y += player_vel.y

//       if (player_pos.x < 0) {
//         player_pos.x = 0;
//       }
//       if (player_pos.x > backgroundWidth - player.offsetWidth) {
//         player_pos.x = backgroundWidth - player.offsetWidth;
//       }
//       if (player_pos.y < 0) {
//         player_pos.y = 0;
//       }
//       if (player_pos.y > backgroundHeight - player.offsetHeight) {
//         player_pos.y = backgroundHeight - player.offsetHeight;
//       }

//       player.style.left = player_pos.x + 'px'
//       player.style.bottom = player_pos.y + 'px'

//       console.log('x', player_pos.x)
//       console.log('y', player_pos.y)

//     if (player_pos.x === 500 && player_pos.y === 500) {
//       window.location.href = redirectPage;
//       return;
//     }

//       requestAnimationFrame(run)
//   }
//       run()

//   window.addEventListener('keydown', function(e){
//       if(e.key == "ArrowUp"){
//           player_vel.y = 3
//           player.style.backgroundImage = 'url("image/player_front.png")'
//       }
//       if(e.key == "ArrowDown"){
//           player_vel.y = -3
//           player.style.backgroundImage = 'url("image/player_back.png")'
//       }
//       if(e.key == "ArrowLeft"){
//           player_vel.x = -3
//           player.style.backgroundImage = 'url("image/player_left.png")'
//       }
//       if(e.key == "ArrowRight"){
//           player_vel.x = 3
//           player.style.backgroundImage = 'url("image/player_right.png")'
//       }
//       player.classList.add('active')
//   })
//   window.addEventListener('keyup', function(){
//       player_vel.x = 0
//       player_vel.y = 0
//       player.classList.remove('active')
//   })
//   }
// }
