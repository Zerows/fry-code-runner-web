class AddColumnPadIdToResults < ActiveRecord::Migration[5.2]
  def change
    add_reference :results, :pad
  end
end
