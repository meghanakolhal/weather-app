

export const getWeatherData=(city)=>{

    return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=metric&key=RYVV9DWE4U9X44MNEJXU9ZCTS&contentType=json`, {
  method: "GET",
  headers: { }
  })
.then(response =>
  response.json())

}

