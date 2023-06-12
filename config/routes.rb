Rails.application.routes.draw do
  devise_for :users

  root to: "pages#home"
  resources :pokemons, only: [:new, :create, :index]
  get "/pokemons_new", to: "pokemons#new"
  get "/pokemons_index", to: "pokemons#index"
  get "/profile", to: "pages#profile"
  get '/map_home', to: 'pages#map'
end
