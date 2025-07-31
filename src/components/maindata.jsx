import React, {useEffect, useState} from "react";
import "./data.css";

const MainData = ({setSelectedCity, data, cities, setCities}) => {
  
  const handleCityClick = (cityName) => {
    const selectedCity = {
      label: cityName,
    }
    setSelectedCity(selectedCity);
  };


  useEffect(() => {
    if (data) {
      const updatedCities = cities.map((city) => {
        const weather = data.weather_data.find((w) => w.city === city.name); 
        if (weather) {
          return {
            ...city,
            temp: weather.temperature, 
            icon: weather.weather_description,
          };
        }
        return city;
      });

      setCities(updatedCities); 
    }
  }, [data]);

  
  return (
    <div>
      {data && (
        <svg width="500" height="600" viewBox="0 0 500 600">
          <image
            href="/Finland_Regions_Map.svg"
            x="0"
            y="0"
            width="500"
            height="600"
          />
          {cities.map((city) => (
            <g key={city.name}>
              <image
                href={`http://openweathermap.org/img/wn/${city.icon}@2x.png`}
                x={city.x}
                y={city.y}
                width="30%"
                height="30"
              />
              <text x={city.x + 35} y={city.y + 0} fill="white" fontSize="14" style={{ cursor:"pointer"}} className="graph-text"onClick={() => handleCityClick(city.name) }
>
                {city.name} {city.temp}°C
              </text>
            </g>
          ))}
        </svg>
      )}
      
    </div>
  );
};

export default MainData;
