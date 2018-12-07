class PadSerializer < ActiveModel::Serializer
  attributes :id, :content, :language, :filename, :created_at, :updated_at
end
