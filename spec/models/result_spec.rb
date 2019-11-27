require 'rails_helper'

# Test suite for the Pads model
RSpec.describe Result, type: :model do
  # Association test
  # ensure Pad model has a 1:m relationship with the Results model
  it { should belong_to(:pad) }

  # Validation test
  # ensure the enum gets the properly values
  it { should define_enum_for(:status).with({ in_queue: 0, in_progress: 1, completed: 2, cancelled: 3 }) }
end