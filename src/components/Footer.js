import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import style from '../assets/styles/footerstyle';

const Footer = () => {
  return (
    <>
      <Container fluid className="bg-warning">
        <Row>
          <Col>
            <h1 style={style.h1}>Eat, Cook, Repeat</h1>
            <h6 style={style.h6}>Share your best recipe by uploading here !</h6>
            <div style={style.div}>
              <ul style={style.ul}>
                <li style={style.li}>
                  <a href="#" style={style.a}>
                    Product
                  </a>
                </li>
                <li style={style.li}>
                  <a href="#" style={style.a}>
                    Company
                  </a>
                </li>
                <li style={style.li}>
                  <a href="#" style={style.a}>
                    Learn more
                  </a>
                </li>
                <li style={style.li}>
                  <a href="#" style={style.a}>
                    Get in touch
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
