import styles from "./MainPart.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { useEffect, useState } from "react";
import { getWeatherData } from "../services/weather";
import Loader from "../Loader/Loader";
const MainPart = () => {
   const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [weeklyData, setWeeklyData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
const [latitude,setLatitude]=useState()
const [longitude, setLongitude] = useState();
useEffect(() => {
  {
    !location.length &&
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log(position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        });
      fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`,{
        method:'GET'
      }).then((res)=>res.json()).then((place)=>{
        // console.log(place.address.city,place.address.state,place.address.country,place.address.neighbourhood)
      setLocation(place.address.city);})
    }
      
    {location.length && 
      setIsLoader(true);
      getWeatherData(location)
        .then((details) => {
          // console.log(details);
          setIsError(false);
          setData(details);
          setWeeklyData(details.days);
          setIsLoader(false);
        })
        .catch((err) => {
          setIsError(true);
          setIsLoader(false);
          console.log(err);
        });
    
    }
  }, [location,latitude,longitude]);
  // console.log(weeklyData);
  const searchLocation = (city) => {
    console.log(city);
    setLocation(city);
  };
  const weeklyUpdates = weeklyData.map((ele, index) => {
    return (
      <div key={index} className={styles.smallCards}>
        <p style={{ marginBottom: "0rem" }}>{ele.datetime}</p>
        {ele.icon.includes("rain") && (
          <>
            <img
              src="https://th.bing.com/th/id/R.f0f1c51ac366d7438e3096e2be55be20?rik=dPKbLRzvR3XbFQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fKTj%2fXdg%2fKTjXdgyEc.png&ehk=8AoUI8xMdGDzlsSuJRtoS2nnTSD%2fuYoqDeB1khHvS5g%3d&risl=&pid=ImgRaw&r=0"
              width="30px"
            />
          </>
        )}
        {ele.icon.includes("light") && (
          <>
            <img
              src="https://th.bing.com/th/id/R.f0f1c51ac366d7438e3096e2be55be20?rik=dPKbLRzvR3XbFQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fKTj%2fXdg%2fKTjXdgyEc.png&ehk=8AoUI8xMdGDzlsSuJRtoS2nnTSD%2fuYoqDeB1khHvS5g%3d&risl=&pid=ImgRaw&r=0"
              width="30px"
            />
          </>
        )}
        {ele.icon.includes("cloud") && (
          <>
            <img
              src="https://thumbs.dreamstime.com/b/blue-3d-cloud-icons-24947347.jpg"
              width="30px"
            />
          </>
        )}
        <p>23°C </p>
      </div>
    );
  });
  return (
    <>
      <AppHeader searchLocation={searchLocation} />

      <div className={styles.container}>
        {/* {console.log(isLoader)} */}
        {isLoader && <Loader />}
        {!isLoader && (
          <>
            {isError && (
              <>
                <p className={styles.errorMsg}>
                  !!Please enter a valid Name of the Place
                </p>{" "}
                {setTimeout(() => {
                  setIsError(false);
                }, 6000)}
              </>
            )}
            {!isError && (
              <>
                <div className={styles.upperDiv}>
                  <div className={styles.inpPlace}>
                    {data.resolvedAddress ? (
                      <p> {data.resolvedAddress} </p>
                    ) : null}

                    {data.days ? <p>{data.days[0].datetime}</p> : null}

                    {/* {data.description ? (
              <>
                <p className={styles.description}>
                  {" "}
                  Description : {data.description}
                </p>
              </>
            ) : null} */}
                  </div>
                  <div className={styles.tempDay}>
                    {data.currentConditions ? (
                      <p className={styles.temp}>
                        {data.currentConditions.temp} °C
                      </p>
                    ) : null}
                  </div>
                  <div className={styles.details}>
                    {data.currentConditions &&
                      data.currentConditions.icon.includes("light") && (
                        <>
                          {" "}
                          <img
                            src="https://th.bing.com/th/id/R.f0f1c51ac366d7438e3096e2be55be20?rik=dPKbLRzvR3XbFQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fKTj%2fXdg%2fKTjXdgyEc.png&ehk=8AoUI8xMdGDzlsSuJRtoS2nnTSD%2fuYoqDeB1khHvS5g%3d&risl=&pid=ImgRaw&r=0"
                            width="70px"
                            height="70px"
                          />
                        </>
                      )}
                    {data.currentConditions &&
                      data.currentConditions.icon.includes("mist") && (
                        <img
                          src="https://th.bing.com/th/id/R.d94a8cea609a24c5f3cddea6b7eca593?rik=4Rm6bJQ1D5ADmA&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fdcr%2fok5%2fdcrok5qdi.jpeg&ehk=CP7KesI1qXA0S4g2J%2bVBTenfRbTv8aVaIFh%2b79935Uw%3d&risl=&pid=ImgRaw&r=0"
                          width="70px"
                        />
                      )}
                    {data.currentConditions &&
                      data.currentConditions.icon.includes("cloud") &&
                      data.currentConditions.conditions.includes("clouds") && (
                        <img
                          src="https://thumbs.dreamstime.com/b/blue-3d-cloud-icons-24947347.jpg"
                          width="80px"
                        />
                      )}
                    {data.currentConditions &&
                      data.currentConditions.icon.includes("cloudy") && (
                        <img
                          src="https://www.pinclipart.com/picdir/big/422-4224808_top-partly-cloudy-with-sun-weather-icon-clip.png"
                          width="80px"
                        />
                      )}
                    <div className={styles.mistRain}>
                      {data.currentConditions ? (
                        <p>{data.currentConditions.conditions}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <h4 className={styles.HighlightHeading}>Current Weather</h4>
                <div className={styles.highlight}>
                  <div className={styles.Card}>
                    <div className={styles.innerCard}>
                      <p style={{ marginBottom: "0rem" }}>Wind Status</p>
                      {data.currentConditions ? (
                        <p className={styles.greyIt}>
                          {data.currentConditions.windspeed} km/hr
                        </p>
                      ) : null}
                    </div>
                    <img
                      src="	https://weather-app-gules-alpha.vercel.app/icons/windspeed.png"
                      width="35px"
                    />
                  </div>
                  <div className={styles.Card}>
                    <div className={styles.innerCard}>
                      <p style={{ marginBottom: "0rem" }}>Max Temperature</p>
                      {data.days ? (
                        <p className={styles.greyIt}>
                          {data.days[0].tempmax} °C
                        </p>
                      ) : null}
                    </div>
                    <img
                      src="https://th.bing.com/th/id/OIP.AHGZ8J2fTvHLUsbRK3Yx8QHaJj?pid=ImgDet&rs=1"
                      width="45px"
                    />
                  </div>
                  <div className={styles.Card}>
                    <div className={styles.innerCard}>
                      <p style={{ marginBottom: "0rem" }}>Min Temperature </p>
                      {data.days ? (
                        <p className={styles.greyIt}>
                          {data.days[0].tempmin} °C
                        </p>
                      ) : null}
                    </div>
                    <img
                      src="https://cdn2.iconfinder.com/data/icons/weather-colored-icons/47/weather_70-512.png"
                      width="55px"
                    />
                  </div>
                  <div className={styles.Card}>
                    <div>
                      <p style={{ marginBottom: "0rem" }}>Sunrise</p>

                      {data.currentConditions ? (
                        <p className={styles.greyIt}>
                          {data.currentConditions.sunrise}
                        </p>
                      ) : null}
                    </div>
                    <img
                      src="https://weather-app-gules-alpha.vercel.app/icons/sunrise.png"
                      width="40px"
                    />
                  </div>
                  <div className={styles.Card}>
                    <div>
                      <p style={{ marginBottom: "0rem" }}> Sunset</p>

                      {data.currentConditions ? (
                        <p className={styles.greyIt}>
                          {data.currentConditions.sunset}
                        </p>
                      ) : null}
                    </div>
                    <img
                      src="	https://weather-app-gules-alpha.vercel.app/icons/sunset.png"
                      width="40px"
                    />
                  </div>
                  <div className={styles.Card}>
                    <div>
                      <p style={{ marginBottom: "0rem" }}>Humidity</p>
                      {data.currentConditions ? (
                        <p className={styles.greyIt}>
                          {data.currentConditions.humidity} %
                        </p>
                      ) : null}
                    </div>
                    <img
                      src="	https://weather-app-gules-alpha.vercel.app/icons/humidity.png"
                      width="35px"
                      height="40px"
                    />
                  </div>

                  <div className={styles.Card}>
                    <div>
                      <p style={{ marginBottom: "0rem" }}>Visibility</p>
                      {data.currentConditions ? (
                        <p className={styles.greyIt}>
                          {data.currentConditions.visibility} Km
                        </p>
                      ) : null}
                    </div>
                    <img
                      src="	https://weather-app-gules-alpha.vercel.app/icons/visibility.png"
                      width="40px"
                    />
                  </div>
                  <div className={styles.Card}>
                    <div>
                      <p style={{ marginBottom: "0rem" }}>UV Index</p>
                      {data.currentConditions ? (
                        <p className={styles.greyIt}>
                          {data.currentConditions.uvindex}
                        </p>
                      ) : null}
                    </div>
                    <img
                      src="https://thumbs.dreamstime.com/b/uv-radiation-ultraviolet-icon-linear-uv-radiation-ultraviolet-icon-linear-eps-file-easy-to-edit-127470397.jpg"
                      width="80px"
                      height="60px"
                    />
                  </div>
                </div>
                <div className={styles.weeklyUpdate}>
                  <h5 className={styles.HighlightHeading}>Weekly Update</h5>

                  <div className={styles.smallCardContainer}>
                    {weeklyUpdates}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default MainPart;
