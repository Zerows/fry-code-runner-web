class PadsController < ApplicationController

  before_action :authorize_request

  def index
    pads = current_user.pads.take(10)
    if pads.empty?
      render json: { pads: [] }
    else
      render json: pads
    end
  end

  def show
    pad = Pad.find(params[:pad_id])
    render json: pad
  end

  def create
    pad = current_user.pads.create!(create_pads_params)
    render json: pad
  end

  def update
    pad = Pad.find(params[:pad_id])
    pad.update(update_pads_params)
    render json: pad
  end

  def submit
    pad = Pad.find(params[:pad_id])
    pad.update(update_pads_params)

    result = Result.new
    result.pad = pad
    result.save

    msg = {:id => params[:pad_id], :result_id => result[:id]}
    Publisher.publish(msg)

    render json: result

  end

  def delete
    Pad.find(params[:pad_id]).destroy
    head :no_content
  end

  def create_pads_params
    params.require(:pad).permit(:content, :language).merge(filename: Faker::Book.title)
  end

  def update_pads_params
    params.require(:pad).permit(:content, :language, :filename)
  end
end