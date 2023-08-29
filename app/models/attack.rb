class Attack < ApplicationRecord
  # pokemon attacks seeded from pokeAPI
  has_many :pokemon_attacks
  has_many :pokemons, through: :pokemon_attacks

  validates :name, presence: true
end
