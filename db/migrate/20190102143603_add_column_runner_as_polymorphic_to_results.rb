class AddColumnRunnerAsPolymorphicToResults < ActiveRecord::Migration[5.2]
  def change
    add_reference :results, :runner, polymorphic: true, index: true
  end
end
