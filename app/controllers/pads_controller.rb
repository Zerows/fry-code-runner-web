class PadsController < ApplicationController

  before_action  only: [:create, :index, :delete] do
    auth_as(:member)
  end

  before_action only: [:update, :show, :submit] do
    auth_as(:guest)
  end

  def index
    pads = current_user.pads.take(10)
    if pads.empty?
      render json: {"pads": []}
    else
      render json: pads
    end
  end

  def show
    pad = Pad.friendly.find(params[:pad_id])
    render json: pad
  end

  def create
    pad = current_user.pads.create!(create_pads_params)
    render json: pad
  end

  def update
    pad = Pad.friendly.find(params[:pad_id])
    pad.update(update_pads_params)
    render json: pad
  end

  def submit
    pad = Pad.friendly.find(params[:pad_id])
    pad.update(update_pads_params)

    result = Result.new
    result.pad = pad
    result.save

    msg = {:id => pad.id, :result_id => result[:id]}
    Publisher.publish(msg, pad.language)

    render json: result

  end

  def delete
    Pad.friendly.find(params[:pad_id]).destroy
    head :no_content
  end

  private
  def create_pads_params
    title = Faker::Book.title
    params.require(:pad).permit(:content, :language)
        .merge(filename: title)
        .merge(content: "//#{title}")
  end

  def update_pads_params
    params.require(:pad).permit(:content, :language, :filename, :info)
  end
end