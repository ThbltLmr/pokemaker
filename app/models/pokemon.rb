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
    MidJourneyClient.new(self).call(true) if step == "prompt"
    self.step = STEPS[STEPS.index(step.to_sym) + 1]
  end

  def last_step?
    step == STEPS[-1].to_s
  end

  def instructions_for(key)
    step_instructions = {
      name: ["Hello, I am Pr. Chen! Welcome to my lab!<br>My assistant tells me you would like to create a new Pokemon<br>What would you like to name your Pokemon?"],
      types: ["Very well, your pokemon is called #{name}.<br>What are the types of your Pokemon? (up to two)"],
      prompt: ["Understood!<br>Can you please describe the physical appearance of your Pokemon?<br>Give as much detail as possible."],
      attacks: ["We will now choose the abilities of your Pokemon!<br>Please choose three abilities for your Pokemon"],
      bio: ["It is time to write a short description of your Pokemon!<br>You can describe your Pokemon's personality, its habitat, its favourite food..."]
    }
    step_instructions[key.to_sym]
  end
end
