require 'rails_helper'

# Test suite for the Pads model
RSpec.describe Pad, type: :model do
  # Association test
  # ensure Pad model has a 1:m relationship with the Results model
  it { should have_many(:results) }
  # Validation tests
  # ensure columns title and created_by are present before saving
  it { should validate_presence_of(:language) }
  it { should validate_presence_of(:filename) }
end