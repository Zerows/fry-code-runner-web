class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :content, :slug, :language, :title, :difficulty, :description, :created_at, :updated_at
end
