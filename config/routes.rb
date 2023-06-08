Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  get '/home_map', to: 'pages#home_map'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
