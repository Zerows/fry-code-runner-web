class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler
  include ActionDispatch

  attr_reader :current_user

  private

  # Check for valid request token and return user
  def auth_as(min = :none)
    @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
    unless @current_user.has_role? min
      raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
    end
  end


end
