class UsersController < ApplicationController

  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = { message: Message.account_created, auth_token: auth_token }
    json_response(response, :created)
  end

  def guest
    user = User.create!(guest_user_params)
    auth_token = AuthenticateGuestUser.new(user).call
    render json: UserSession.new(auth_token, user)
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end

  def guest_user_params
    params.permit(:name)
  end
end