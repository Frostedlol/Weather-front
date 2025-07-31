import "./data.css";

const MainPageData = ({ data }) => {
  console.log(data);
  if (data && data != null) {
    const highestTemp = data.weather_data.reduce((max, item) =>
      item.temperature > max.temperature ? item : max
    );

    const lowestTemp = data.weather_data.reduce((min, item) =>
      item.temperature < min.temperature ? item : min
    );

    const totalTemperature = data.weather_data.reduce(
      (sum, item) => sum + item.temperature,
      0
    );
    const averageTemperature = totalTemperature / data.weather_data.length;

    return (
      <div className="weather-frontpage">
        <div className="mapped-cities">
            <h2>Paikallissää</h2>
          {data.weather_data.map((item, index) => (
            <p key={index}>
              Kaupunki: {item.city}, {item.temperature.toFixed(1)} °C{" "}
              <img
                src={`http://openweathermap.org/img/wn/${item.weather_description}@2x.png`}
                height={30}
              />
            </p>
          ))}
        </div>
        <div className="basic-info">
            <h2>Yhteenveto</h2>
          <p>
            Korkein lämpötila {highestTemp.city},{" "}
            {highestTemp.temperature.toFixed(1)} °C
          </p>
          <p>
            Matalin lämpötila: {lowestTemp.city},{" "}
            {lowestTemp.temperature.toFixed(1)} °C
          </p>

          <p>Keskilämpötila: {averageTemperature.toFixed(1)} °C</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <p>No data available</p>
    </div>
  );
};

export default MainPageData;
