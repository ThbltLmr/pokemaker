import { Controller } from "@hotwired/stimulus"

// handles movement of character in main menu
export default class extends Controller {
  static values = { intersected: Boolean }
  static targets = ['item', 'player']

  connect() {
    const player = document.querySelector('.player')
    const player_pos = {
        x: parseInt(window.innerWidth / 2),
        y: parseInt(window.innerHeight / 2)
    }
    const player_move = {
        x: 0,
        y: 0
    }

    const backgroundWidth = window.innerWidth;
    const backgroundHeight = window.innerHeight;

    var that = this

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

        that.itemTargets.forEach(item => {
          if (that._isIntersecting(player, item)) {
            // Check if this item has already been intersected
            if (item.dataset.intersected == "false") {
              const url = item.dataset.url;
              const a = document.createElement('a');
              a.href = url;
              a.click();

              item.dataset.intersected = 'true';
            }
          } else {
            item.dataset.intersected = 'false';
          }
        });

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
          window.location = '/pokemons/new'
        }

    })

    window.addEventListener('keyup', function(){
        player_move.x = 0
        player_move.y = 0
        player.classList.remove('active')
    })
  }

  _isIntersecting(player, item) {
    const playerRect = player.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    return (
      playerRect.left < itemRect.right &&
      playerRect.right > itemRect.left &&
      playerRect.top < itemRect.bottom &&
      playerRect.bottom > itemRect.top
    );
  }
}
