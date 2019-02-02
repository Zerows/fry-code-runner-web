class User < ApplicationRecord
  after_create :assign_default_role

  rolify
  # encrypt password
  has_secure_password(validations: false)

  # Model associations
  has_many :collaborators
  has_many :pads, through: :collaborators
  # Validations
  validates_presence_of :name


  def assign_default_role
    add_role(:guest)
  end
end
