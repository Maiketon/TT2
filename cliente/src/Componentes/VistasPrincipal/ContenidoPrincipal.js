import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import SimonVygotsky from './Utils/Vygotsky.jpg';
import CardConModal from './ModalPrincipal';
const ContenidoPrincipal = () => 
{
    return (
        <>
        <Container className='p-5'>
        <Row>
        <Col>
        <img
            src= {SimonVygotsky} // Ruta del Logo
            width="248"   // Establece el ancho del logo
            height="305"  // Establece la altura del logo
            className="align-right mx-3 rounded" // Añade margen a la derecha si es necesario
            alt="Imagen de Simon Vygostky"/>
        </Col>
        <Col>
        <div className='p-1' style={{ textAlign: "justify" }}>
        ¡Hola a todos! Les presento nuestro último proyecto: una aplicación web diseñada especialmente para impulsar el desarrollo de habilidades blandas como la comunicación y el trabajo en equipo. Esto no es solo para el ámbito académico, sino también te servira para el laboral y personal.
        </div>
        <div className='p-1' style={{ textAlign: "justify" }}>
        Utilizamos un enfoque súper interesante basado en los 13 tipos de aprendizaje, el modelo VAK y, por supuesto, la famosa Zona de Desarrollo Próximo (ZDP) de Vygotsky. Hablando de Vygotsky, su teoría realmente nos inspira, porque pone énfasis en cómo el aprendizaje social precede al desarrollo individual. Nuestra plataforma aprovecha esta idea para adaptar el material educativo a tu nivel actual, asegurando que siempre estés avanzando desde donde estás.
        </div>
        <div  className='p-1'style={{ textAlign: "justify" }}>
        Además, tenemos un sistema de emparejamiento, basado en el algoritmo de Gale y Shapley, que optimiza cómo te conectas con otros usuarios. Esto facilita encontrar compañeros de estudio que realmente complementen tu estilo de aprendizaje y te ayuden a mejorar.
        </div>
        </Col>
       </Row>
      </Container>

      <Container>
        <div><h3>Más sobre <span>habilidades blandas</span></h3></div>
      </Container>

      <Container className="mt-4">
      <Row>
          <Col md={3} className="d-flex align-items-stretch">
          <CardConModal className="mb-3 d-flex"
          title="Responsabilidad" 
          text="¿Cómo se manifiestan la autodisciplina y el sentido común en el contexto profesional y académico?" 
          fullText="Se ve reflejada en la puntualidad tanto en la asistencia a una reunión como en la entrega de los trabajos pactados; la autodisciplina, trabajo a consciencia y el sentido común."
        />

          </Col>
          <Col md={3} className="d-flex align-items-stretch">
          <CardConModal className="mb-3 d-flex"
          title="Trabajo en equipo" 
          text="¿Qué es el trabajo en equipo?" 
          fullText="Se refiere a la cooperación que se debe tener con los colegas para alcanzar los objetivos que solos no se podrían alcanzar; las habilidades que abarca son ayudar a los demás, capacidad de negociación, capacidad de ceder en ocasiones y tener la habilidad de llegar a acuerdos."
        />

          </Col>
          <Col md={3} className="d-flex align-items-stretch">
          <CardConModal className="mb-3 d-flex"
          title="Comunicaci&oacute;n" 
          text="¿Se considera a la Comunicaci&oacute;n habilidad blanda? " 
          fullText="Capacidad de entablar una conversación con otra persona o de redactar cuando se trata de comunicación escrita, la forma de comunicar algo ante un público, interactuar con clientes, proveedores, colegas, superiores y público en general."
        />
          </Col>
          
          <Col md={3} className="d-flex align-items-stretch">
          <CardConModal className="mb-3 d-flex"
          title="Flexibilidad" 
          text="
          ¿Qué implica la capacidad de adaptabilidad en un entorno laboral y cómo se relaciona con el aprendizaje autónomo y la disposición al cambio?" 
          fullText="Se refiere a la capacidad para adaptarse a los cambios, estar dispuesto a cambiar la forma de trabajo y aprender de manera autónoma para adaptarse."
        />
          </Col>
        </Row>
      </Container>
      </>
    );
}

export default ContenidoPrincipal;
