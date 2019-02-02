class UsersController < ApplicationController

  before_action :auth_as_member
  skip_before_action :auth_as_member, only: [:create, :guest], raise: false

  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = { message: Message.account_created, auth_token: auth_token }
    json_response(response, :created)
  end

  def guest

    user = User.create!(guest_user_params)
    auth_token = AuthenticateGuestUser.new(user).call
    response = { message: Message.account_created, auth_token: auth_token }
    json_response(response, :created)
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end

  def guest_user_params
    params.require(:user).permit(:name)
  end
end