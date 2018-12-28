class AddColumnDifficultyToQuestion < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :difficulty, :integer, :default => 0
  end
end
