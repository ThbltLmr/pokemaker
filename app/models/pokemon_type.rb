class PokemonType < ApplicationRecord
  # join table between pokemons and types
  belongs_to :pokemon
  belongs_to :type
end
