import * as React from "react";
import axios from "axios";
import DataDisplay from "../components/datadisplay.jsx";
import Dailydata from "../components/dailydata.jsx";
import Weeklydata from "../components/weeklydata.jsx";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "./data.css";
import RainChance from "./rainchance.jsx";
import instance from "../config/api.js";

const Datahandler = ({ selectedcity }) => {
  const [data, setData] = useState(null);
useEffect(() => {
    handleCityChange(selectedcity);
}, [selectedcity]);

  const handleCityChange = async (value) => {
    if (value !== null) {
      try {
        const response = await instance.post("/api/data", {
          city: value,
        });
        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error posting city:", error);
      }
    }
  };

  if (!data) {
    return ( <div className="spinner-container"> <Spinner/> Loading data...</div> )
  }
  return (
    <div className="weather">
      <div className="todays_weather">
        <div className="weather_info">
          <DataDisplay data={data} />
        </div>
        <div className="daily_data">
          <Dailydata data={data} />
        </div>
      </div>

      <div>
        <div className="weekly_data">
          <Weeklydata data={data} />
        </div>
      </div>
      <RainChance data={data} />
    </div>
  );
};

export default Datahandler;
