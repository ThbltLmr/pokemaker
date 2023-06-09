# pokemon = Pokemon.new(name: 'Pikachu', health_points: 100, attack: 'Thunder Shock', poke_type: 'Electric')
# pokemon.save!

# pokemon = Pokemon.new(name: 'Charizard', health_points: 120, attack: 'Flame Burst', poke_type: 'Fire')
# pokemon.save!

# pokemon = Pokemon.new(name: 'Bulbasaur', health_points: 90, attack: 'Vine Whip', poke_type: 'Grass')
# pokemon.save!

# pokemon = Pokemon.new(name: 'Squirtle', health_points: 85, attack: 'Water Gun', poke_type: 'Water')
# pokemon.save!

# pokemon = Pokemon.new(name: 'Jigglypuff', health_points: 95, attack: 'Pound', poke_type: 'Fairy')
# pokemon.save!

# pokemon = Pokemon.new(name: 'Mewtwo', health_points: 150, attack: 'Psychic', poke_type: 'Psychic')
# pokemon.save!

# pokemon = Pokemon.new(name: 'Mew', health_points: 150, attack: 'Psychic', poke_type: 'Psychic')
# pokemon.save!

# pokemon = Pokemon.new(name: 'Gengar', health_points: 120, attack: 'Shadow Ball', poke_type: 'Ghost')
# pokemon.save!

# pokemon = Pokemon.new(name: 'Gyarados', health_points: 130, attack: 'Hydro Pump', poke_type: 'Water')
# pokemon.save!

# pokemon = Pokemon.new(name: 'Dragonite', health_points: 140, attack: 'Dragon Breath', poke_type: 'Dragon')
# pokemon.save!

# pokemon = Pokemon.new(name: 'Snorlax', health_points: 150, attack: 'Body Slam', poke_type: 'Normal')
# pokemon.save!

# pokemon = Pokemon.new(name: 'Machamp', health_points: 130, attack: 'Cross Chop', poke_type: 'Fighting')
# pokemon.save!

require "open-uri"

response = URI.open('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0').read
data = JSON.parse(response)

data["results"].each do |pokemon|
  pokemon = Pokemon.new(name: pokemon["name"])
  pokement.image.attach(io: pokemon["url"], filename: pokemon["name"])
  pokmon.save!
end
