class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :pokemons, dependent: :destroy
  has_many :votes

  validates :nickname, presence: true, length: { minimum: 5, maximum: 20 }
end
