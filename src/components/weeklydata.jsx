import React, { use , useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';

const Weeklydata = ({ data }) => {
    const [dailytemperature, setDailyTemperature] = useState(null);
    const [weather_description, setWeatherDescription] = useState(null);
    const [time, setTime] = useState(null);
    const [feelslike, setFeelslike] = useState(null);
    const [humidity, setHumidity] = useState(null);


    const formatTimes = (times) => {
      const weekdays = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'];
  
      const formattedTimes = times.map((time) => {
          const [datePart, timePart] = time.split(' ');
          const date = new Date(datePart);
          const day = date.getDate();
          const month = date.getMonth() + 1; 
          const weekday = weekdays[date.getDay()];
          return `${day}.${month} ${weekday}, Kello: ${timePart}`;
      });
      return formattedTimes;
  };
    useEffect(() => {
        if (data) {
            const temps = data["weather_data"][2].map(item => item.temperature);
            const times = data["weather_data"][2].map(item => item.timestamp);
            const weekdays = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];
            const icon = data["weather_data"][2].map(item => item.weather_description);
            const feelslike = data["weather_data"][2].map((item) => item.feels_like);
            const humidity = data["weather_data"][2].map((item) => item.humidity);

            setWeatherDescription(icon);
            setTime(formatTimes(times));
            setDailyTemperature(temps);
            setFeelslike(feelslike);
            setHumidity(humidity);
        }
    }, [data]);

    const options = {
        title: {
          text: 'Kolmen päivän ennuste',
          left: 'center',
          textStyle: {
            color: 'white',
          },
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            const i = params[0].dataIndex;
            const iconCode = weather_description[i]; 
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            return `Sää: <img src="${iconUrl}" style="width:40px;height:40px;" /><br>Lämpötila: ${dailytemperature[i]} °C<br>Tuntuu kuin: ${feelslike[i]} °C<br>Pvm: ${time[i]}<br>Ilman kosteus: ${humidity[i]} %`;
          }
        },
        legend: {
          orient: 'horizontal', 
          left: 'right',
          textStyle: {
            color: 'white',
          },
        },
        xAxis: {
          type: 'category',
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
          <ReactECharts option={options} style={{ height: '15vw', width: '45vw', color:"white"}} />
        </div>
      );

};

export default Weeklydata;