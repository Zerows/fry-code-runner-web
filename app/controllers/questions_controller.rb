class QuestionsController < ApplicationController

  before_action :authorize_request

  def index
    questions = Question.take(10)
    if questions.empty?
      render json: { questions: [] }
    else
      render json: questions
    end
  end

  def show_question
    question = Question.find(params[:question_id])
    render json: question
  end

  def create
    question = Question.create!(question_params)
    render json: question
  end

  def update
    Question.find(params[:question_id]).update(question_params)
    head :no_content
  end

  def delete
    Question.find(params[:question_id]).destroy
    head :no_content
  end

  def question_params
    title = Faker::Book.title
    params.require(:question).permit(:content, :language)
        .merge(title: title)
        .merge(content: "//#{title}")
  end
end