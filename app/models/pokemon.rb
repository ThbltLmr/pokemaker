class Pokemon < ApplicationRecord
  attr_accessor :step, :type_one, :type_two

  belongs_to :user
  has_many :pokemon_attacks, dependent: :destroy
  has_many :attacks, through: :pokemon_attacks
  has_many :votes
  has many :pokemon_types, dependent: :destroy
  has_many :types, through: :pokemon_types

  STEPS = [:name, :types, :prompt, :attacks, :bio]

  with_options if: -> { step == "name" } do
    validates :name, presence: true
  end

  with_options if: -> { step == "bio" } do
    validates :bio, presence: true, length: { minimum: 20 }
  end

  def current_step
    (step || STEPS[0]).to_s
  end

  def next_step!
    self.step = STEPS[STEPS.index(step.to_sym) + 1]
  end

  def last_step?
    step == STEPS[-1]
  end
end
