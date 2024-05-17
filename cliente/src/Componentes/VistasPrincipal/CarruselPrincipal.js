import React from 'react';
import CardConModal from './ModalPrincipal';
import { Carousel} from 'react-bootstrap';

function CarruselPrinicipal() {
  return (
    <>
    <Carousel indicators={false}>
      <Carousel.Item>
      <CardConModal className="mb-3 d-flex"
          title="Trabajo en equipo" 
          text="¿Qué es el trabajo en equipo?" 
          fullText="Se refiere a la cooperación que se debe tener con los colegas para alcanzar los objetivos que solos no se podrían alcanzar; las habilidades que abarca son ayudar a los demás, capacidad de negociación, capacidad de ceder en ocasiones y tener la habilidad de llegar a acuerdos."
        />
      </Carousel.Item>

      <Carousel.Item>
      <CardConModal className="mb-3 d-flex"
          title="Comunicaci&oacute;n" 
          text="¿Se considera a la Comunicaci&oacute;n habilidad blanda? " 
          fullText="Capacidad de entablar una conversación con otra persona o de redactar cuando se trata de comunicación escrita, la forma de comunicar algo ante un público, interactuar con clientes, proveedores, colegas, superiores y público en general."
        />
      </Carousel.Item>
    </Carousel>
    </>
  );
}

export default CarruselPrinicipal;
