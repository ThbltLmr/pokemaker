class Pokemon < ApplicationRecord
  attr_accessor :step, :type_ids

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
    if step == "prompt"
      image_url = MidJourneyClient.new(self).call
      image = URI.open(image_url)
      self.photo.attach(io: image, filename: "pokemon.png", content_type: "image/png")
    end
    self.step = STEPS[STEPS.index(step.to_sym) + 1]
  end

  def last_step?
    step == STEPS[-1].to_s
  end
end
