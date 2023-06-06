class PokemonsController < ApplicationController
  def new
    @pokemon = Pokemon.new
  end

  def index
    @pokemons = Pokemon.all
  end
end
