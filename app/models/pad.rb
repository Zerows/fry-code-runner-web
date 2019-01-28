class Pad < ApplicationRecord
  resourcify
  has_many :results, dependent: :destroy
  has_many :collaborators
  has_many :users, through: :collaborators
  # validations
  validates_presence_of :language, :filename
  extend FriendlyId
  friendly_id :filename, use: :slugged
end
