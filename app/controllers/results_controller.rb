class ResultsController < ApplicationController
  def show
    result = Result.find(params[:result_id])
    render json: result
  end
end