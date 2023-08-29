class PokemonsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :card]

  # limit number of created pokemons to 6 per user
  def new
    @pokemon = Pokemon.new
    if current_user.pokemons.count >= 6
      redirect_to root_path, alert: "You have already created the maximum number of pokemons allowed"
    end
  end

  # return latest created pokemons
  def index
    @pokemons = Pokemon.includes(:votes).all.sort_by(&:created_at).reverse
    respond_to do |format|
      format.html
      format.json {
        render json: {
          html: render_to_string(partial: "pokemons/six_pokemons", locals: { pokemons: Pokemon.includes(:votes).where(user: current_user).sort_by(&:created_at).reverse }, formats: [:html])
        }
      }
    end
  end

  # return the pokemon card partial
  def card
    @pokemon = Pokemon.find(params[:id])
    render json: { html: render_card(@pokemon) }
  end

  # return the pokemon chat partial
  def chat
    @pokemon = Pokemon.find(params[:id])
    render json: { html: render_chat(@pokemon) }
  end

  # create a new pokemon
  # at each step, checks if the pokemon is valid and return the next step of the form if valid
  # at the 'prompt' step, if the prompt is valid, the 'next_step!' method will make the MidJourney API call to start image generation
  # at the last_step, if the image has already been generated, the image is attached and the Pokemon is saved
  # if the image has not been generated, the loading partial is rendered
  # the pokemon types and attacks are created (using the PokemonType and PokemonAttack models)
  def create
    @pokemon = Pokemon.new(pokemon_params)
    @pokemon.user = current_user

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

  # render the form partial, with the form in the current step (see form_builder method)
  def partial
    render_to_string(partial: "pokemons/form", locals: { f: form_builder }, formats: [:html])
  end

  # render the pokemon card partial, with the image hidden and the shining animation when revealed
  def reveal(pokemon)
    render_to_string(partial: "shared/pokemon_card", locals: { pokemon: pokemon, shine: true, revealed: false }, formats: [:html])
  end

  # render the pokemon card partial, with the image revealed
  def render_card(pokemon)
    render_to_string(partial: "shared/pokemon_card", locals: { pokemon: pokemon, shine: false, revealed: true }, formats: [:html])
  end

  # render the pokemon chat in the profile page
  def render_chat(pokemon)
    render_to_string(partial: "pokemons/chat", locals: { pokemon: pokemon }, formats: [:html])
  end

  # render the loading partial (gif of Pikachu running)
  def loading
    render_to_string(partial: "pokemons/loading", formats: [:html])
  end

  # create a simple form instance with the current pokemon instance
  def form_builder
    view_context.simple_form_for(
      @pokemon
    ) { |builder| break builder }
  end

  # strong params
  def pokemon_params
    params.require(:pokemon).permit(:step, :prompt, :name, :bio, :task_id, :types_ids, :attack_ids)
  end

  # create the pokemon types
  def create_types(pokemon, types)
    types[1..].each { |t| PokemonType.create(pokemon: pokemon, type_id: t.to_i) }
  end

  # create the pokemon attacks
  def create_attacks(pokemon, attacks)
    PokemonAttack.create(pokemon: pokemon, attack_id: attacks[0].to_i) if attacks.length > 0
    PokemonAttack.create(pokemon: pokemon, attack_id: attacks[1].to_i) if attacks.length > 1
    PokemonAttack.create(pokemon: pokemon, attack_id: attacks[2].to_i) if attacks.length > 2
  end
end
