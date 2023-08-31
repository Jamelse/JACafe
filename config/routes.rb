Rails.application.routes.draw do
  resources :carts, only: [:show, :update]
  get '/cart', to: 'carts#show'
  patch '/carts/:id/new_quantity', to: 'carts#new_quantity'
  patch '/carts/:id/delete_item', to: 'carts#delete_item'
  post "/checkout", to: "stripe#checkout"
  post "/order-success", to: "stripe#order_success"
  resources :orders, only: [:index, :update, :create]
  get '/user_orders', to: 'orders#user_orders'
  resources :coffees
  get '/hot_coffees', to: 'coffees#hot_coffees'
  get '/cold_coffees', to: 'coffees#cold_coffees'
  resources :coffee_details, only: [:create, :update]
  resources :users, only: [:show, :create, :update]
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
