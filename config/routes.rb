Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  mount_ember_app :frontend, to: "/"

  scope 'api' do
    post 'auth/login', to: 'authentication#authenticate'
    post 'signup', to: 'users#create'

    scope 'pads', controller: 'pads' do
      get '/', :action => 'index'
      post '/', :action => 'create'
      get '/:pad_id', :action => 'show'
      put '/:pad_id', :action => 'update'
      delete '/:pad_id', :action => 'delete'
      put '/:pad_id/submit', :action => 'submit'
    end

    scope 'questions', controller: 'questions' do
      get "/", :action => 'index', :as => 'questions_dashboard'
      post "/", :action => 'create', :as => 'create_question'
      get '/:question_id', :action => 'show_question', :as => 'show_question'
      put '/:question_id', :action => 'update', :as => 'update_question'
      delete '/:question_id', :action => 'delete', :as => 'delete_question'
    end

    scope 'results', controller: 'results' do
      get '/:result_id', :action => 'get_result', :as => 'get_result'
    end
  end
end
