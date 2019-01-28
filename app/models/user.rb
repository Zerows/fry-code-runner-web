class User < ApplicationRecord
  rolify
  # encrypt password
  has_secure_password(validations: false)

  # Model associations
  has_many :collaborators
  has_many :pads, through: :collaborators
  # Validations
  validates_presence_of :name
end
