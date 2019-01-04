module QuestionsHelper

  def update_question_and_submit(question, update_params)
    ActiveRecord::Base.transaction do
      pad = question.pad
      if question.update(update_params) && pad.update(content: question.content, language: question.language)
        result = Result.new
        result.pad = pad
        result.save
        result
      end
    end
  end

  def create_question(question_params)
    ActiveRecord::Base.transaction do
      question = Question.new(question_params)
      pad = Pad.new(content: question.content, language: question.language, filename: question.title)
      if pad.save
        question.pad = pad
        question.save!
        question
      end
    end
  end
end
