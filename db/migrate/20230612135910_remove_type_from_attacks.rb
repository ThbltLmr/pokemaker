class RemoveTypeFromAttacks < ActiveRecord::Migration[7.0]
  def change
    remove_column :attacks, :type_id
  end
end
