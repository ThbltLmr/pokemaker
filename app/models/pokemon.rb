class Pokemon < ApplicationRecord
  attr_accessor :step, :type_ids, :attack_ids, :task_id

  belongs_to :user
  has_many :pokemon_attacks, dependent: :destroy
  has_many :attacks, through: :pokemon_attacks
  has_many :votes
  has_many :pokemon_types, dependent: :destroy
  has_many :types, through: :pokemon_types
  has_one_attached :photo

  STEPS = [:name, :types, :prompt, :attacks, :bio]

  with_options if: -> { step == "name" } do
    validates :name, presence: true
  end

  # with_options if: -> { step == "bio" } do
  #   validates :bio, presence: true, length: { minimum: 20 }
  # end

  def current_step
    (step || STEPS[0]).to_s
  end

  def next_step!
    # MidJourneyClient.new(self).call if step == "prompt"
    self.step = STEPS[STEPS.index(step.to_sym) + 1]
  end

  def last_step?
    step == STEPS[-1].to_s
  end
end
