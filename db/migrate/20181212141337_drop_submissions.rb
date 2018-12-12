class DropSubmissions < ActiveRecord::Migration[5.1]
  def change
    drop_table :submissions, if_exists: true
  end
end
