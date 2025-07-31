import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import "./data.css";
import instance from "../config/api";
import MainData from "./maindata";
import MainPageData from "./mainpagedata";
import MainPageChart from "./mainpagechart";

const MainDataHandler = ({ setSelectedCity }) => {
  const [data, setData] = useState(null);

  const [cities, setCities] = useState([
    { name: "Helsinki", x: 155, y: 560 },
    { name: "Tampere", x: 130, y: 500, temp: 0, icon: "01d" },
    { name: "Turku", x: 90, y: 550, temp: 0, icon: "01d" },
    { name: "Oulu", x: 190, y: 290, temp: 0, icon: "01d" },
    { name: "Rovaniemi", x: 220, y: 180, temp: 0, icon: "01d" },
    { name: "Joensuu", x: 280, y: 442, temp: 0, icon: "01d" },
    { name: "Inari", x: 230, y: 65, temp: 0, icon: "01d" },
  ]);

  const handleCityChange = async (cityNames) => {
    if (cityNames.length > 0) {
      try {
        const response = await instance.post("/data/countrydata", {
          cities: cityNames,
        });
        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error posting city names:", error);
      }
    }
  };

  useEffect(() => {
    const cityNames = cities.map((city) => city.name);
    handleCityChange(cityNames);
  }, []);

  if (!data) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" />
        Loading data...
      </div>
      
    );
  }

  return (
    <div>
      <div className="main-page">
        <div className="main-page-picture">
          <MainData
            setSelectedCity={setSelectedCity}
            data={data}
            cities={cities}
            setCities={setCities}
          />
        </div>
        <div className="main-page-text">
          <MainPageData data={data} />
        </div>
      </div> 
      <MainPageChart data={data}/>

    </div>
  );
};

export default MainDataHandler;
