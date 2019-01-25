class Pad < ApplicationRecord
  resourcify
  has_many :results, dependent: :destroy
  # validations
  validates_presence_of :language, :filename
  extend FriendlyId
  friendly_id :filename, use: :slugged
end
