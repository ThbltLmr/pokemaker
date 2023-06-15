require 'open-uri'
require 'json'
require 'faraday'

class MidJourneyClient
  def initialize(pokemon)
    @pokemon = pokemon
  end

  def call(bool)
    if bool
      headers = {
        "Content-Type": "application/json",
        "Authorization": ENV["MIDJOURNEY_KEY"]
      }

      imagine_url = "https://api.midjourneyapi.io/v2/imagine"

      imagine_body = {
        "prompt": @pokemon.prompt
      }.to_json

      imagine_response = Faraday.post(imagine_url, imagine_body, headers)

      task_id = JSON.parse(imagine_response.body)["taskId"]
      if api_error?(task_id)
        sleep(1)
        call(bool)
      end
      @pokemon.task_id = task_id
    else
      task_id = "12826636998690399766219445354649"
      if api_error?(task_id)
        sleep(1)
        call(bool)
      end
      @pokemon.task_id = task_id
    end
  end

  def api_error?(task_string)
    headers = {
      "Content-Type": "application/json",
      "Authorization": ENV["MIDJOURNEY_KEY"]
    }

    result_url = "https://api.midjourneyapi.io/v2/result"

    result_body = {
      "taskId": task_string
    }.to_json

    result_response = Faraday.post(result_url, result_body, headers)
    response_hash = JSON.parse(result_response.body)
    # response_hash = {"status" => "midjourney-bad-request-other"} #uncomment to test API with error
    return (response_hash.key?("status") && response_hash["status"] == "midjourney-bad-request-other")
  end
end
