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
          text="Breve descripci&oacute;n sobre trabajo en equipo..." 
          fullText="Aquí va el texto completo sobre trabajo en equipo que se mostrará en el modal."
        />
      </Carousel.Item>

      <Carousel.Item>
      <CardConModal 
          title="Comunicaci&oacute;n" 
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex" 
          fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex"
        />
      </Carousel.Item>

      <Carousel.Item>
      <CardConModal 
          title="Empat&iacute;a" 
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex" 
          fullText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in rhoncus ex"
        />
      </Carousel.Item>
    </Carousel>
    </>
  );
}

export default CarruselPrinicipal;
