Rails.application.routes.draw do
  devise_for :users

  root to: "pages#home"
  resources :pokemons, only: [:new, :create, :index]
  get '/home_map', to: 'pages#home_map'
  get "/pokemons_new", to: "pokemons#new"
  get "/pokemons_index", to: "pokemons#index"
  get "/profile", to: "pages#profile"
end
