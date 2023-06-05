class Pokemon < ApplicationRecord
  belongs_to :user
  has_many :pokemon_attacks, dependent: :destroy
  has_many :attacks, through: :pokemon_attacks
  has_many :votes

  validates :name, presence: true
  validates :bio, presence: true, length: { minimum: 20 }
end
