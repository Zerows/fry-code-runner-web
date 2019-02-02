class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler

  attr_reader :current_user

  private

  # Check for valid request token and return user
  def auth_as_member
    @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
    unless @current_user.has_role? :member
      raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
    end
  end

  def auth_as_guest
    @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
    @current_user.has_role? :guest
  end

end
