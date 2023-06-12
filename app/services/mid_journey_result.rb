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
    response_hash = JSON.parse(result_response.body)
    # response_hash = { "percentage": 45,  "status": "running" }
    if response_hash.key?("imageURL")
      image_url = response_hash["imageURL"]
      image = URI.open(image_url)
      @pokemon.photo.attach(io: image, filename: "pokemon.png", content_type: "image/png")
    end
  end
end
