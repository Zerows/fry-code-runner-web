class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :content, :language, :title, :difficulty, :created_at, :updated_at
end
