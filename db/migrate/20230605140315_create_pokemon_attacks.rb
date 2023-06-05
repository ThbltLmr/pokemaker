class CreatePokemonAttacks < ActiveRecord::Migration[7.0]
  def change
    create_table :pokemon_attacks do |t|
      t.references :pokemon, null: false, foreign_key: true
      t.references :attack, null: false, foreign_key: true

      t.timestamps
    end
  end
end
