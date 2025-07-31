import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import ComboBox from "./Combobox";
import Form from "react-bootstrap/Form";

function WeatherNavbar({ setSelectedCity }) {

  /* 
    #121F3B night
    #3a5b7e morning
    #f0a500 noon
  */
  const getTimeBasedClass = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 4 && currentHour < 12) {
        return "#263f5a"; 
    } else if (currentHour >= 12 && currentHour < 18) {
        return "#20304e"; 
    } else {
        return "#121F3B"; 
    }
    };
  return (
    <Navbar
      style={{ backgroundColor: getTimeBasedClass(), zIndex: "2" }}
    >
      <Container>
        <Navbar.Brand href="/" style={{ color: "white" }}>
          Weathermap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={{ color: "white" }}>
              Etusivu
            </Nav.Link>
          </Nav>
          <Form>
            <ComboBox setSelectedCity = {setSelectedCity}/>
          </Form>   
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default WeatherNavbar;