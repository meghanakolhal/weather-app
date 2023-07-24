export const getWeatherData=(location)=>{
    const apiKey = "49c2c32f2a042a0ce964d3573d7d0e2f";
    return  fetch(
      `api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=metric&cnt=7&appid=${apiKey}`
    ).then((res)=>{
     res.json()
     console.log(res)
    })
}