import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Tekijä</h5>
            <p>Ville-Valtteri Yritys</p>
            <p>Tehty 30.07.2025</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.linkedin.com/in/ville-valtteri-yritys-07610326a/" className="text-white">Linkedin profiili</a></li>
              <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="text-white">Hyvä biisi</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>About</h5>
            <p>Kyseessä on harjoitustyö, jossa on hyödynnetty Weathermapin tarjoamia säätietoja.</p>
          </Col>
        </Row>
        <hr className="bg-light" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} YourSite</p>
      </Container>
    </footer>
  );
};

export default Footer;
