import React, { useState, useEffect } from "react";
import { Button, Container, Modal, Card } from "react-bootstrap";
import MatchUser from './Utils/mentorship.png';
import Swal from "sweetalert2";
import './Css/EmparejamientoStyles.css';
import axios from "axios";

const Emparejamiento = () => {
    const [showModal, setShowModal] = useState(false);
    const [loadingCompleted, setLoadingCompleted] = useState(false);
    const [showImage, setShowImage] = useState(true);
    const [datosAlumno, setDatosAlumno] = useState([]);
    const userPk = sessionStorage.getItem("userPk");
    const bandera = sessionStorage.getItem("bandera");

    // Función para mostrar la modal
    const handleShowModal = () => setShowModal(true);

    // Función para cerrar la modal manualmente
    const handleCloseModal = () => setShowModal(false);

    const obtenerStrikes = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/emparejamiento/obtenerStrikes?userPk=${userPk}`);
            const strikes = response.data[0].REPORTADO;
            return strikes;
        } catch (error) {
            console.error('Error al obtener la cantidad de strikes:', error);
        }
    };
    
    const Strikes = async () => {
        const strikes = await obtenerStrikes();
        Swal.fire({
            title: 'Consulta tus strikes',
            text: `Tienes ${strikes} strikes`,
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    };

    const handleStartLoading = async () => {
        if (parseInt(bandera) !== 3) {
            handleShowModal();
            await obtenerDatosAlumno();
            setTimeout(() => {
                setLoadingCompleted(true);
                setShowImage(false); // Ocultar la imagen al finalizar la carga
                handleCloseModal(); // Cerrar la modal al finalizar la carga
            }, 3000); // Esperar 3 segundos antes de finalizar la carga
        } else {
            Swal.fire({
                title: 'Tienes 4 emparejamientos completos',
                text: 'No puedes iniciar el emparejamiento porque tienes 4 emparejamientos, por favor ve al módulo de emparejamientos activos. ',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const obtenerDatosAlumno = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/emparejamiento/obtenerDatosAlumno?userPk=${userPk}`);
            setDatosAlumno(response.data);
        } catch (error) {
            console.error('Error al obtener el nombre del usuario:', error);
        }
    };
    
    return (
        <>
            <div>
                <Container>
                    {showImage && <img className="medida_matchimg" src={MatchUser} alt="Emparejamiento" />}
                </Container>
                {!loadingCompleted && <Button onClick={handleStartLoading}>Iniciar emparejamiento</Button>}
                {!loadingCompleted && <Button className="btn btn-danger" onClick={Strikes}>Consulta tus strikes</Button>}
                {/* Modal */}
                <Modal show={showModal} onHide={handleCloseModal} centered closeButton={false}>
                    <Modal.Header closeButton={false}>
                        <Modal.Title>Proceso de emparejamiento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%', backgroundColor: '#483A63' }}></div>
                        </div>
                        <div style={{ marginTop: '10px' }}>Se está realizando tu emparejamiento</div>
                    </Modal.Body>
                </Modal>
                {/* Muestra "Hola cards" después de que se complete la carga */}
                {loadingCompleted && (
                    <div style={{ backgroundColor: 'white' }}>
                        <p>Resultados del emparejamiento</p>
                        {datosAlumno.map((alumno, index) => (
                            <Card key={index}>
                                <Card.Body>
                                    <Card.Title>{alumno.nombreCompleto}</Card.Title>
                                    <div className="card">
                                        <div className="fondo_def_conoc">
                                            <h5 className="card-title">Deficiencias/Conocimientos</h5>
                                            <div className="conocimientos_deficiencias">
                                                <section className="columna">
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                        <div className="card text-white bg-danger mb-3">
                                                            <div className="card-header">Deficiencias</div>
                                                            <div className="card-body">
                                                                {alumno.NOMBRE_DEFICIENCIA1 && <p>{alumno.NOMBRE_DEFICIENCIA1}</p>}
                                                                {alumno.NOMBRE_DEFICIENCIA2 && <p>{alumno.NOMBRE_DEFICIENCIA2}</p>}
                                                                {alumno.NOMBRE_DEFICIENCIA3 && <p>{alumno.NOMBRE_DEFICIENCIA3}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                                <section className="columna">
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                        <div className="card text-white bg-success mb-3">
                                                            <div className="card-header">Fortalezas</div>
                                                            <div className="card-body">
                                                                {alumno.NOMBRE_FORTALEZA1 && <p>{alumno.NOMBRE_FORTALEZA1}</p>}
                                                                {alumno.NOMBRE_FORTALEZA2 && <p>{alumno.NOMBRE_FORTALEZA2}</p>}
                                                                {alumno.NOMBRE_FORTALEZA3 && <p>{alumno.NOMBRE_FORTALEZA3}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                                <div className="conocimientos_deficiencias">
                                    <div className="columna">
                                        <button className="btn_rechazo">X</button>
                                    </div>
                                    <div className="columna">
                                        <button href="#" className="btn btn-primary">Aceptar emparejamento</button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Emparejamiento;
