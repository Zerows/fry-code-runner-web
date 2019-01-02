class Question < ApplicationRecord
  has_many :results, as: :runner, dependent: :destroy
  enum difficulty: {easy: 0, medium: 1, hard: 3}
end
