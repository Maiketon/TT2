import React, { useState, useEffect } from "react";
import {Button, Card, Modal,Container, CardTitle, CardBody,Form,Pagination } from 'react-bootstrap';
import perfil_generico from './Utils/perfil.png';
import Swal from "sweetalert2";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const DetalleEmparejamiento = () => {
    const userPk = sessionStorage.getItem("userPk");
    const [Mentor, setMentor] = useState([]);
    const [Aprendiz, setAprendiz] = useState([]);
    const [PKaValidarMentor, setPkaValidarMentor] = useState([]);
    const [PKaValidarAprendiz, setPkaValidarAprendiz] = useState([]);
    const [banderaValidacionMentor, setBanderaValidacionMentor] = useState(null);
    const [banderaValidacionAprendiz, setBanderaValidacionAprendiz] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [rating, setRating] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const abrirModal = () => {
        setShowModal(true);
    };

    const enviarModal = () => {
        setShowModal(false);
    };


    useEffect(() => {
        const obtenerEmparejamientoMentor = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/emparejamiento/obtenerMentor?userPk=${userPk}`);
                setMentor(response.data);
                setPkaValidarMentor(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del emparejamiento activo del mentor:', error);
            }
        };
        obtenerEmparejamientoMentor();
    }, [userPk]);

    useEffect(() => {
        const obtenerEmparejamientoAprendiz = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/emparejamiento/obtenerAprendiz?userPk=${userPk}`);
                setAprendiz(response.data);
                setPkaValidarAprendiz(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del emparejamiento activo del aprendiz:', error);
            }
        };
        obtenerEmparejamientoAprendiz();
    }, [userPk]);

    useEffect(() => {
        const obtenerBanderasValidacionMentor = async () => {
            try {
                const nuevasBanderas = [];
                for (const usuario of PKaValidarMentor) {
                    const { PK_USERPAIRED, PK_EMPAREJAMIENTO } = usuario;
                    const response = await axios.post(`http://localhost:3001/api/emparejamiento/obtenerPkaValidar?PK_USERPAIRED=${PK_USERPAIRED}&PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
                    nuevasBanderas.push(response.data);
                }
                setBanderaValidacionMentor(nuevasBanderas);
            } catch (error) {
                console.error('Error al obtener las banderas de validación para mentores', error);
            }
        };
        obtenerBanderasValidacionMentor();
    }, [PKaValidarMentor]);

    useEffect(() => {
        const obtenerBanderasValidacionAprendiz = async () => {
            try {
                const nuevasBanderas = [];
                for (const usuario of PKaValidarAprendiz) {
                    const { PK_USERPAIRED, PK_EMPAREJAMIENTO } = usuario;
                    const response = await axios.post(`http://localhost:3001/api/emparejamiento/obtenerPkaValidar?PK_USERPAIRED=${PK_USERPAIRED}&PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
                    nuevasBanderas.push(response.data);
                }
                setBanderaValidacionAprendiz(nuevasBanderas);
            } catch (error) {
                console.error('Error al obtener las banderas de validación para aprendices', error);
            }
        };
        obtenerBanderasValidacionAprendiz();
    }, [PKaValidarAprendiz]);

    const handleActivarEmparejamiento = async (PK_EMPAREJAMIENTO) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/emparejamiento/updateEmparejamiento?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
            console.log('Emparejamiento activado exitosamente:', response.data);
            await Swal.fire({
                icon: 'success',
                title: '¡Emparejamiento activado!',
                text: 'El emparejamiento ha sido activado exitosamente.',
            });
            window.location.reload();
        } catch (error) {   
            console.error('Error al activar el emparejamiento:', error);
        }
    };

    const handleRechazarEmparejamiento = async (PK_EMPAREJAMIENTO) => {
        try {
            abrirModal();
            // Agregar lógica para rechazar el emparejamiento utilizando PK_EMPAREJAMIENTO
            console.log('Emparejamiento rechazado:', PK_EMPAREJAMIENTO);
        } catch (error) {
            console.error('Error al rechazar el emparejamiento:', error);
        }
    };

    return (
        <div className='margen_superior'>
            <Card>
                <Card.Body>
                    <Card.Title>Mis mentorias </Card.Title>
                    {Aprendiz.map((aprendiz, index) => (
                        <div className="card" key={index}>
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <img
                                            className="img_perfil_m"
                                            alt="imagen de perfil"
                                            src={perfil_generico}
                                        />
                                    </div>
                                    <div className="col">{aprendiz.nombreCompleto}</div>
                                    <div className="col">Fecha</div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button className="btn_rechazo" onClick={() => handleRechazarEmparejamiento(aprendiz.PK_EMPAREJAMIENTO)}>
                                            X
                                        </button>
                                    </div>
                                    <div className="col">{aprendiz.estado}</div>
                                    <div className="col">TOKEN</div>
                                </div>
                                {banderaValidacionAprendiz && banderaValidacionAprendiz.some(bandera => bandera.PK_EMPAREJAMIENTO == aprendiz.PK_EMPAREJAMIENTO && bandera.resultado == 1) ? (
                                    <div className="row">
                                        <div className="col">
                                            <Button onClick={() => handleActivarEmparejamiento(aprendiz.PK_EMPAREJAMIENTO)}>Activar emparejamiento</Button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </Card.Body>
            </Card>
            <p>&emsp;</p>
           
            <Card>
                <Card.Body>
                    <Card.Title>Mis A.O </Card.Title>
                    {Mentor.map((mentor, index) => (
                        <div className="card" key={index}>
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <img
                                            className="img_perfil_m"
                                            alt="imagen de perfil"
                                            src={perfil_generico}
                                        />
                                    </div>
                                    <div className="col">{mentor.nombreCompleto}</div>
                                    <div className="col">Fecha</div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button className="btn_rechazo" onClick={() => handleRechazarEmparejamiento(mentor.PK_EMPAREJAMIENTO)}>
                                            X
                                        </button>
                                    </div>
                                    <div className="col">{mentor.estado}</div>
                                    <div className="col">TOKEN</div>
                                </div>
                                {banderaValidacionMentor && banderaValidacionMentor.some(bandera => bandera.PK_EMPAREJAMIENTO == mentor.PK_EMPAREJAMIENTO && bandera.resultado == 1) ? (
                                    <div className="row">
                                        <div className="col">
                                            <Button onClick={() => handleActivarEmparejamiento(mentor.PK_EMPAREJAMIENTO)}>Activar emparejamiento</Button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={() => {}} backdrop="static" keyboard={false} size="xl">
                <Modal.Header>
                    <Modal.Title>Califica a tu mentor o aprendiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Te agradezco por participar en este emparejamiento, por favor, califica mi desempeño llenando las estrellas que se ven a continuación:</h3>
                    <Container>
                        <i className="bi bi-star fs-1 m-2"></i>
                        <i className="bi bi-star fs-1 m-2"></i>
                        <i className="bi bi-star fs-1 m-2"></i>
                        <i className="bi bi-star fs-1 m-2"></i>
                        <i className="bi bi-star fs-1 m-2"></i>
                    </Container>
                    <Container>
                        <p>Responde el siguiente cuestionario:</p>
                    </Container>
                    <Card>
                    <CardBody>
                            {currentPage === 1 && (
                                <Form>
                                    <Form.Group>
                                        <Form.Label>¿Cómo considerarías tu fortalecimiento de seguridad al exponer tus dudas?</Form.Label>
                                        <div>
                                            <Form.Check 
                                                type="radio" 
                                                label="Poco" 
                                                value="Poco" 
                                                checked={rating === 'Poco'} 
                                                onChange={handleRatingChange} 
                                                name="rating"
                                            />
                                            <Form.Check 
                                                type="radio" 
                                                label="Regular" 
                                                value="Regular" 
                                                checked={rating === 'Regular'} 
                                                onChange={handleRatingChange} 
                                                name="rating"
                                            />
                                            <Form.Check 
                                                type="radio" 
                                                label="Suficiente" 
                                                value="Suficiente" 
                                                checked={rating === 'Suficiente'} 
                                                onChange={handleRatingChange} 
                                                name="rating"
                                            />
                                            <Form.Check 
                                                type="radio" 
                                                label="Mucho" 
                                                value="Mucho" 
                                                checked={rating === 'Mucho'} 
                                                onChange={handleRatingChange} 
                                                name="rating"
                                            />
                                        </div>
                                    </Form.Group>
                                </Form>
                            )}
                            {currentPage === 2 && (
                                <Form>
                                <Form.Group>
                                    <Form.Label>¿Cómo consideras que fue la fluidez en la comunicación con tu pareja?</Form.Label>
                                    <div>
                                        <Form.Check 
                                            type="radio" 
                                            label="Poca" 
                                            value="Poca" 
                                            checked={rating === 'Poco'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Regular" 
                                            value="Regular" 
                                            checked={rating === 'Regular'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Buena" 
                                            value="Buena" 
                                            checked={rating === 'Buena'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Muy buena" 
                                            value="Muy buena" 
                                            checked={rating === 'Muy buena'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                    </div>
                                </Form.Group>
                            </Form>
                            )}
                            {currentPage === 3 && (
                                <Form>
                                <Form.Group>
                                    <Form.Label>¿Cómo consideras que fue tu desempeño en tu rol?</Form.Label>
                                    <div>
                                        <Form.Check 
                                            type="radio" 
                                            label="Poco" 
                                            value="Poco" 
                                            checked={rating === 'Poco'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Regular" 
                                            value="Regular" 
                                            checked={rating === 'Regular'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Bueno" 
                                            value="Bueno" 
                                            checked={rating === 'Bueno'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Muy bueno" 
                                            value="Muy bueno" 
                                            checked={rating === 'Muy bueno'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                    </div>
                                </Form.Group>
                            </Form>
                            )}
                            {currentPage === 4 && (
                                <Form>
                                <Form.Group>
                                    <Form.Label>¿Cómo evaluarías tu experiencia general en esta clase?</Form.Label>
                                    <div>
                                        <Form.Check 
                                            type="radio" 
                                            label="Mala" 
                                            value="Mala" 
                                            checked={rating === 'Mala'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Regular" 
                                            value="Regular" 
                                            checked={rating === 'Regular'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Buena" 
                                            value="Buena" 
                                            checked={rating === 'Buena'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Muy buena" 
                                            value="Muy buena" 
                                            checked={rating === 'Muy buena'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                    </div>
                                </Form.Group>
                            </Form>
                            )}
                            {currentPage === 5 && (
                                <Form>
                                <Form.Group>
                                    <Form.Label>¿Cómo te ha parecido la orientación que has recibido hasta ahora en la clase?</Form.Label>
                                    <div>
                                    <Form.Check 
                                            type="radio" 
                                            label="Mala" 
                                            value="Mala" 
                                            checked={rating === 'Mala'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Regular" 
                                            value="Regular" 
                                            checked={rating === 'Regular'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Buena" 
                                            value="Buena" 
                                            checked={rating === 'Buena'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Muy buena" 
                                            value="Muy buena" 
                                            checked={rating === 'Muy buena'} 
                                            onChange={handleRatingChange} 
                                            name="rating"
                                        />
                                    </div>
                                </Form.Group>
                            </Form>
                            )}
                        </CardBody>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Pagination>
                        <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
                        <Pagination.Item active={currentPage === 1} onClick={() => setCurrentPage(1)}>1</Pagination.Item>
                        <Pagination.Item active={currentPage === 2} onClick={() => setCurrentPage(2)}>2</Pagination.Item>
                        <Pagination.Item active={currentPage === 3} onClick={() => setCurrentPage(3)}>3</Pagination.Item>
                        <Pagination.Item active={currentPage === 4} onClick={() => setCurrentPage(4)}>4</Pagination.Item>
                        <Pagination.Item active={currentPage === 5} onClick={() => setCurrentPage(5)}>5</Pagination.Item>
                        <Pagination.Next onClick={nextPage} disabled={currentPage === 5} />
                    </Pagination>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={enviarModal}>Enviar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DetalleEmparejamiento;