class RemoveColumnRunnerAsPolymorphicOnResults < ActiveRecord::Migration[5.2]
  def change
    remove_reference :results, :runner, polymorphic: true
  end
end
