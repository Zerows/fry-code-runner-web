class UserSession
  include ActiveModel::Model
  include ActiveModel::Serialization

  attr_accessor :token, :id, :name, :email

  def initialize(token, user)
    @token = token
    @id = user.id
    @name = user.name
    @email = user.email
  end
end