// SobreNosotros.js
import React from 'react';
import { Container, Row, Col, Card} from 'react-bootstrap';


//Imagenes//
import FAHD from "./Utils/DesarrolladorFredy.jpg";
import MAMB from './Utils/DesarrolladorMiguel.jpg';
import UJMS from './Utils/DesarrolladorUlises.jpg'
import CarruselPrinicipal from './CarruselPrincipal';

const SobreNosotros = () => {
  return (
    <>
    <Container className='p-4'>
    <Row>
      <Col>
        <div>
        Mision
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
      </Col>
      <Col>
        <div>
        Mision
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
      </Col>
    </Row>
    <Container>
    <div>
        Habilidades blandas a fortalecer
    </div>
    <CarruselPrinicipal/>
    </Container>
    <Row>
      <h1>Desarrolladores</h1>
      <Col>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={FAHD} />
      <Card.Body>
            <Card.Title>Fredy Adair Hernandez Dominguez</Card.Title>
            <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut laoreet euismod orci, nec
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={MAMB} />
      <Card.Body>
            <Card.Title>Miguel Angel Montoya Bautista</Card.Title>
            <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut laoreet euismod orci, nec
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={UJMS} />
      <Card.Body>
            <Card.Title>Ulises Jesus Santos Mendez</Card.Title>
            <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut laoreet euismod orci, nec
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    </Container>
  
    


    </>
  );
}

export default SobreNosotros;
