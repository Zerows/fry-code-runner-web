class ApplicationController < ActionController::API
  def render_404
    raise ActionController::RoutingError.new('Not Found')
  end
end
