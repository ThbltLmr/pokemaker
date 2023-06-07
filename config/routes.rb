Rails.application.routes.draw do
  devise_for :users
  resources :pokemons, only: [:new, :create]
  root to: "pages#home"
  get "/pokemons_new", to: "pokemons#new"
  get "/pokemons_index", to: "pokemons#index"
  get "/profile", to: "pages#profile"
end
