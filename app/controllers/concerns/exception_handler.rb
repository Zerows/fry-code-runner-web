module ExceptionHandler
  extend ActiveSupport::Concern

  # Define custom error subclasses - rescue catches `StandardErrors`
  class AuthenticationError < StandardError; end
  class MissingToken < StandardError; end
  class InvalidToken < StandardError; end
  class QuestionRunError < StandardError; end

  included do
    # Define custom handlers
    rescue_from ActiveRecord::RecordInvalid, with: :four_twenty_two
    rescue_from ExceptionHandler::AuthenticationError, with: :unauthorized_request
    rescue_from ExceptionHandler::MissingToken, with: :four_twenty_two
    rescue_from ExceptionHandler::InvalidToken, with: :four_twenty_two
    rescue_from ExceptionHandler::QuestionRunError, with: :five_hundred

    rescue_from ActiveRecord::RecordNotFound do |error|
      json_response({ message: error }, :not_found)
    end
  end

  private

  # JSON response with message; Status code 422 - unprocessable entity
  def four_twenty_two(error)
    json_response({ message: error }, :unprocessable_entity)
  end

  # JSON response with message; Status code 422 - unprocessable entity
  def five_hundred(error)
    json_response({ message: error }, :internal_ser_error)
  end

  # JSON response with message; Status code 401 - Unauthorized
  def unauthorized_request(error)
    json_response({ message: error }, :unauthorized)
  end
end