// SobreNosotros.js
import React from 'react';
import { Container, Row, Col, Card} from 'react-bootstrap';

//Css
import './Css/SobreNosotros.css';

//Imagenes//
import FAHD from "./Utils/DesarrolladorFredy.jpg";
import MAMB from './Utils/DesarrolladorMiguel.jpg';
import UJMS from './Utils/DesarrolladorUlises.jpg'
import CardConModal from './ModalPrincipal';


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
    <Container className="pb-3">
      <Row>
          <Col md={6} className="d-flex align-items-stretch">
          <CardConModal className="mb-3 d-flex"
          title="Responsabilidad" 
          text="¿Cómo se manifiestan la autodisciplina y el sentido común en el contexto profesional y académico?" 
          fullText="Se ve reflejada en la puntualidad tanto en la asistencia a una reunión como en la entrega de los trabajos pactados; la autodisciplina, trabajo a consciencia y el sentido común."
        />

          </Col>
          <Col md={6} className="d-flex align-items-stretch">
          <CardConModal className="mb-3 d-flex"
          title="Optimismo" 
          text="¿Cómo cambiaría tu experiencia escolar si siempre vieras el lado positivo de las cosas?" 
          fullText="El optimismo es una habilidad blanda esencial que puede transformar tu experiencia escolar. En lugar de ver los desafíos académicos como obstáculos insuperables, un estudiante optimista los percibe como oportunidades para aprender y crecer. Esta mentalidad positiva no solo mejora tu rendimiento académico, sino que también te ayuda a mantener la calma y la concentración durante los exámenes y tareas difíciles. Además, el optimismo puede mejorar tus relaciones con compañeros y profesores, ya que una actitud positiva y esperanzadora es contagiosa y puede inspirar a otros a adoptar una perspectiva similar. En resumen, el optimismo no solo te hace sentir mejor en el día a día, sino que también te prepara para enfrentar y superar cualquier desafío que la escuela te presente."
        />

          </Col>
          
        </Row>
      </Container>
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
