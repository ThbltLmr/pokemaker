class PokemonsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :card]

  def new
    @pokemon = Pokemon.new
  end

  def index
    @pokemons = Pokemon.includes(:votes).all.sort_by(&:created_at).reverse
    respond_to do |format|
      format.html
      format.json {
        render json: {
          html: render_to_string(partial: "pokemons/six_pokemons", locals: { pokemons: @pokemons }, formats: [:html])
        }
      }
    end
  end

  def card
    @pokemon = Pokemon.find(params[:id])
    render json: { html: render_card(@pokemon) }
  end

  def chat
    @pokemon = Pokemon.find(params[:id])
    render json: { html: render_chat(@pokemon) }
  end

  def create
    @pokemon = Pokemon.new(pokemon_params)
    @pokemon.user = current_user

    # debugger
    if @pokemon.valid?
      if @pokemon.last_step?
        MidJourneyResult.new(@pokemon).call
        if @pokemon.photo.attached?
          @pokemon.save
          @attacks = params.dig(:pokemon, :attacks).split
          create_types(@pokemon, params.dig(:pokemon, :type_ids))
          create_attacks(@pokemon, @attacks)
          render json: { html: reveal(@pokemon) }
        else
          render json: { html: loading }
        end
      else
        @pokemon.next_step!
        render json: { html: partial }
      end
    else
      render json: { html: partial }, status: :unprocessable_entity
    end
  end

  private

  def partial
    render_to_string(partial: "pokemons/form", locals: { f: form_builder }, formats: [:html])
  end

  def reveal(pokemon)
    render_to_string(partial: "shared/pokemon_card", locals: { pokemon: pokemon, shine: true, revealed: false }, formats: [:html])
  end

  def render_card(pokemon)
    render_to_string(partial: "shared/pokemon_card", locals: { pokemon: pokemon, shine: false, revealed: true }, formats: [:html])
  end

  def render_chat(pokemon)
    render_to_string(partial: "pokemons/chat", locals: { pokemon: pokemon }, formats: [:html])
  end

  def loading
    render_to_string(partial: "pokemons/loading", formats: [:html])
  end

  def form_builder
    view_context.simple_form_for(
      @pokemon
    ) { |builder| break builder }
  end

  def pokemon_params
    params.require(:pokemon).permit(:step, :prompt, :name, :bio, :task_id, :types_ids, :attack_ids)
  end

  def create_types(pokemon, types)
    types[1..].each { |t| PokemonType.create(pokemon: pokemon, type_id: t.to_i) }
  end

  def create_attacks(pokemon, attacks)
    PokemonAttack.create(pokemon: pokemon, attack_id: attacks[0].to_i) if attacks.length > 0
    PokemonAttack.create(pokemon: pokemon, attack_id: attacks[1].to_i) if attacks.length > 1
    PokemonAttack.create(pokemon: pokemon, attack_id: attacks[2].to_i) if attacks.length > 2
  end
end
