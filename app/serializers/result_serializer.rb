class ResultSerializer < ActiveModel::Serializer
  include ActionView::Helpers::TextHelper
  attributes :id, :status, :error, :html_output, :pad_id

  def html_output
    simple_format(object.output)
  end

end
