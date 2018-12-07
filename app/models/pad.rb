class Pad < ApplicationRecord
  has_many :results
  # validations
  validates_presence_of :content, :language, :filename
end
