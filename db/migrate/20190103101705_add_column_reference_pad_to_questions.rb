class AddColumnReferencePadToQuestions < ActiveRecord::Migration[5.2]
  def change
    add_reference :questions, :pad
  end
end
