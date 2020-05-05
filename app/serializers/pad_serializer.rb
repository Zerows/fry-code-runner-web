class PadSerializer < ActiveModel::Serializer
  attributes :id, :content, :slug, :language, :filename, :info, :created_at, :updated_at
end
