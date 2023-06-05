class CreatePokemons < ActiveRecord::Migration[7.0]
  def change
    create_table :pokemons do |t|
      t.string :name
      t.references :user, null: false, foreign_key: true
      t.integer :hp

      t.timestamps
    end
  end
end
