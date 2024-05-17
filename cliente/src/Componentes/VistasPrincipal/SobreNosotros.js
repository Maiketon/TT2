// SobreNosotros.js
import React from 'react';
import { Container, Row, Col, Card} from 'react-bootstrap';

//Css
import './Css/SobreNosotros.css';

//Imagenes//
import FAHD from "./Utils/DesarrolladorFredy.jpg";
import MAMB from './Utils/DesarrolladorMiguel.jpg';
import UJMS from './Utils/DesarrolladorUlises.jpg'
import CarruselPrinicipal from './CarruselPrincipal';

const SobreNosotros = () => {
  return (
    <>
    <Container className='p-4 color-fondo'>
    <Row>
      <Col>
        <div>
        Misi&oacute;n
        <p style={{ textAlign: "justify" }}>Posicionar nuestro sistema web como la herramienta de referencia en la ESCOM IPN para el desarrollo de habilidades blandas, adaptándonos continuamente para incluir más semestres y expandirnos a nuevas carreras. Aspiramos a fomentar una comunidad educativa interactiva y colaborativa, donde los estudiantes de diferentes disciplinas y niveles puedan mejorar sus competencias comunicativas y de trabajo en equipo.</p>
    </div>
      </Col>
      <Col>
        <div>
        Visi&oacute;n
        <p style={{ textAlign: "justify" }}>Desarrollar un sistema web prototipo que integre un algoritmo avanzado de emparejamiento de usuarios, diseñado específicamente para fortalecer habilidades blandas en estudiantes de nivel superior. Mediante el uso de chats y videochats, nuestro sistema facilitará la interacción efectiva y el intercambio de conocimientos, permitiendo a los estudiantes mejorar sus competencias comunicativas y de trabajo en equipo en un entorno virtual dinámico y adaptativo. </p>
    </div>
      </Col>
    </Row>
    <Container className='pb-3'>
    <div className='pb-3'>
      
        <div><h2>Más sobre <span>  Habilidades blandas a fortalecer</span></h2></div>
    </div>
    <CarruselPrinicipal />
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
            <Card.Title>Ulises Jes&uacute;s Santos M&eacute;ndez</Card.Title>
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
