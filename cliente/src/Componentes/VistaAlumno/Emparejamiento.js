import React, { useState, useEffect } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import MatchUser from './Utils/mentorship.png';
import Swal from "sweetalert2";

const Emparejamiento = () => {
    const [showModal, setShowModal] = useState(false);
    const [showHelloWorld, setShowHelloWorld] = useState(false);

    // Función para mostrar la modal
    const handleShowModal = () => setShowModal(true);

    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                setShowModal(false);
                setShowHelloWorld(true);
            }, 10000); // 10 segundos
            return () => clearTimeout(timer);
        }
    }, [showModal]);

    // Función para cerrar la modal manualmente
    const handleCloseModal = () => setShowModal(false);

    const Strikes = () => {
        Swal.fire({
            title: 'Consulta tus strikes',
            text: 'Aquí puedes ver tus strikes',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    }

    return (
        <>
            <Container>
                <img src={MatchUser} alt="Emparejamiento" />
            </Container>
            <Button onClick={handleShowModal}>Iniciar emparejamiento</Button>
            <Button className="btn btn-danger" onClick={Strikes}>Consulta tus strikes</Button>
            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Proceso de emparejamiento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Muestra "Hola Mundo" después de cerrar la modal */}
            {showHelloWorld && <div style={{ backgroundColor: 'white' }}>Hola Mundo</div>}
        </>
    );
}

export default Emparejamiento;
