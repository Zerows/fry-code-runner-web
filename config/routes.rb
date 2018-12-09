Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope 'api/pads' , :controller => 'pads' do
    get "/" , :action=> 'index', :as => 'pads_dashboard'
    post "/", :action=>'create', :as => 'create_pad'
    get '/:pad_id' ,:action => 'show_pad' , :as => 'show_pad'
    put '/:pad_id' ,:action => 'update' , :as => 'update_pad'
    delete '/:pad_id' ,:action => 'delete' , :as => 'delete_pad'
  end

  mount_ember_app :frontend, to: "/"
end
