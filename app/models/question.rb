class Question < ApplicationRecord
  enum difficulty: {easy: 0, medium: 1, hard: 3}
end
