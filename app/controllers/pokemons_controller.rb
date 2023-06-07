class PokemonsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def new
    @pokemon = Pokemon.new
  end

  def index
    @pokemons = Pokemon.all
  def create
    @pokemon = Pokemon.new(pokemon_params)
    @pokemon.user = current_user

    # debugger
    if @pokemon.valid?
      if @pokemon.last_step?
        @pokemon.save
        create_types(@pokemon, params.dig(:pokemon, :type_ids))
        create_attacks(@pokemon, params.dig(:pokemon, :attack_ids))
      else
        @pokemon.next_step!
        render json: { html: partial }
      end
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
    params.require(:pokemon).permit(:step, :prompt, :name, :bio)
  end

  def create_types(pokemon, types)
    types[1..].each { |t| PokemonType.create(pokemon: pokemon, type_id: t.to_i) }
  end

  def create_attacks(pokemon, attacks)
    PokemonAttack.create(pokemon: pokemon, attack_id: attacks[1].to_i)
    PokemonAttack.create(pokemon: pokemon, attack_id: attacks[3].to_i)
    PokemonAttack.create(pokemon: pokemon, attack_id: attacks[5].to_i)
  end
end
