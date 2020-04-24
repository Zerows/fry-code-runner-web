class AuthenticationController < ApplicationController
  skip_before_action only: :authenticate, raise: false do
    auth_as(:member)
  end

  def authenticate
    auth_token, user = AuthenticateUser.new(auth_params[:email], auth_params[:password]).call
    render json: UserSession.new(auth_token, user)
  end

  private

  def auth_params
    params.permit(:email, :password)
  end
end