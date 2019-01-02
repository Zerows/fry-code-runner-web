class QuestionsController < ApplicationController

  before_action :authorize_request

  def index
    questions = Question.take(10)
    if questions.empty?
      render json: {questions: []}
    else
      render json: questions
    end
  end

  def show
    question = Question.find(params[:question_id])
    render json: question
  end

  def create
    question = Question.create!(create_question_params)
    render json: question
  end

  def update
    Question.find(params[:question_id]).update(update_question_params)
    head :no_content
  end

  def delete
    Question.find(params[:question_id]).destroy
    head :no_content
  end

  def dry_run
    question = Question.find(params[:question_id])
    question.update(update_question_params)

    pad = current_user.pads.new(run_question_params)
    pad.save

    result = Result.new
    result.pad = pad
    result.save

    msg = {:id => params[:pad_id], :result_id => result[:id]}
    Publisher.publish(msg)


  end

  private
  def create_question_params
    title = Faker::Book.title
    params.require(:question).permit(:content, :language)
        .merge(title: title)
        .merge(content: "//#{title}")
  end

  def update_question_params
    params.require(:question).permit(:content, :language, :title, :difficulty)
  end
end