module ExceptionHandler
  extend ActiveSupport::Concern

  # Define custom error subclasses - rescue catches `StandardErrors`
  class AuthenticationError < StandardError;
  end
  class MissingToken < StandardError;
  end
  class InvalidToken < StandardError;
  end
  class QuestionRunError < StandardError;
  end
  class Forbidden < StandardError;
  end
  class PadCreationError < StandardError;
  end

  included do
    # Define custom handlers
    rescue_from ActiveRecord::RecordInvalid, with: :four_twenty_two
    rescue_from ExceptionHandler::AuthenticationError, with: :unauthorized_request
    rescue_from ExceptionHandler::MissingToken, with: :four_twenty_two
    rescue_from ExceptionHandler::InvalidToken, with: :four_twenty_two
    rescue_from ExceptionHandler::QuestionRunError, with: :five_hundred
    rescue_from ExceptionHandler::Forbidden, with: :four_hundred_three
    rescue_from ExceptionHandler::PadCreationError, with: :four_hundred

    rescue_from ActiveRecord::RecordNotFound do |error|
      json_response({errors: [error]}, :not_found)
    end
  end

  private

  # JSON response with message; Status code 403 - unprocessable entity
  def four_hundred(error)
    json_response({errors: [error]}, :bad_request)
  end

  # JSON response with message; Status code 403 - unprocessable entity
  def four_hundred_three(error)
    json_response({errors: [error]}, :forbidden)
  end

  # JSON response with message; Status code 422 - unprocessable entity
  def four_twenty_two(error)
    json_response({errors: [error]}, :unprocessable_entity)
  end

  # JSON response with message; Status code 422 - unprocessable entity
  def five_hundred(error)
    json_response({errors: [error]}, :internal_ser_error)
  end

  # JSON response with message; Status code 401 - Unauthorized
  def unauthorized_request(error)
    json_response({errors: [error]}, :unauthorized)
  end
end