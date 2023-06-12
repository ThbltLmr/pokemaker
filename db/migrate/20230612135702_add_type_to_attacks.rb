class AddTypeToAttacks < ActiveRecord::Migration[7.0]
  def change
    add_reference :attacks, :type, foreign_key: true
  end
end
