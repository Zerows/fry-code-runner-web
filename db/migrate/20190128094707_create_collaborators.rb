class CreateCollaborators < ActiveRecord::Migration[5.2]
  def change
    create_table :collaborators do |t|
      t.references :user
      t.references :pad
      t.timestamps
    end
  end
end
