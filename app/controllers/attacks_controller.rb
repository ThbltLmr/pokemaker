class AttacksController < ApplicationController
  def search
    @attacks = Attack.where("name ILIKE ?", "%#{params[:query]}%").limit(3)
    render json: { html: render_to_string(partial: "attacks/search", locals: { attacks: @attacks }, formats: [:html]) }
  end
end
