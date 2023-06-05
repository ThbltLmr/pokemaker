class PokemonAttack < ApplicationRecord
  belongs_to :pokemon
  belongs_to :attack
end
