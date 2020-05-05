class AddColumnInfoToPads < ActiveRecord::Migration[5.2]
  def change
    add_column :pads, :info, :text
  end
end
