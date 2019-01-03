class Pad < ApplicationRecord
  has_many :results
  # validations
  validates_presence_of :language, :filename
end
