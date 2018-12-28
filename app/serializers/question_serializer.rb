class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :content, :language, :title, :created_at, :updated_at
end
