import React, { use, useEffect, useState } from "react";
import "./data.css";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity, WiStrongWind, WiSunrise, WiSunset } from "react-icons/wi";

const DataDisplay = ({ data }) => {
  const [displayData, setDisplayData] = useState(null);
  useEffect(() => {
    if (data) {
      // Assuming data is an object, you can format it as needed
      setDisplayData(data["weather_data"][0]);
    }
  }, [data]);

  if (displayData) {
    const {
      name,
      temperature,
      weather_description,
      humidity,
      wind_speed,
      sunrise,
      sunset,
    } = displayData;
  
    const fetchicon =
      "http://openweathermap.org/img/wn/" + weather_description + "@2x.png";

      
    return (
      <div className="weather_now">
        <pre>Sijainti: {name}</pre>
        <pre>
          <FaTemperatureHigh /> Lämpötila: {temperature} °C
        </pre>
        <pre>
          Sää: <img src={fetchicon} alt="weather icon" />
        </pre>
        <pre>
          <WiHumidity /> Ilmankosteus: {humidity} %
        </pre>
        <pre>
          <WiStrongWind /> Tuulen nopeus: {wind_speed} m/s
        </pre>
        <pre>
          <WiSunrise /> Auringon nousu: {sunrise}
        </pre>
        <pre>
          <WiSunset /> Auringon lasku: {sunset}
        </pre>
      </div>
    );
  }

  return (
    <div className="weather_now">
      <p>Ei saatavilla</p>
    </div>
  );
};

export default DataDisplay;
