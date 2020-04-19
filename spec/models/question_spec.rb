require 'rails_helper'

RSpec.describe Question, type: :model do
    it { should belong_to(:pad) }

    it { should define_enum_for(:difficulty).with({easy: 0, medium: 1, hard: 3}) }
    
end