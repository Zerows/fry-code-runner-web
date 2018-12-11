class AddUserToPads < ActiveRecord::Migration[5.1]
  def change
    add_column :pads, :user_id, :bigint
  end
end
