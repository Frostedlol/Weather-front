import { useState } from "react";
import "./main.css";
import WeatherNavbar from "../navbar/Navbar";
import Datahandler from "../components/datahandler";
import MainData from "../components/maindata";
import MainDataHandler from "../components/mainpagehandler";
import Footer from "../components/footer";

function Mainpage() {
  const [selectedcity, setSelectedCity] = useState(null);
  const [background, setBackground] = useState(null);

  const getBackgroundImage = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 4 && currentHour < 12) {
      return "/morning.jpg";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "/noon.jpg";
    } else {
      return "/night.jpg";
    }
  };

  const getTimeBasedClass = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 4 && currentHour < 12) {
      return "morning"; // 04:00 - 12:00
    } else if (currentHour >= 12 && currentHour < 18) {
      return "noon"; // 12:00 - 18:00
    } else {
      return "night"; // 18:00 - 04:00
    }
  };

  return (
    <div className="App">
      <WeatherNavbar setSelectedCity={setSelectedCity} />
      <img
        src={getBackgroundImage()}
        alt="Background"
        className="background-image"
      />
      <div className={`main-content ${getTimeBasedClass()}`}>
        {selectedcity && <Datahandler selectedcity={selectedcity} />}
        {!selectedcity && (
          <div>
            <MainDataHandler setSelectedCity={setSelectedCity}></MainDataHandler>
          </div>
        )}
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
