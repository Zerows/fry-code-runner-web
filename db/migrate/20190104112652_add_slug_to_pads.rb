class AddSlugToPads < ActiveRecord::Migration[5.2]
  def change
    add_column :pads, :slug, :string
    add_index :pads, :slug, unique: true
  end
end
