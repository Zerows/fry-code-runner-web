class PadsController < ApplicationController
  def index
    render :json => {:success => 'true'}
  end

  def show_pad
    render :json => {:success => 'trueeeeee'}
  end

  def create
    puts pads_params.to_json
    @pad = Pad.create!(pads_params)
    render :json => {:created => 'true'}
  end

  def update
    @pad.update(params)
    head :no_content
  end

  def pads_params
    params.require(:pad).permit(:content, :language, :filename)
  end
end