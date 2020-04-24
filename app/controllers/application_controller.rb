class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler
  include RoleHandler
  include ActionDispatch

  attr_reader :current_user

  private

  # Check for valid request token and return user
  def auth_as(min = :none)
    @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
    case min
    when :admin
      is_atleast_admin(@current_user)
    when :member
      is_atleast_member(@current_user)
    when :guest
      is_atleast_guest(@current_user)
    else
      is_atleast_member(@current_user)
    end
  end


end
