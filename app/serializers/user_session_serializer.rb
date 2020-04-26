class UserSessionSerializer < ActiveModel::Serializer
  attributes :id, :name, :token, :socket_url, :available_languages

  def socket_url
    Settings.socket_url
  end

  def available_languages
    Settings.languages
  end

end
