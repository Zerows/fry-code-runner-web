FactoryBot.define do
  factory :pad do
    content { Faker::Lorem.word }
    language { Faker::Lorem.word }
    filename { Faker::Lorem.word }
  end
end