class AddBioToPokemon < ActiveRecord::Migration[7.0]
  def change
    add_column :pokemons, :bio, :string
  end
end
