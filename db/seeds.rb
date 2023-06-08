require "open-uri"

PokemonType.destroy_all
PokemonAttack.destroy_all
Pokemon.destroy
Type.destroy_all
Attack.destroy_all

types = %w(grass fire water lightning pyschic fighting darkness metal fairy)

pokedex = User.create(
  nickname: "Pokedex",
  email: "pokedex@gmail.com",
  password: "pokedex"
)

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

data["results"].each do |pokemon|
  pokemon = Pokemon.new(name: pokemon["name"])
  pokemon.photo.attach(io: pokemon["url"], filename: pokemon["name"])
  pokemon.user = pokedex
  pokemon.save!
  PokemonType.create(
    pokemon: pokemon,
    type: Type.all.sample
  )
end

response = URI.open('https://pokeapi.co/api/v2/move?limit=1000&offset=0').read
data = JSON.parse(response)

data["results"].each do |attack|
  Attack.create(name: attack["name"])
end
