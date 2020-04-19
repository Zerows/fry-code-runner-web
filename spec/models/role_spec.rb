require 'rails_helper'

RSpec.describe Role, type: :model do
  # Association tests
  # Ensure Role model has a m:m relationship with the User model
  it { should have_and_belong_to_many(:users) }
  it { should belong_to(:resource) }
  
end