
async function http(
    request: RequestInfo
  ): Promise<any> {
    return fetch(request)
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }

export async function getHeroes() {
    return http("https://api.opendota.com/api/heroStats");
}