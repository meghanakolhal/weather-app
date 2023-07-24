import styles from "./MainPart.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { useEffect, useState } from "react";
// import { getWeatherData } from "../services/weather";
const MainPart = () => {
 

  const [data, setData] = useState({});
  const [location, setLocation] = useState("delhi");
  useEffect(() => {
  return fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=RYVV9DWE4U9X44MNEJXU9ZCTS&contentType=json`,
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => {
      response.json();
      console.log(response);
    })
    .then((details) => {
      console.log(details);
    });  
  }, [location]);
  const searchLocation = (city) => {
    console.log(city);
    setLocation(city);
  };
  // console.log(data);
  const icon = data.weather ? data.weather[0].description : null;
  const windSpeed=data.wind? Math.floor(data.wind.speed*3.6):null;
  const sunrise = data.sys
    ? new Date(data.sys.sunrise * 1000).toString().split(" ")
    : null;
  // console.log(sunrise)
  const sunset = data.sys
    ? new Date(data.sys.sunset * 1000).toString().split(" ")
    : null;
  // console.log(sunset)
  return (
    <>
      <AppHeader searchLocation={searchLocation} />
      <div className={styles.container}>
        <div className={styles.upperDiv}>
          <span className={styles.impPlace}>
            {data.sys ? <p> {data.sys.country} </p> : null}
          </span>
          <div className={styles.details}>
            {data.weather && icon.includes("light") && (
              <>
                {" "}
                <img
                  src="https://th.bing.com/th/id/R.f0f1c51ac366d7438e3096e2be55be20?rik=dPKbLRzvR3XbFQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fKTj%2fXdg%2fKTjXdgyEc.png&ehk=8AoUI8xMdGDzlsSuJRtoS2nnTSD%2fuYoqDeB1khHvS5g%3d&risl=&pid=ImgRaw&r=0"
                  width="70px"
                  height="70px"
                />
              </>
            )}
            {data.weather && icon.includes("mist") && (
              <img
                src="https://th.bing.com/th/id/R.d94a8cea609a24c5f3cddea6b7eca593?rik=4Rm6bJQ1D5ADmA&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fdcr%2fok5%2fdcrok5qdi.jpeg&ehk=CP7KesI1qXA0S4g2J%2bVBTenfRbTv8aVaIFh%2b79935Uw%3d&risl=&pid=ImgRaw&r=0"
                width="70px"
              />
            )}
            {data.weather &&
              icon.includes("cloud") &&
              icon.includes("clouds") && (
                <img
                  src="https://thumbs.dreamstime.com/b/blue-3d-cloud-icons-24947347.jpg"
                  width="80px"
                />
              )}
            <div className={styles.mistRain}>
              {data.weather ? <p>{icon}</p> : null}
            </div>
          </div>

          <div className={styles.tempDay}>
            {data.main ? <p>{data.main.temp} °F</p> : null}

            {data.sys ? <p>{sunrise[0]}day</p> : null}
            {data.sys ? <p> Time: {sunrise[4].slice(0, 5)}</p> : null}
          </div>
        </div>
        <h4 style={{ marginTop: "20px" }}>Today's Highlight</h4>
        <div className={styles.highlight}>
          <div className={styles.Card}>
            <div className={styles.innerCard}>
              <p style={{ marginBottom: "0rem" }}>Wind Status</p>
              {data.wind ? (
                <p className={styles.greyIt}>{windSpeed}km/hr</p>
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
              {data.main ? (
                <p style={{ color: "grey" }}>{data.main.temp_max}</p>
              ) : null}
            </div>
            <img src="" width="35px" />
          </div>
          <div className={styles.Card}>
            <div>
              <p style={{ marginBottom: "0rem" }}>Min Temperature </p>
              {data.main ? (
                <p style={{ color: "grey" }}>{data.main.temp_max}</p>
              ) : null}
              <img src="" width="40px" />
            </div>
          </div>
          <div className={styles.Card}>
            <div>
              <p style={{ marginBottom: "0rem" }}>Sunrise</p>

              {data.sys ? (
                <p style={{ color: "grey" }}> {sunrise[4].slice(0, 5)}</p>
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
              {data.sys ? (
                <p style={{ color: "grey" }}> {sunset[4].slice(0, 5)}</p>
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
              {data.main? <p className={styles.greyIt}>{data.main.humidity}%</p>:null}
             
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
              <p className={styles.greyIt}>{data.visibility/1000} km</p>
            </div>
            <img
              src="	https://weather-app-gules-alpha.vercel.app/icons/visibility.png"
              width="40px"
            />
          </div>
        </div>
        {/* <div className={styles.weeklyUpdate}>
          <h5>Weekly Update</h5>

          <div className={styles.smallCardContainer}>
            <div className={styles.smallCards}>
              <p style={{ marginBottom: "0rem" }}>22/07/2023</p>
              <img
                src="https://th.bing.com/th/id/R.f0f1c51ac366d7438e3096e2be55be20?rik=dPKbLRzvR3XbFQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fKTj%2fXdg%2fKTjXdgyEc.png&ehk=8AoUI8xMdGDzlsSuJRtoS2nnTSD%2fuYoqDeB1khHvS5g%3d&risl=&pid=ImgRaw&r=0"
                width="30px"
              />
              <p>23°C </p>
            </div>
            <div className={styles.smallCards}>
              <p style={{ marginBottom: "0rem" }}>22/07/2023</p>
              <img
                src="https://th.bing.com/th/id/R.f0f1c51ac366d7438e3096e2be55be20?rik=dPKbLRzvR3XbFQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fKTj%2fXdg%2fKTjXdgyEc.png&ehk=8AoUI8xMdGDzlsSuJRtoS2nnTSD%2fuYoqDeB1khHvS5g%3d&risl=&pid=ImgRaw&r=0"
                width="30px"
              />
              <p>23°C </p>
            </div>
            <div className={styles.smallCards}>
              <p style={{ marginBottom: "0rem" }}>22/07/2023</p>
              <img
                src="https://th.bing.com/th/id/R.f0f1c51ac366d7438e3096e2be55be20?rik=dPKbLRzvR3XbFQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fKTj%2fXdg%2fKTjXdgyEc.png&ehk=8AoUI8xMdGDzlsSuJRtoS2nnTSD%2fuYoqDeB1khHvS5g%3d&risl=&pid=ImgRaw&r=0"
                width="30px"
              />
              <p>23°C </p>
            </div>
            <div className={styles.smallCards}>
              <p style={{ marginBottom: "0rem" }}>22/07/2023</p>
              <img
                src="https://th.bing.com/th/id/R.f0f1c51ac366d7438e3096e2be55be20?rik=dPKbLRzvR3XbFQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fKTj%2fXdg%2fKTjXdgyEc.png&ehk=8AoUI8xMdGDzlsSuJRtoS2nnTSD%2fuYoqDeB1khHvS5g%3d&risl=&pid=ImgRaw&r=0"
                width="30px"
              />
              <p>23°C </p>
            </div>
            <div className={styles.smallCards}>
              <p style={{ marginBottom: "0rem" }}>22/07/2023</p>
              <img
                src="https://th.bing.com/th/id/R.f0f1c51ac366d7438e3096e2be55be20?rik=dPKbLRzvR3XbFQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fKTj%2fXdg%2fKTjXdgyEc.png&ehk=8AoUI8xMdGDzlsSuJRtoS2nnTSD%2fuYoqDeB1khHvS5g%3d&risl=&pid=ImgRaw&r=0"
                width="30px"
              />
              <p>23°C </p>
            </div>
            <div className={styles.smallCards}>
              <p style={{ marginBottom: "0rem" }}>22/07/2023</p>
              <img
                src="https://th.bing.com/th/id/R.f0f1c51ac366d7438e3096e2be55be20?rik=dPKbLRzvR3XbFQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fKTj%2fXdg%2fKTjXdgyEc.png&ehk=8AoUI8xMdGDzlsSuJRtoS2nnTSD%2fuYoqDeB1khHvS5g%3d&risl=&pid=ImgRaw&r=0"
                width="30px"
              />
              <p>23°C </p>
            </div>
            <div className={styles.smallCards}>
              <p style={{ marginBottom: "0rem" }}>22/07/2023</p>
              <img
                src="https://th.bing.com/th/id/R.f0f1c51ac366d7438e3096e2be55be20?rik=dPKbLRzvR3XbFQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fKTj%2fXdg%2fKTjXdgyEc.png&ehk=8AoUI8xMdGDzlsSuJRtoS2nnTSD%2fuYoqDeB1khHvS5g%3d&risl=&pid=ImgRaw&r=0"
                width="30px"
              />
              <p>23°C </p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default MainPart;
