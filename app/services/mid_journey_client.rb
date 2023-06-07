require 'open-uri'
require 'json'
require 'faraday'

class MidJourneyClient
  def initialize(pokemon)
    @pokemon = pokemon
  end

  def call
    headers = {
      "Content-Type": "application/json",
      "Authorization": "f86a2a3d-dd4e-43aa-81d9-3d408eedbf1b"
    }

    imagine_url = "https://api.midjourneyapi.io/v2/imagine"

    imagine_body = {
      "prompt": @pokemon.prompt
    }.to_json

    imagine_response = Faraday.post(imagine_url, imagine_body, headers)

    return JSON.parse(imagine_response.body)["taskId"]
  end
end
