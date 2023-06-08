require "open-uri"

User.destroy_all
PokemonType.destroy_all
PokemonAttack.destroy_all
Pokemon.destroy_all
Type.destroy_all
Attack.destroy_all

types = %w(grass fire water lightning pyschic fighting darkness metal fairy)

pokedex = User.new(
  nickname: "Pokedex",
  email: "pokedex@gmail.com",
  password: "pokedex"
)

pokedex.save!

User.create(
  nickname: "Ash Ketchum",
  email: "ash.ketchum@mail.com",
  password: "pokemon"
)

types.each do |type|
  Type.create(
    name: type
  )
end

response = URI.open('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0').read
data = JSON.parse(response)

data["results"].each do |result|
  pokemon = Pokemon.new(name: result["name"])
  pokemon.user = pokedex
  puts result["name"]
  puts result["url"]
  indiv_response = URI.open(result["url"]).read
  indiv_data = JSON.parse(indiv_response)
  image = URI.open(indiv_data["sprites"]["front_default"])
  pokemon.photo.attach(io: image, filename: "#{result["name"]}.png", content_type: "image/png")
  pokemon.save!
  PokemonType.create(
    pokemon: pokemon,
    type: Type.all.sample
  )
end

attacks_response = URI.open('https://pokeapi.co/api/v2/move?limit=1000&offset=0').read
attacks_data = JSON.parse(attacks_response)

attacks_data["results"].each do |attack|
  Attack.create(name: attack["name"])
end
