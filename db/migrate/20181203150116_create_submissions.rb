class CreateSubmissions < ActiveRecord::Migration[5.1]
  def change
    create_table :submissions do |t|
      t.text :content
      t.string :language
      t.string :filename
      t.json :output

      t.timestamps
    end
  end
end
