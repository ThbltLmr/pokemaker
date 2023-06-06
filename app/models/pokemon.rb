class Pokemon < ApplicationRecord
  attr_accessor :step

  belongs_to :user
  has_many :pokemon_attacks, dependent: :destroy
  has_many :attacks, through: :pokemon_attacks
  has_many :votes



  with_options if: -> { step == "name" } do
    validates :name, presence: true
  end

  with_options if: -> { step == "bio" } do
    validates :bio, presence: true, length: { minimum: 20 }
  end
end
