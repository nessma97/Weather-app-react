import "./App.css";
import React, { useState } from "react";
const weatherApi = {
  key: "6d6ff2295de59121880fbe337d46edc6",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const searchResult = (e) => {
    if (e.key === "Enter") {
      fetch(`${weatherApi.base}weather?q=${city}&appid=${weatherApi.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setCity("");
        })
        .catch((err) => alert(err.message));
    }
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

    // const date = new Date();

    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // return `${day}-${month}-${year}`;
  };

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app "
          : "app "
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            placeholder="Seach By City..."
            className="search-bar"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={searchResult}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                <address>
                  {weather.name}, {weather.sys.country}
                </address>
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)} °C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="Error">Enter a valid city name..</div>
        )}
      </main>
    </div>
  );
}

export default App;
