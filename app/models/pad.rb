class Pad < ApplicationRecord
  has_many :results, :dependent => :destroy
  # validations
  validates_presence_of :language, :filename
end
