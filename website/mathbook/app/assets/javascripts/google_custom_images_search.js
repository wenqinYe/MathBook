/**
  Wrapper code for the google custom image search.
  The wrapper performs a GET request is sent to the google custom searce
  endpoint at https://www.googleapis.com/customsearch/v1 with our api-key and
  text query.

  The GET request will return a JSON response with the image results for the
  text query.
*/

static const image_serarch_api_endpoint = "https://www.googleapis.com/customsearch/v1"

/**
* @constructor
* @param {string} api_key - The api key for accessing the api endpoint
* @param {string} cx - Another custom search key
*/
class GoogleImageSearch {
  constructor(api_key, cx){
    this.api_key = api_key;
    this.cx = cx;
  }

  /**
  * Provides a list of images for a text query (example: a search for carbon
  * carbon atoms will yield images of carbon atoms)
  * @constructor
  * @param {string} text_query - A text query
  */
  results_for(text_query){

  }

  /**
  * Connects to the google custom serach api
  */
  connect(){

  }

  /**
  * Makes a JSON request to the google custom search api
  *
  */
  request_async(params, callback){

    for (parameter in params) {

    }
  }
}
