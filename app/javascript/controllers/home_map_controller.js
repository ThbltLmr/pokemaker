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

    function run(){
        player_pos.x += player_move.x
        player_pos.y += player_move.y

        player.style.left = player_pos.x + 'px'
        player.style.bottom = player_pos.y + 'px'

        requestAnimationFrame(run)
    }

    window.addEventListener('keydown', function(e){
        if(e.key == "ArrowUp"){
            player_move.y = 3
            player.style.backgroundImage = 'url("image/player_front.png")'
        }

        if(e.key == "ArrowDown"){
            player_move.y = -3
            player.style.backgroundImage = 'url("image/player_back.png")'
        }
        if(e.key == "ArrowLeft"){
            player_move.x = -3
            player.style.backgroundImage = 'url("image/player_left.png")'
        }
        if(e.key == "ArrowRight"){
            player_move.x = 3
            player.style.backgroundImage = 'url("image/player_right.png")'
        }
        player.classList.add('active')
    })

    window.addEventListener('keyup', function(){
        player_move.x = 0
        player_move.y = 0
        player.classList.remove('active')
    })
  }
}
