class PadsController < ApplicationController
  def index
    pads = Pad.take(10)
    render :json => {:pads => pads}.as_json
  end

  def show_pad
    pad = Pad.find(params[:pad_id])
    render :json => {:pad => pad}.as_json
  end

  def create
    pad = Pad.create!(pads_params)
    puts pad.to_json
    render :json => {:pad => pad}.as_json
  end

  def update
    Pad.find(params[:pad_id]).update(pads_params)
    head :no_content
  end

  def delete
    Pad.find(params[:pad_id]).destroy
    head :no_content
  end

  def pads_params
    params.require(:pad).permit(:content, :language, :filename)
  end
end