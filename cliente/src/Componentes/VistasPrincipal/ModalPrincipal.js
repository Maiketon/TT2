import React, { useState } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';

// Componente de la modal //
const MiModal = ({ show, handleClose, title, children }) => {
  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

// Componente Card llamando a el componente Modal
const CardConModal = ({title, text, fullText }) => {
  const [modalShow, setModalShow] = useState(false);
  const showModal = () => setModalShow(true); //Variable que se usa para cambiar el valor para poner o ocultar la modal
  //const hideModal = () => setModalShow(false);
  //const hideModal = () => {
    //console.log('Cerrando modal');
    //setModalShow(false);
  //};
 // const hideModal = (event) => {
   // if (event) event.stopPropagation();
    //console.log('Cerrando modal');
    //setModalShow(false);
 // };
  

 const hideModal = (event) => {
    if (event) {
      event.stopPropagation();
    }
    console.log('Cerrando modal');
    setModalShow(false);
    console.log(modalShow);
  };
  
  
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Button variant="primary" onClick={showModal}>
            Leer más
          </Button>
        </Card.Body>
      </Card>

      <MiModal show={modalShow} handleClose={hideModal} title={title}>
        <p>{fullText}</p>
      </MiModal>
    </>
  );
};

export default CardConModal;
