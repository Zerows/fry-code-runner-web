class ResultsController < ApplicationController
  def get_result
    result = Result.find(params[:result_id])
    render json: result
  end
end