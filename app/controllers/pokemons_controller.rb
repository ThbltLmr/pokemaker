class PokemonsController < ApplicationController
  def new
    @pokemon = Pokemon.new
  end

  def create
    @pokemon = Pokemon.new(pokemon_params)
    @pokemon.user = current_user
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(:step, :prompt, :name)
  end
end
