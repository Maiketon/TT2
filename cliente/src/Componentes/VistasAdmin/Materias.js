import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { BsStarFill, BsStar } from 'react-icons/bs';
import Avatar1 from "./Utils/Avatar1Login.jpg";

const Materias = () => {
  return (
    <Container fluid style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
      <Carousel>
        {/* Slide 1 */}
        <Carousel.Item>
        <Row>
            <Col className="border">Nombre de usuario</Col>
        </Row>
      <Row>
        <Col md={6}>
            <div className="usuario-info">
                <div className="usuario-icon">
                    <img src={Avatar1} alt="Logo usuario" width={100} height={100} roundedCircle
                                style ={{borderRadius: "50%"}}/>
                </div>
            <div className="usuario-rating">
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStar />
            </div>
            </div>
        </Col>
        <Col md={6}>
            <div className="usuario-description">
                <p>Descripción del Usuario 1</p>
                <p>correo@usuario.com</p>
            </div>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="border">
            <div className="texto-container">
                <p>Número de Emparejamiento</p>
                <br></br>
            </div>
        </Col>
        <Col md={6} className="border">
        <p>Oportunidades y deficiencias</p>
        <br></br>
        </Col>
      </Row>  
<br></br>
<br></br>
      <Row>
            <Col className="border">Nombre de usaurio</Col>
        </Row>
      <Row >
        <Col md={6}>
            <div className="usuario-info">
                <div className="usuario-icon">
                <img src={Avatar1} alt="Logo usuario" width={100} height={100} roundedCircle
                                style ={{borderRadius: "50%"}}/>
                </div>
            <div className="usuario-rating">
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStar />
            </div>
            </div>
        </Col>
        <Col md={6} >
            <div className="usuario-description">
                <p>Descripción del Usuario 1</p>
                <p>correo@usuario.com</p>
            </div>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="border">
            <div className="texto-container">
                <p>Número de Emparejamiento</p>
                <br></br>
            </div>
        </Col>
        <Col md={6} className="border">
        <p>Oportunidades y deficiencias</p>
        <br></br>
        </Col>
      </Row>
        </Carousel.Item>

        <Carousel.Item>
        <Row>
            <Col>Nombre de usaurio</Col>
        </Row>
      <Row>
        <Col md={6}>
            <div className="usuario-info">
                <div className="usuario-icon">
                <img src={Avatar1} alt="Logo usuario" width={100} height={100} roundedCircle
                                style ={{borderRadius: "50%"}}/>
                </div>
            <div className="usuario-rating">
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStar />
            </div>
            </div>
        </Col>
        <Col md={6}>
            <div className="usuario-description">
                <p>Descripción del Usuario 1</p>
                <p>correo@usuario.com</p>
            </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
            <div className="texto-container">
                <p>Número de Emparejamiento</p>
            </div>
        </Col>
        <Col md={6}>
        <p>Oportunidades y deficiencias</p>
        </Col>
      </Row>  
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Materias;
