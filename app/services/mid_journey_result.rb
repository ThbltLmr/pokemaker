require 'open-uri'
require 'json'
require 'faraday'

class MidJourneyResult
  def initialize(pokemon, task_id)
    @pokemon = pokemon
    @task_id = task_id
  end

  def call
    headers = {
      "Content-Type": "application/json",
      "Authorization": "f86a2a3d-dd4e-43aa-81d9-3d408eedbf1b"
    }

    result_url = "https://api.midjourneyapi.io/v2/result"

    result_body = {
      "taskId": "12826636998690399766219445354649"
    }.to_json

    result_response = Faraday.post(result_url, result_body, headers)
    image_url = JSON.parse(result_response.body)["imageURL"]
    image = URI.open(image_url)
    @pokemon.photo.attach(io: image, filename: "pokemon.png", content_type: "image/png")
  end
end
