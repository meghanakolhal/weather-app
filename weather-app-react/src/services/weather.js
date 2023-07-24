export const getWeatherData=(location)=>{
    // const apiKey = "695f22d4315580369d9fbe55aea4d5c4";
    return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=RYVV9DWE4U9X44MNEJXU9ZCTS&contentType=json`, {
  "method": "GET",
  "headers": {
  }
  })
.then(response => {
  response.json();
  console.log(response)
})
.catch(err => {
  console.error(err);
});

}