class CreatePads < ActiveRecord::Migration[5.1]
  def change
    create_table :pads do |t|
      t.text :content
      t.string :language
      t.string :filename

      t.timestamps
    end
  end
end
