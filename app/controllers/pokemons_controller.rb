class PokemonsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def new
    @pokemon = Pokemon.new
  end

  def create
    @pokemon = Pokemon.new(pokemon_params)
    @pokemon.user = current_user

    if @pokemon.valid?
      @pokemon.next_step!
      render json: { html: partial }
    end
  end

  private

  def partial
    render_to_string(partial: "pokemons/form", locals: { f: form_builder }, formats: [:html])
  end

  def form_builder
    view_context.simple_form_for(
      @pokemon
    ) { |builder| break builder }
  end

  def pokemon_params
    params.require(:pokemon).permit(:step, :prompt, :name, :types)
  end
end
