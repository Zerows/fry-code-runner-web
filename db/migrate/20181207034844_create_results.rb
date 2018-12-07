class CreateResults < ActiveRecord::Migration[5.1]
  def change
    create_table :results do |t|
      t.string :output
      t.string :error
      t.references :pad, foreign_key: true

      t.timestamps
    end
  end
end
