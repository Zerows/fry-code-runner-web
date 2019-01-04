class Question < ApplicationRecord
  belongs_to :pad, dependent: :destroy
  enum difficulty: {easy: 0, medium: 1, hard: 3}
  extend FriendlyId
  friendly_id :title, use: :slugged
end
