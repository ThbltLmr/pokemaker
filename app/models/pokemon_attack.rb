class PokemonAttack < ApplicationRecord
  # join table between pokemons and attacks
  belongs_to :pokemon
  belongs_to :attack
end
