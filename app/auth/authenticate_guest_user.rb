class AuthenticateGuestUser
  def initialize(user)
    @user = user
  end

  # Service entry point
  def call
    JsonWebToken.encode(user_id: @user.id)
  end
end