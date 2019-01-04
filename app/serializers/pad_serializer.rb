class PadSerializer < ActiveModel::Serializer
  attributes :id, :content, :slug, :language, :filename, :created_at, :updated_at
end
