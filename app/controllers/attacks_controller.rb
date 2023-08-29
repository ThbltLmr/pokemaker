class AttacksController < ApplicationController
  # autocomplete search when user types in search bar for attacks
  def search
    @attacks = Attack.where("name ILIKE ?", "%#{params[:query]}%").limit(3)
    render json: { html: render_to_string(partial: "attacks/search", locals: { attacks: @attacks }, formats: [:html]) }
  end
end
