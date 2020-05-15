Rails.application.routes.draw do
  get 'static_pages/health'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  mount_ember_app :frontend, to: "/"

  scope 'api' do
    post 'auth/login', to: 'authentication#authenticate'
    post 'signup', to: 'users#create'
    post 'guest', to: 'users#guest'

    scope 'pads', controller: 'pads' do
      get '/', :action => 'index'
      post '/', :action => 'create'
      post '/guest', :action => 'guest_create'
      get '/:pad_id', :action => 'show'
      put '/:pad_id', :action => 'update'
      delete '/:pad_id', :action => 'delete'
      put '/:pad_id/submit', :action => 'submit'
    end

    scope 'questions', controller: 'questions' do
      get '/', :action => 'index'
      post '/', :action => 'create'
      get '/:question_id', :action => 'show'
      put '/:question_id', :action => 'update'
      delete '/:question_id', :action => 'delete'
      put '/:question_id/run', :action => 'dry_run'
    end

    scope 'results', controller: 'results' do
      get '/:result_id', :action => 'show'
    end
  end
end
