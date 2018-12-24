class PadsController < ApplicationController

  before_action :authorize_request

  def index
    pads = current_user.pads.take(10)
    render :json => pads
  end

  def show_pad
    pad = Pad.find(params[:pad_id])
    render json: pad
  end

  def create
    pad = current_user.pads.create!(pads_params)
    render json: pad
  end

  def update
    Pad.find(params[:pad_id]).update(pads_params)
    result = Result.create!({:pad_id => params[:pad_id]})
    msg = {:id => params[:pad_id], :result_id => result[:id]}
    Publisher.publish(msg)
    render :json => {:pad => msg}.as_json
  end

  def delete
    Pad.find(params[:pad_id]).destroy
    head :no_content
  end

  def pads_params
    params.require(:pad).permit(:content, :language, :filename)
  end
end