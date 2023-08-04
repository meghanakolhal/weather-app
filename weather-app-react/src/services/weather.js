export const getWeatherInfo=(city)=>{

    return (
    
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next4days?unitGroup=metric&key=RYVV9DWE4U9X44MNEJXU9ZCTS&contentType=json`, {
  method: "GET",
  headers: { }
  })
.then(response =>
  response.json()))

}

export const getCurrentPosition=(latitude,longitude)=> {
  console.log(latitude,longitude)
  if (latitude&&longitude){
 return  fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`, {
    method: "GET",
  }).then((res) => res.json())
}
  }




