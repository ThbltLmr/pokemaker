Rails.application.routes.draw do
  devise_for :users
  resources :pokemons, only: [:new, :create, :index]
  root "pages#home"
  get '/map', to: 'pages#map'
  get "/pokemons_new", to: "pokemons#new"
  get "/pokemons_index", to: "pokemons#index"
  get "/profile", to: "pages#profile"
end
