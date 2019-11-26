require 'rails_helper'

# Test suite for the Pads model
RSpec.describe Pad, type: :model do
  # Association test
  # ensure Pad model has a 1:m relationship with the Results model
  it { should belong_to(:pad) }
end