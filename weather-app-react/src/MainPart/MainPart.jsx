import styles from "./MainPart.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { useEffect, useState } from "react";
import { getCurrentPosition, getWeatherInfo } from "../services/weather";
import Loader from "../Loader/Loader";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import { getGeoLocation } from "../services/getGeoLocation";
import thunder from "../images/thunder.png";
import rain from "../images/rain.png";
import partially_cloudy from "../images/partly-cloudy-day.png";
import IMG from "../images/images";
const MainPart = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [disableGeo, setDisableGeo] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isSearching, setIsSearching] = useState(false);
  // console.log(IMG);
  // console.log(thunder);
  useEffect(() => {
    // setDisableGeo(false);

    setIsLoader(true);
    if (disableGeo) {
      getGeoLocation()
        .then((res) => {
          console.log(res.coords);
          getCurrentPosition(res.coords.latitude, res.coords.longitude)
            .then((val) => {
              console.log(val);
              getWeatherInfo(val.address.city)
                .then((details) => {
                  setData(details);
                  setWeeklyData(details.days);
                  setLocation("");
                  setIsLoader(false);
                })
                .catch((err) => {
                  setIsLoader(false);
                  setIsError(true);
                  console.log(err);
                });
            })
            .catch((err) => {
              setIsLoader(false);
              setIsError(true);
            });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {
          alert("Kindly turn on your location to get current place weather");
          getWeatherInfo("delhi")
            .then((details) => {
              console.log(details);
              setData(details);
              setWeeklyData(details.days);
              setLocation("");
              setIsLoader(false);
            })
            .catch((err) => {
              setIsLoader(false);
              setIsError(true);
              console.log(err);
            });
        });
    }
  }, [disableGeo]);

  const getSearchData = () => {
    setDisableGeo(false);
    setIsLoader(true);
    setIsError(false);
    console.log(location);
    getWeatherInfo(location)
      .then((details) => {
        console.log(details);
        setData(details);
        setWeeklyData(details.days);
        setLocation("");
        setIsLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 4000);
        setLocation("delhi");
        console.log(err);
      });
  };
  const cityName = (city) => {
    setLocation(city);
  };
  console.log(location);
  console.log(weeklyData);
  const searchLocation = () => {
    // console.log(city);
    // setLocation(city);
    getSearchData();
    // setIsSearching(true);
    setDisableGeo(false);
  };
console.log(data)
  const weeklyUpdates = weeklyData.map((ele, index) => {
    return (
      <div key={index} className={styles.smallCards}>
        <div className={styles.weekDate}>{ele.datetime}</div>
        <div className={styles.weekInnerDiv}>
          <img src={IMG[ele.icon] }  style={{paddingBottom:'2em'}} width="40px" />
          <div className={styles.minmaxOfWeek}>
            <div>{ele.tempmax} °C </div>
            <div>{ele.tempmin} °C</div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <AppHeader searchLocation={searchLocation} cityName={cityName} />

      <div className={styles.container}>
        {isLoader && <Loader />}
        {!isLoader && (
          <>
            {isError && (
              <>
                <ErrorMsg />
              </>
            )}
            {!isError && (
              <>
                <div
                  className={styles.upperDiv}
                  style={{
                    backgroundImage:
                      ' url("https: //assets.msn.com/weathermapdata/1/static/background/v2.0/compactads3/Rain 2.png")',
                  }}
                >
                  <div className={styles.placeTime}>
                    {data.resolvedAddress && <p>{data.resolvedAddress}</p>}
                    {data.currentConditions && (
                      <p style={{ marginTop: "-1em" }}>
                        {data.currentConditions.datetime} Hrs
                      </p>
                    )}
                  </div>
                  <div className={styles.rainTemp}>
                    {data.currentConditions && data.currentConditions.icon && (
                      <>
                        {" "}
                        <img
                          src={IMG[data.currentConditions.icon]}
                          width="100px"
                          // height="70px"
                        />
                      </>
                    )}
                    <div className={styles.tempDay}>
                      {data.currentConditions ? (
                        <p className={styles.temp}>
                          {data.currentConditions.temp} °C
                        </p>
                      ) : null}
                    </div>
                    <div className={styles.feelsLike}>
                      {data.currentConditions && (
                        <>
                          <div style={{ fontWeight: "700", fontSize: "22px" }}>
                            {data.currentConditions.conditions}
                          </div>
                          <div style={{ fontSize: "18px" }}>
                            Feels Like{" "}
                            {Math.floor(data.currentConditions.feelslike)} °C
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    {data.description && (
                      <>
                        <div style={{fontSize:'18px'}}>{data.description}</div>
                      </>
                    )}
                  </div>
                  <div className={styles.lastpartOfUpperDiv}>
                    <div className={styles.minorInfo}>
                      {data.currentConditions && (
                        <>
                          <p style={{ fontWeight: "400" }}>Cloud cover</p>
                          <div style={{ marginTop: "-1em", fontWeight: "400" }}>
                            {data.currentConditions.cloudcover} %
                          </div>
                        </>
                      )}
                    </div>
                    <div className={styles.minorInfo}>
                      {data.currentConditions && (
                        <>
                          <p style={{ fontWeight: "400" }}>Dew Point</p>
                          <div style={{ marginTop: "-1em", fontWeight: "400" }}>
                            {data.currentConditions.dew} °C
                          </div>
                        </>
                      )}
                    </div>
                    <div className={styles.minorInfo}>
                      {data.currentConditions && (
                        <>
                          <p style={{ fontWeight: "400" }}>Pressure </p>
                          <div style={{ marginTop: "-1em", fontWeight: "400" }}>
                            {data.currentConditions.pressure} mb
                          </div>
                        </>
                      )}
                    </div>
                    <div className={styles.minorInfo}>
                      {data.currentConditions && (
                        <>
                          <p style={{ fontWeight: "400" }}>Wind Direction</p>
                          <div style={{ marginTop: "-1em", fontWeight: "400" }}>
                            {data.currentConditions.winddir} °
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <h4 className={styles.HighlightHeading}>Current Weather</h4>
                <div className={styles.highlight}>
                  <div className={styles.Card}>
                    <div className={styles.innerCard}>
                      <p style={{ marginBottom: "0rem" }}>Wind Speed</p>
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
