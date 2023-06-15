Rails.application.routes.draw do
  devise_for :users

  root to: "pages#home"
  resources :pokemons, only: [:new, :create, :index]
  get '/home_map', to: 'pages#home_map'
  get "/pokemons_new", to: "pokemons#new"
  get "/pokemons_index", to: "pokemons#index"
  get "/profile", to: "pages#profile"
  get '/map_home', to: 'pages#map'
  get "/search_attacks", to: "attacks#search", as: :search_attacks
  get '/pokemons/:id/card', to: "pokemons#card", as: :card
  get '/pokemons/:id/chat', to: "pokemons#chat", as: :chat
  get '/test', to: "pages#test"
end
