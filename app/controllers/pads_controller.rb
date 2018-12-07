class PadsController < ApplicationController
  def index
    render :json => {:success => 'true'}
  end

  def show_pad
    pad = Pad.find(params[:pad_id])
    render :json => pad.as_json
  end

  def create
    pad = Pad.create!(pads_params)
    puts pad.to_json
    render :json => pad.as_json
  end

  def update
    Pad.find(params[:id]).update(params)
    head :no_content
  end

  def pads_params
    params.require(:pad).permit(:content, :language, :filename)
  end
end