class AddPromptToPokemons < ActiveRecord::Migration[7.0]
  def change
    add_column :pokemons, :prompt, :text
  end
end
