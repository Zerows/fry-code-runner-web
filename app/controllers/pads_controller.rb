class PadsController < ApplicationController
  def index
    render :json => {:success => 'true'}
  end

  def show_pad
    render :json => {:success => 'trueeeeee'}
  end
end