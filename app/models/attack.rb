class Attack < ApplicationRecord
  has_many :pokemon_attacks
  has_many :pokemons, through: :pokemon_attacks

  validates :name, presence: true
  # validates :description, presence: true
end
