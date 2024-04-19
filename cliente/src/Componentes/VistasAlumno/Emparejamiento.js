import React, { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import MatchUser from './Utils/mentorship.png';
import Swal from "sweetalert2";
import './Css/EmparejamientoStyles.css';

const Emparejamiento = () => {
    const [showModal, setShowModal] = useState(false);
    const [showHelloWorld, setShowHelloWorld] = useState(false);
    const [loadingCompleted, setLoadingCompleted] = useState(false);

    // Función para mostrar la modal
    const handleShowModal = () => setShowModal(true);

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

    // Simular el proceso de carga
    const simulateLoading = () => {
        setTimeout(() => {
            setLoadingCompleted(true);
        }, 5000); // Simular una carga de 5 segundos
    };

    const handleStartLoading = () => {
        handleShowModal();
        simulateLoading();
    };

    return (
        <>
            <Container>
                {<img className="medida_matchimg" src={MatchUser} alt="Emparejamiento" />}
            </Container>
            {!loadingCompleted && <Button onClick={handleStartLoading}>Iniciar emparejamiento</Button>}
            {!loadingCompleted && <Button className="btn btn-danger" onClick={Strikes}>Consulta tus strikes</Button>}
            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Proceso de emparejamiento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%', backgroundColor: '#483A63' }}></div>
                    </div>
                    <div style={{ marginTop: '10px' }}>Se está realizando tu emparejamiento</div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Muestra "Hola cards" después de que se complete la carga */}
            {loadingCompleted && <div style={{ backgroundColor: 'white' }}>Hola cards</div>}
        </>
    );
}

export default Emparejamiento;
