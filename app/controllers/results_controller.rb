class ResultsController < ApplicationController
  def get_result
    result = Result.find(params[:result_id])
    render :json => {:result => result}.as_json
  end
end