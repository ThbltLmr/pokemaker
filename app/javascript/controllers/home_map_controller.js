import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="home-map"
export default class extends Controller {
  connect() {
    console.log('hello')
    const player = document.querySelector('.player')
    const player_pos = {
        x: parseInt(window.innerWidth / 2),
        y: parseInt(window.innerHeight / 2)
    }
    const player_move = {
        x: 0,
        y: 0
    }

    const backgroundWidth = 1600;
    const backgroundHeight = 1000;

    function run(){
        player_pos.x += player_move.x
        player_pos.y += player_move.y

        if (player_pos.x < 0) {
          player_pos.x = 0;
        }
        if (player_pos.x > backgroundWidth - player.offsetWidth) {
          player_pos.x = backgroundWidth - player.offsetWidth;
        }
        if (player_pos.y < 0) {
          player_pos.y = 0;
        }
        if (player_pos.y > backgroundHeight - player.offsetHeight) {
          player_pos.y = backgroundHeight - player.offsetHeight;
        }

        player.style.left = player_pos.x + 'px'
        player.style.bottom = player_pos.y + 'px'

        requestAnimationFrame(run)
    }
     run()

    window.addEventListener('keydown', function(e){
        if(e.key == "ArrowUp"){
            player_move.y = 3
            player.classList.add('player-front')
            player.classList.remove('player-back', 'player-left', 'player-right')
        }

        if(e.key == "ArrowDown"){
            player_move.y = -3
            player.classList.add('player-back')
            player.classList.remove('player-front', 'player-left', 'player-right')
        }
        if(e.key == "ArrowLeft"){
            player_move.x = -3
            player.classList.add('player-left')
            player.classList.remove('player-back', 'player-front', 'player-right')
        }
        if(e.key == "ArrowRight"){
            player_move.x = 3
            player.classList.add('player-right')
            player.classList.remove('player-back', 'player-left', 'player-front')
        }
        player.classList.add('active')
        if(e.key == "a") {
          window.location = 'http://www.pokemaker.xyz/pokemons/new'
        }

    })

    window.addEventListener('keyup', function(){
        player_move.x = 0
        player_move.y = 0
        player.classList.remove('active')
    })
  }
}
