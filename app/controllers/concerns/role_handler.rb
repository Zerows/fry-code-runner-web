module RoleHandler
  def is_atleast_admin(user)
    unless user.has_role? :admin
      raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
    end
  end

  def is_atleast_member(user)
    begin
      is_atleast_admin(user)
    rescue
      unless user.has_role? :member
        raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
      end
    end
  end

  def is_atleast_guest(user)
    begin
      is_atleast_admin(user)
    rescue
      begin
        is_atleast_member(user)
      rescue
        unless user.has_role? :guest
          raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
        end
      end
    end
  end
end