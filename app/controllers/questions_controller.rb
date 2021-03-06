class QuestionsController < ApplicationController

  before_action only: [:index] do
    auth_as(:guest)
  end

  before_action only: [:show, :create, :update, :delete, :dry_run] do
    auth_as(:member)
  end

  def index
    questions = Question.take(10)
    if questions.empty?
      render json: {questions: []}
    else
      render json: questions
    end
  end

  def show
    question = Question.friendly.find(params[:question_id])
    render json: question
  end

  def create
    question = helpers.create_question(create_question_params)
    render json: question
  end

  def update
    Question.friendly.find(params[:question_id]).update(update_question_params)
    head :no_content
  end

  def delete
    Question.friendly.find(params[:question_id]).destroy
    head :no_content
  end

  def dry_run
    question = Question.friendly.find(params[:question_id])
    begin
      result = helpers.update_question_and_submit(question, update_question_params)
      msg = {:id => question.pad.id, :result_id => result[:id]}
      Publisher.publish(msg, question.pad.language)
      render json: result
    rescue Exception => e
      raise(ExceptionHandler::QuestionRunError, (e.message unless e.nil?))
    end
  end

  private

  def create_question_params
    title = Faker::Book.title
    current_params = params.require(:question).permit(:content, :language)
    current_params
        .merge(title: title)
        .merge(language: current_params[:language])
        .merge(content: "//#{title}")
  end

  def update_question_params
    params.require(:question).permit(:content, :language, :title, :difficulty, :description)
  end

end