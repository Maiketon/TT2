import React, { useState } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import './Css/Botones.css';
import "./Css/Modales.css";

// Componente de la modal //
const MiModal = ({ show, handleClose, title, children }) => {
  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className='fondo-header' closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='fondo-modal'>{children}</Modal.Body>
      <Modal.Footer className='fondo-footer'>
        <Button className='btn-modal' variant="secondary" onClick={handleClose}>
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
      <Card >
        <Card.Body className="d-flex flex-column justify-content-between card-modal">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Button className='btn-leer' variant="primary" onClick={showModal}>
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
