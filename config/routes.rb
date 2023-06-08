Rails.application.routes.draw do
  devise_for :users
  resources :pokemons, only: [:new, :create, :index]
  root "pages#home"
  get "/pokemons_new", to: "pokemons#new"
  get "/pokemons_index", to: "pokemons#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
