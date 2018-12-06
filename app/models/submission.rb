class Submission < ApplicationRecord
  has_one :result

  default_scope do
    includes(:result)
  end

end
