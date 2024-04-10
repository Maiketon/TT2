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
            className="align-right mx-3" // Añade margen a la derecha si es necesario
            alt="Imagen de Simon Vygostky"/>
        </Col>
        <Col>
        <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex. Fusce quis nibh elit. Nam nisl mauris, pharetra at pulvinar quis, sollicitudin ac ligula. Morbi egestas suscipit massa nec vehicula. In hac habitasse platea dictumst. Donec convallis commodo nunc, accumsan mattis neque convallis non. Vestibulum orci nisl, eleifend quis pellentesque at, ornare at massa. Proin sagittis mi eu lorem fringilla, in sollicitudin arcu gravida. Nulla sollicitudin sollicitudin dui, et accumsan enim cursus non.
        </div>
        </Col>
       </Row>
      </Container>

      <Container className="mt-4">
      <Row>
          <Col md={3} className="mb-3">
          <CardConModal 
          title="Empatia" 
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex" 
          fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex"
        />

          </Col>
          <Col md={3} className="mb-3">
          <CardConModal 
          title="Trabajo en equipo" 
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex" 
          fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex"
        />

          </Col>
          <Col md={3} className="mb-3">
          <CardConModal 
          title="Comunicacion" 
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex" 
          fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex"
        />
          </Col>
          
          <Col md={3} className="mb-3">
          <CardConModal 
          title="Escucha Activa" 
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex" 
          fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex"
        />
          </Col>
        </Row>
      </Container>
      </>
    );
}

export default ContenidoPrincipal;
