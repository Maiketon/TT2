import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { BsStarFill, BsStar } from 'react-icons/bs';
import Avatar1 from "./Utils/Avatar1Login.jpg";

const Sanciones = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
    <Container style={{ width: '50%', maxWidth: '800px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <Carousel>
        {/* Slide 1 */}
        <Carousel.Item>
        <Row>
            <Col className="border">Nombre de usuario</Col>
        </Row>
      <Row className="border">
        <Col>
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
        <Col>
            <div className="usuario-description">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex</p>
                <p>correo@usuario.com</p>
            </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: '10px', marginTop: '10px' }}>
        <Col>
            <div className="texto-container">
            <Button variant="primary" style={{ marginRight: '10px', padding: '10px' }}>Sancionar</Button>
                                  
            </div>
        </Col>
      </Row>  
      <Row>
        <Col>
            <div className="texto-container">
            <Button variant="danger" style={{ padding: '10px' }}>Eliminar Usuario</Button>
            </div>
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
    </div>
  );
}

export default Sanciones;
