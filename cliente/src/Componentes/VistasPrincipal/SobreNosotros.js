import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Css
import './Css/SobreNosotros.css';

// Imagenes
import FAHD from "./Utils/DesarrolladorFredy.jpeg";
import MAMB from './Utils/DesarrolladorMiguel.jpg';
import UJMS from './Utils/DesarrolladorUlises.jpg';
import CardConModal from './ModalPrincipal';

const SobreNosotros = () => {
  return (
    <>
      <Container className='p-4 color-fondo'>
        <Row>
          <Col>
            <div>
              <h2>Misi&oacute;n</h2>
              <p style={{ textAlign: "justify" }}>
                Posicionar nuestro sistema web como la herramienta de referencia en la ESCOM IPN para el desarrollo de habilidades blandas, adaptándonos continuamente para incluir más semestres y expandirnos a nuevas carreras. Aspiramos a fomentar una comunidad educativa interactiva y colaborativa, donde los estudiantes de diferentes disciplinas y niveles puedan mejorar sus competencias comunicativas y de trabajo en equipo.
              </p>
            </div>
          </Col>
          <Col>
            <div>
              <h2>Visi&oacute;n</h2>
              <p style={{ textAlign: "justify" }}>
                Desarrollar un sistema web prototipo que integre un algoritmo avanzado de emparejamiento de usuarios, diseñado específicamente para fortalecer habilidades blandas en estudiantes de nivel superior. Mediante el uso de chats y videochats, nuestro sistema facilitará la interacción efectiva y el intercambio de conocimientos, permitiendo a los estudiantes mejorar sus competencias comunicativas y de trabajo en equipo en un entorno virtual dinámico y adaptativo.
              </p>
            </div>
          </Col>
        </Row>
        
        <Container className='pb-3'>
          <div className='pb-3 text-center'>
            <h2>Más sobre <span>Habilidades blandas a fortalecer</span></h2>
          </div>
          <Row className="justify-content-center">
            <Col xs={12} md={6} className="d-flex align-items-stretch justify-content-center mb-3">
              <CardConModal 
                title="Trabajo en equipo" 
                text="¿Que es el trabajo en equipo?" 
                fullText="Se refiere a la cooperación que se debe tener con los colegas para alcanzar los objetivos que solos no se podrían alcanzar; las habilidades que abarca son ayudar a los demás, capacidad de negociación, capacidad de ceder en ocasiones y tener la habilidad de llegar a acuerdos."
              />
            </Col>
            <Col xs={12} md={6} className="d-flex align-items-stretch justify-content-center mb-3">
              <CardConModal 
                title="Comunicación" 
                text="¿Que es la comunicacion?"  
                fullText="Capacidad de entablar una conversación con otra persona o de redactar cuando se trata de comunicación escrita, la forma de comunicar algo ante un público, interactuar con clientes, proveedores, colegas, superiores y público en general."
              />
            </Col>
          </Row>
        </Container>

        <Container className="pb-3">
          <h1 className="text-center">Desarrolladores</h1>
          <Row className="justify-content-center">
            <Col xs={12} md={4} className="d-flex align-items-stretch justify-content-center mb-3">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={FAHD} />
                <Card.Body>
      <Card.Title>Fredy</Card.Title>
      <Card.Text>
        Fredy es un estudiante de ESCOM (IPN) dedicado a la creación de soluciones tecnológicas innovadoras. Disfruta trabajar en equipo y siempre busca mejorar la experiencia del usuario.
        <ul>
          <li>Comunicación efectiva</li>
          <li>Trabajo en equipo</li>
          <li>Resolución de problemas</li>
          <li>Adaptabilidad</li>
        </ul>
      </Card.Text>
    </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4} className="d-flex align-items-stretch justify-content-center mb-3">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={MAMB} />
                <Card.Body>
      <Card.Title>Miguel</Card.Title>
      <Card.Text>
        Miguel es un ingeniero en formación en ESCOM (IPN) con un fuerte enfoque en la mejora continua y la innovación. Su capacidad para liderar proyectos y su dedicación al aprendizaje lo destacan en el equipo.
        <ul>
          <li>Liderazgo</li>
          <li>Pensamiento crítico</li>
          <li>Gestión del tiempo</li>
          <li>Innovación</li>
        </ul>
      </Card.Text>
    </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4} className="d-flex align-items-stretch justify-content-center mb-3">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={UJMS} />
                <Card.Body>
      <Card.Title>Ulises</Card.Title>
      <Card.Text>
        Ulises es un apasionado estudiante de ESCOM (IPN) con una gran atención al detalle y compromiso con la excelencia. Su capacidad para manejar el estrés y su proactividad lo hacen un miembro valioso del equipo.
        <ul>
          <li>Atención al detalle</li>
          <li>Manejo del estrés</li>
          <li>Proactividad</li>
          <li>Empatía</li>
        </ul>
      </Card.Text>
    </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default SobreNosotros;
