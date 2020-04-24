class UserSessionSerializer < ActiveModel::Serializer
  attributes :id, :name, :token
end
