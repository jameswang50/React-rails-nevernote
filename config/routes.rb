Rails.application.routes.draw do
 root to: 'static_pages#root'

 namespace :api, defaults: { format: :json } do
		resources :users, only: [:create]
		resource :session, only: [:create, :destroy]
    resources :notes, only: [:create, :index, :show, :update, :destroy]
    resources :shortcuts, only: [:create, :index, :destroy]
    resources :notebooks, only: [:create, :index, :destroy]
    resources :tags, only: [:create, :index, :destroy]
    resources :taggings, only: [:create, :destroy]
	end
end
