Rails.application.routes.draw do
  devise_for :users

  root to: "pages#home"
  resources :pokemons, only: [:new, :create, :index]
<<<<<<< HEAD
  root "pages#home"
  get '/home_map', to: 'pages#home_map'
=======
>>>>>>> 2abcec0182fc83dd1874b2d1ec789f1934256d6d
  get "/pokemons_new", to: "pokemons#new"
  get "/pokemons_index", to: "pokemons#index"
  get "/profile", to: "pages#profile"
  get '/map_home', to: 'pages#map'
end
