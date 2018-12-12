class AddColumnStatusToResults < ActiveRecord::Migration[5.1]
  def change
    add_column :results, :status, :integer, :default => 0
  end
end
