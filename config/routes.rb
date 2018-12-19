Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  mount_ember_app :frontend, to: "/"

  scope 'api' do
    post 'auth/login', to: 'authentication#authenticate'
    post 'signup', to: 'users#create'

    scope 'pads', controller: 'pads' do
      get "/", :action => 'index', :as => 'pads_dashboard'
      post "/", :action => 'create', :as => 'create_pad'
      get '/:pad_id', :action => 'show_pad', :as => 'show_pad'
      put '/:pad_id', :action => 'update', :as => 'update_pad'
      delete '/:pad_id', :action => 'delete', :as => 'delete_pad'
    end

    scope 'quests', controller: 'questions' do
      get "/", :action => 'index', :as => 'pads_dashboard'
      post "/", :action => 'create', :as => 'create_pad'
      get '/:pad_id', :action => 'show_question', :as => 'show_question'
      put '/:pad_id', :action => 'update', :as => 'update_pad'
      delete '/:pad_id', :action => 'delete', :as => 'delete_pad'
    end

    scope 'results', controller: 'results' do
      get '/:result_id', :action => 'get_result', :as => 'get_result'
    end
  end
end
