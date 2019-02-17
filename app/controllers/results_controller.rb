class ResultsController < ApplicationController
  before_action do
    auth_as(:guest)
  end
  def show
    result = Result.find(params[:result_id])
    render json: result
  end
end