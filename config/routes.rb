Rails.application.routes.draw do
  resources :cart_items
  resources :carts
  patch '/carts/:id/new_quantity', to: 'carts#new_quantity'
  patch '/carts/:id/delete_item', to: 'carts#delete_item'
  resources :orders
  resources :coffee_details
  resources :coffees
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
