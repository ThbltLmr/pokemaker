require "open-uri"

Pokemon.destroy_all
Type.destroy_all
Attack.destroy_all
PokemonType.destroy_all
PokemonAttack.destroy_all
User.destroy_all

types = %w(grass fire water lightning psychic fighting darkness metal fairy)

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
sorted_attacks = attacks_data["results"].sort_by {|a| a["name"]}
sorted_attacks.each do |attack|
  attack_response = URI.open(attack["url"]).read
  attack_data = JSON.parse(attack_response)
  puts attack["url"]
  unless attack["name"].include?("--") || attack["name"].include?("10") || attack_data["flavor_text_entries"] == []
  if attack_data["flavor_text_entries"].kind_of?(Array)
    index = attack_data["flavor_text_entries"].find_index{ |hash| hash["language"]["name"] == "en" }
    description = attack_data["flavor_text_entries"][index]["flavor_text"]
  else
    description = attack_data["effect_entries"]["short_effect"]
  end
    Attack.create(name: attack["name"], description: description)
  end
end
