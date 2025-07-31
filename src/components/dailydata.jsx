import React, { use, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const Dailydata = ({ data }) => {
  const [dailytemperature, setDailyTemperature] = useState(null);
  const [time, setTime] = useState(null);
  const [weather_description, setWeatherDescription] = useState(null);
  const [feelslike, setFeelslike] = useState(null);
  const [humidity, setHumidity] = useState(null);
  useEffect(() => {
    if (data) {
      const temps = data["weather_data"][1].map((item) => item.temperature);
      const times = data["weather_data"][1].map((item) => item.timestamp);
      const icon = data["weather_data"][1].map(
        (item) => item.weather_description
      );
      const feelslike = data["weather_data"][1].map((item) => item.feels_like);
      const humidity = data["weather_data"][1].map((item) => item.humidity);

      const filtertime = times.map((item) => item.split(" ")[1]);
      setTime(filtertime);
      setDailyTemperature(temps);
      setWeatherDescription(icon);
      setFeelslike(feelslike);
      setHumidity(humidity);
    }
  }, [data]);

  const options = {
    title: {
      text: "Tämän päivän ennuste",
      left: "center",
      textStyle: {
        color: 'white',
      },
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const i = params[0].dataIndex;
        const iconCode = weather_description[i];
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        return `Sää: <img src="${iconUrl}" style="width:40px;height:40px;" /><br>Lämpötila: ${dailytemperature[i]} °C<br>Tuntuu kuin: ${feelslike[i]} °C<br>Aika: ${time[i]}<br>Ilman kosteus: ${humidity[i]} %`;
      },
    },
    legend: {
      orient: "horizontal",
      left: "right",
      textStyle: {
        color: 'white',
      },
    },
    xAxis: {
      type: "category",
      data: time,
      axisLabel: {
        rotate: 0,
        color: 'white',
      },
    },
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: 'white',
        },
      },
      {
        type: "value",
        position: "right",
      },
      {
        type: "value",
        position: "right",
      },
      
      
    ],
    series: [
      {
        name: "Lämpötilat",
        type: "line",
        data: dailytemperature,
        smooth: true,
      },
      {
        name: "Tuntuu kuin",
        type: "line",
        data: feelslike,
        smooth: true,
      },
      {
        name: "Ilman kosteus",
        type: "line",
        data: humidity,
        smooth: true,
      },
    ],
  };

  return (
    <div>
      <ReactECharts
        option={options}
        style={{ height: "17vw", width: "40vw" }}
      />
    </div>
  );
};

export default Dailydata;
