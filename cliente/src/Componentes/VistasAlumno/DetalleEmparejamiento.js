
import React, { useState, useEffect } from "react";
import {Button, Card, Modal,Container, CardTitle, CardBody,Form,Pagination } from 'react-bootstrap';
import perfil_generico from './Utils/perfil.png';
import Swal from "sweetalert2";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Await } from "react-router";


const DetalleEmparejamiento = () => {
    const userPk = sessionStorage.getItem("userPk");
    const pkemparejamiento = sessionStorage.getItem("pkEmparejamiento");
    const [Mentor, setMentor] = useState([]);
    const [Aprendiz, setAprendiz] = useState([]);
    const [PKaValidarMentor, setPkaValidarMentor] = useState([]);
    const [PKaValidarAprendiz, setPkaValidarAprendiz] = useState([]);
    const [banderaValidacionMentor, setBanderaValidacionMentor] = useState(null);
    const [banderaValidacionAprendiz, setBanderaValidacionAprendiz] = useState(null);
    const [showModal, setShowModal] = useState(false);
     const [respuesta1, setRespuesta1] = useState('');
     const [respuesta2, setRespuesta2] = useState('');
     const [respuesta3, setRespuesta3] = useState('');
     const [respuesta4, setRespuesta4] = useState('');
     const [respuesta5, setRespuesta5] = useState('');
     const [currentPage, setCurrentPage] = useState(1);
 
     const handleRespuesta1 = (event) => {
         const value = parseInt(event.target.value, 10);
         setRespuesta1(value);
     };
 
     const handleRespuesta2 = (event) => {
         const value = parseInt(event.target.value, 10);
         setRespuesta2(value);
     };
 
     const handleRespuesta3 = (event) => {
         const value = parseInt(event.target.value, 10);
         setRespuesta3(value);
     };
 
     const handleRespuesta4 = (event) => {
         const value = parseInt(event.target.value, 10);
         setRespuesta4(value);
     };
 
     const handleRespuesta5 = (event) => {
         const value = parseInt(event.target.value, 10);
         setRespuesta5(value);
     };
 

 
     
 
     const nextPage = () => {
         setCurrentPage(currentPage + 1);
     };
 
     const prevPage = () => {
         setCurrentPage(currentPage - 1);
     };



     const abrirModal = (PK_EMPAREJAMIENTO) => {
        setShowModal(true);
        console.log(PK_EMPAREJAMIENTO+"aqui");
        sessionStorage.setItem('pkEmparejamiento', JSON.stringify(PK_EMPAREJAMIENTO));
    };
    
    const enviarModal = () => {
        setShowModal(false);
        const promedio = sumarRespuestas();
        const actualizarCalificacion = axios.post(`https://201.124.154.2:3001/api/emparejamiento/actualizarCalificacion?PK_EMPAREJAMIENTO=${pkemparejamiento}&userPk=${userPk}&promedio=${promedio}`);
    //pkemparejmaiento desde session
    //Pkuser desde session
    //ponga la calificacion en el lugar que le corresponde (consulta)
    //verificar si ya estan las 2 calificaciones, si si, updatear a estado 3, si no, dejarlo asi (consulta)
    };
    
    
    
    const sumarRespuestas = () => {
        const sumaTotal = respuesta1 + respuesta2 + respuesta3 + respuesta4 + respuesta5;
        const promedio = sumaTotal / 5;
        console.log(promedio);
        return promedio;
    };

    useEffect(() => {
        const obtenerEmparejamientoMentor = async () => {
            try {
                const response = await axios.get(`https://201.124.154.2:3001/api/emparejamiento/obtenerMentor?userPk=${userPk}`);
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
                const response = await axios.get(`https://201.124.154.2:3001/api/emparejamiento/obtenerAprendiz?userPk=${userPk}`);
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
                    const response = await axios.post(`https://201.124.154.2:3001/api/emparejamiento/obtenerPkaValidar?PK_USERPAIRED=${PK_USERPAIRED}&PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
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
                    const response = await axios.post(`https://201.124.154.2:3001/api/emparejamiento/obtenerPkaValidar?PK_USERPAIRED=${PK_USERPAIRED}&PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
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
            const response = await axios.post(`https://201.124.154.2:3001/api/emparejamiento/updateEmparejamiento?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
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
            // Aqui primero se hacec una consulta para obtener el estado del emparejamiento, si esta pendiente o activo, dependiendo, se hace el rechazo o se finaliza el emparejamiento
            const response = await axios.post(`https://201.124.154.2:3001/api/emparejamiento/saberEstado?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
           
            if(response.data == 5){
                console.log("dio 5");
                await Swal.fire({
                    icon: 'success',
                    title: 'Emparejamiento parcialmente finalizado',
                    text: 'Ya no puedes finalizar este emparejamiento porque ya lo hiciste o ya lo finalizaron., debes responder la evaluación',
                });
            }else if (response.data == 3) {
                console.log("dio 3");
                await axios.post(`https://201.124.154.2:3001/api/emparejamiento/preFinalizarEmparejamiento?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);

                let promedio = abrirModal(PK_EMPAREJAMIENTO); // Abre el modal y obtiene el promedio
                console.log("La suma de respuestas es:", promedio);

                console.log("Soy una consulta y recibo este parametro", promedio);

                //axios hacer consulta del pk y promedio
                //axios.post(`https://201.124.154.2:3001/api/emparejamiento/actualizarCalificacion?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}&CALIFICACION=${promedio}`);
               //update en la base con la calificacion where  // Espera hasta que se resuelva abrirModal
               // console.log(calif);
            }else if(response.data == 1){
                console.log("dio 1");
                await axios.post(`https://201.124.154.2:3001/api/emparejamiento/rechazarEmparejamiento?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
            }
        } catch (error) {
           
            console.error('Error al rechazar el emparejamiento:', error);
        }
    };

    const abrirModalParaEvaluar = async (PK_EMPAREJAMIENTO) => {
        try {
            abrirModal(PK_EMPAREJAMIENTO);
        } catch (error) {
            console.error('Error al activar el emparejamiento:', error);
        }
    }

 
    
    

  
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
                                ) :banderaValidacionAprendiz && banderaValidacionAprendiz.some(bandera => bandera.PK_EMPAREJAMIENTO == aprendiz.PK_EMPAREJAMIENTO && bandera.resultado == 5) ? (
                                    <div className="row">
                                        <div className="col">
                                        <Button onClick={() => abrirModalParaEvaluar(aprendiz.PK_EMPAREJAMIENTO)}>Hacer evaluación</Button>
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
) : banderaValidacionMentor && banderaValidacionMentor.some(bandera => bandera.PK_EMPAREJAMIENTO == mentor.PK_EMPAREJAMIENTO && bandera.resultado == 5) ? (
    <div className="row">
        <div className="col">
        <Button onClick={() => abrirModalParaEvaluar(mentor.PK_EMPAREJAMIENTO)}>Hacer evaluación</Button>
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
                    <h3>Te agradezco por participar en este emparejamiento, por favor, califica mi desempeño llenando el formulario que se presenta a continuación:</h3>
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
                                                value={1} 
                                                checked={respuesta1 === 1} 
                                                onChange={handleRespuesta1} 
                                                
                                            />
                                            <Form.Check 
                                                type="radio" 
                                                label="Regular" 
                                                value={2}
                                                checked={respuesta1 === 2} 
                                                onChange={handleRespuesta1} 
                                                
                                            />
                                            <Form.Check 
                                                type="radio" 
                                                label="Suficiente" 
                                                value={3} 
                                                checked={respuesta1 === 3} 
                                                onChange={handleRespuesta1} 
                                                
                                            />
                                            <Form.Check 
                                                type="radio" 
                                                label="Mucho" 
                                                value={4} 
                                                checked={respuesta1 === 4} 
                                                onChange={handleRespuesta1} 
                                               
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
                                            value={1} 
                                            checked={respuesta2 === 1} 
                                            onChange={handleRespuesta2} 
                                           
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Regular" 
                                            value={2} 
                                            checked={respuesta2 === 2} 
                                            onChange={handleRespuesta2} 
                                            
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Buena" 
                                            value={3} 
                                            checked={respuesta2 === 3} 
                                            onChange={handleRespuesta2} 
                                           
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Muy buena" 
                                            value={4} 
                                            checked={respuesta2 === 4} 
                                            onChange={handleRespuesta2} 
                                           
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
                                            value={1} 
                                            checked={respuesta3 === 1} 
                                            onChange={handleRespuesta3} 
                                           
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Regular" 
                                            value={2}
                                            checked={respuesta3 === 2} 
                                            onChange={handleRespuesta3} 
                                           
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Bueno" 
                                            value={3}
                                            checked={respuesta3 === 3} 
                                            onChange={handleRespuesta3} 
                                           
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Muy bueno" 
                                            value={4} 
                                            checked={respuesta3 === 4} 
                                            onChange={handleRespuesta3} 
                                           
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
                                            value={1} 
                                            checked={respuesta4 === 1} 
                                            onChange={handleRespuesta4} 
                                            
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Regular" 
                                            value={2}
                                            checked={respuesta4 === 2} 
                                            onChange={handleRespuesta4} 
                                            
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Buena" 
                                            value={3}
                                            checked={respuesta4 === 3} 
                                            onChange={handleRespuesta4} 
                                           
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Muy buena" 
                                            value={4}
                                            checked={respuesta4 === 4} 
                                            onChange={handleRespuesta4} 
                                           
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
                                            value={1}
                                            checked={respuesta5 === 1} 
                                            onChange={handleRespuesta5} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Regular" 
                                            value={2}
                                            checked={respuesta5 === 2} 
                                            onChange={handleRespuesta5} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Buena" 
                                            value={3}
                                            checked={respuesta5 === 3} 
                                            onChange={handleRespuesta5} 
                                            name="rating"
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Muy buena" 
                                            value={4}
                                            checked={respuesta5 === 4} 
                                            onChange={handleRespuesta5} 
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