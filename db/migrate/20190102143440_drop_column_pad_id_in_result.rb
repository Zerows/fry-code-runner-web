class DropColumnPadIdInResult < ActiveRecord::Migration[5.2]
  def change
    remove_column :results, :pad_id
  end
end
