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
      "Authorization": ENV["MIDJOURNEY_KEY"]
    }

    result_url = "https://api.midjourneyapi.io/v2/result"

    result_body = {
      "taskId": @task_id
    }.to_json

    result_response = Faraday.post(result_url, result_body, headers)
    image_url = JSON.parse(result_response.body)["imageURL"]
    image = URI.open(image_url)
    @pokemon.photo.attach(io: image, filename: "pokemon.png", content_type: "image/png")
  end
end
