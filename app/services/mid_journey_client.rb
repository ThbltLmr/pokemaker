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

    # imagine_url = "https://api.midjourneyapi.io/v2/imagine"

    # imagine_body = {
    #   "prompt": @pokemon.prompt
    # }.to_json

    # imagine_response = Faraday.post(imagine_url, imagine_body, headers)

    # taskId = JSON.parse(imagine_response.body)["taskId"]

    result_url = "https://api.midjourneyapi.io/v2/result"
    result_body = {
      "taskId": "12826636998690399766219445354649"
    }.to_json

    result_response = Faraday.post(result_url, result_body, headers)
    image_url = JSON.parse(result_response.body)["imageURL"]
    image = URI.open(image_url)
    @pokemon.photo.attach(io: image, filename: "pokemon.png", content_type: "image/png")
    debugger
  end
end
