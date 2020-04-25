class UserSessionSerializer < ActiveModel::Serializer
  attributes :id, :name, :token, :socket_url

  def socket_url
    Settings.socket_url
  end
end
