import React from 'react';
import CardConModal from './ModalPrincipal';
import { Carousel} from 'react-bootstrap';

function CarruselPrinicipal() {
  return (
    <>
    <Carousel indicators={false}>
      <Carousel.Item>
        <CardConModal 
          title="Trabajo en equipo" 
          text="Breve descripción sobre trabajo en equipo..." 
          fullText="Aquí va el texto completo sobre trabajo en equipo que se mostrará en el modal."
        />
      </Carousel.Item>

      <Carousel.Item>
      <CardConModal 
          title="Comunicacion" 
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex" 
          fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex"
        />
      </Carousel.Item>

      <Carousel.Item>
      <CardConModal 
          title="Empatia" 
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex" 
          fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex"
        />
      </Carousel.Item>
    </Carousel>
    </>
  );
}

export default CarruselPrinicipal;
