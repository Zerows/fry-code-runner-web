class Result < ApplicationRecord
  belongs_to :pad
  enum status: { in_queue: 0, in_progress: 1, completed: 2, cancelled: 3 }
end
