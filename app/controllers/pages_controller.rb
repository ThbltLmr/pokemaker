class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
  end

  def map
  end

  # select the user's pokemons
  def profile
    @pokemons = Pokemon.where(user: current_user)
  end
end
