class Pad < ApplicationRecord
  has_many :results, as: :runner, dependent: :destroy
  # validations
  validates_presence_of :language, :filename
end
