class PadsController < ApplicationController
  def index
    render :json => {:success => 'true'}
  end

  def show_pad
    render :json => {:success => 'trueeeeee'}
  end

  def create
    @pad = Pad.create!(params)
    render :json => {:created => 'true'}
  end

  def update
    @pad.update(params)
    head :no_content
  end
end