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
    const [deletedCardIndex, setDeletedCardIndex] = useState(null); 
    const [deleteAcceptPairmentCard, setdeleteAcceptPairment] = useState(null);
    const userPk = sessionStorage.getItem("userPk");
    const numrechazos = sessionStorage.getItem("numRechazos");
    const bandera = sessionStorage.getItem("bandera");
    const numemparejamientos = sessionStorage.getItem("totalEmparejamientos");
    const total_aprendiz = parseInt(sessionStorage.getItem("totalAprendiz"));
    const total_enseñante = parseInt(sessionStorage.getItem("totalEnseñante"));
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);


    // Función para mostrar la modal
    const handleShowModal = () => setShowModal(true);

    // Función para cerrar la modal manualmente
    const handleCloseModal = () => setShowModal(false);


  //FUNCIONES PARA BORRAR LAS CARDS CUANDO SE PRESIONA EL BOTON DE RECHAZAR EMPAREJAMIENTO//////////  
    const handleDeleteCard = async (index) => {
        const numRechazos = parseInt(sessionStorage.getItem("numRechazos"));
        
        if (numRechazos > 0) {
            setDeletedCardIndex(index); // Establecer el índice de la tarjeta eliminada
            await actualizarRechazos();
        }
        // No se realiza ninguna acción si numRechazos es igual o menor que 0
    };


    useEffect(() => {
        // Lógica para eliminar la tarjeta después de la animación
        if (deletedCardIndex !== null) {
            setTimeout(() => {
                setDatosAlumno((prevDatos) => prevDatos.filter((_, index) => index !== deletedCardIndex));
                setDeletedCardIndex(null);
            }, 300); // Tiempo de espera que coincide con la duración de la animación
        }
    }, [deletedCardIndex]);
///////////////////////////////////////////////////////////////////////////////////////////////////////////

    
const handleDeleteAcceptCard = async (index, pkUsuarioCandidato, tipoCoincidencia) => {
    // Imprimir el usuario seleccionado en la consola
    console.log('Usuario seleccionado:', { pkUsuarioCandidato, tipoCoincidencia });
    setDeletedCardIndex(index); 
    // Llamar a la función para insertar el registro
    await insertarRegistro(pkUsuarioCandidato, tipoCoincidencia);
};

useEffect(() => {
    // Lógica para eliminar la tarjeta después de la animación
    if (deleteAcceptPairmentCard !== null) {
        setTimeout(() => {
            setDatosAlumno((prevDatos) => prevDatos.filter((_, index) => index !== deleteAcceptPairmentCard));
            setdeleteAcceptPairment(null);
        }, 300); // Tiempo de espera que coincide con la duración de la animación
    }
}, [deleteAcceptPairmentCard]);

const insertarRegistro = async (pkUsuarioCandidato, tipoCoincidencia) => {
    console.log("Esta es bandera ");
    console.log(bandera);
    console.log("Este es el tipo de coincidencia");
    console.log(tipoCoincidencia);
    let total_aprendizDisponible = 0;
    let total_enseñanteDisponible = 0;
    let banderaDisponible = bandera;
    let banderaColisiones = 0;
    

    
    try {
        
        const totalEmparejamientos = parseInt(sessionStorage.getItem("totalEmparejamientos"));
        let totalEmparejamientosActualizados = totalEmparejamientos + 1;
        if (totalEmparejamientos === 4) {
            Swal.fire({
                title: 'No puedes hacer más emparejamientos',
                text: 'Revisa tus emparejamientos.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        } else if(banderaDisponible == 1 && tipoCoincidencia === "Aprendiz") {
            Swal.fire({
                title: 'No puedes hacer más emparejamientos del rol de aprendiz',
                text: 'Revisa tus emparejamientos.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        } else if(banderaDisponible == 2 && tipoCoincidencia === "Mentor") {
            Swal.fire({
                title: 'No puedes hacer más emparejamientos del rol de mentor',
                text: 'Revisa tus emparejamientos.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }else
        {
           banderaColisiones = await verificarColision(pkUsuarioCandidato, tipoCoincidencia);
           console.log("Esta es la bandera de colisiones");
        console.log(banderaColisiones);
        }

        


        if (banderaColisiones == 1) {
            Swal.fire({
                title: 'No puedes hacer más emparejamientos porque hay una colision',
                text: 'Revisa tus emparejamientos.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }

        else {
            const response = await axios.post(`http://localhost:3001/api/emparejamiento/insertarRegistros?usuarioPrincipalPK=${userPk}&tipoCoincidencia=${tipoCoincidencia}&usuarioCandidatoPK=${pkUsuarioCandidato}`);
            sessionStorage.setItem('totalEmparejamientos',totalEmparejamientosActualizados );
            // Realizar cualquier otra acción necesaria después de insertar el registro
        }
        if(tipoCoincidencia === "Aprendiz"){
            total_aprendizDisponible = total_aprendiz + 1;
            if(total_aprendizDisponible == 2){
                banderaDisponible = 1;
                sessionStorage.setItem('bandera',banderaDisponible );
            }
    
        }else if(tipoCoincidencia === "Mentor"){
            total_enseñanteDisponible = total_enseñante + 1;
            console.log("Este es el total de enseñantes disponibles");
            console.log(total_enseñanteDisponible);
            if(total_enseñanteDisponible == 2){
                banderaDisponible = 2;
                sessionStorage.setItem('bandera',banderaDisponible );
                
            }
        }
    } catch (error) {
        console.error('Error al realizar la actualización de rechazos', error);
    }
};

const verificarColision = async (pkUsuarioCandidato, tipoCoincidencia) => {
    try {let banderaColisiones = 0;
            console.log("entre en verificarColision");
            const response = await axios.post(`http://localhost:3001/api/emparejamiento/verificarColision?pkUsuarioCandidato=${pkUsuarioCandidato}&tipoCoincidencia=${tipoCoincidencia}`);
            
            console.log("Esta es la respuesta de la colision");
            console.log(response.data);
            if(response.data === 1){
               return banderaColisiones = 1; 
            }else{
                return banderaColisiones = 0;
            }
        
    } catch (error) {
        console.error('Error al realizar la actualización de rechazos', error);
    }
};

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

    useEffect(() => {
        Rechazos(); // Se ejecuta al cargar el componente
    }, [userPk]);

    const Rechazos = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/emparejamiento/obtenerRechazos?userPk=${userPk}`);
            const rechazos = response.data[0].RECHAZOS;
            sessionStorage.setItem('numRechazos', JSON.stringify(rechazos));
        } catch (error) {
            console.error('Error al obtener la cantidad de rechazos:', error);
        }
    };


//MANEJADOR DE LA BARRA DE CARGA
    const handleStartLoading = async () => {
        if (parseInt(bandera) !== 3) {
            handleShowModal();
            await obtenerAlumnosEmparejamiento();
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
//FUNCION PARA ACTUALIZAR EL NUMERO DE RECHAZOS EN EL CAMPO DE TEXTO
    const actualizarRechazos = async () => {
        try {
            const numRechazos = parseInt(sessionStorage.getItem("numRechazos"));
    
            if (numRechazos === 0) {
                Swal.fire({
                    title: 'No puedes hacer más rechazos',
                    text: 'Has agotado tus rechazos disponibles.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                const response = await axios.post(`http://localhost:3001/api/emparejamiento/actualizarRechazos?numrechazos=${numRechazos}&userPk=${userPk}`);
                const rechazosDisponibles = response.data.rechazosdisponibles;
    
                // Actualizar el valor de rechazos disponibles en sessionStorage
                sessionStorage.setItem('numRechazos', JSON.stringify(rechazosDisponibles));
            }
        } catch (error) {
            console.error('Error al realizar la actualización de rechazos', error);
        }
    };

    const obtenerAlumnosEmparejamiento = async () => {
        try{
            const response = await axios.post(`http://localhost:3001/api/algoritmo/obtenerUsuarioPrincipal?pkUsuarioPrincipal=${userPk}&banderaRol=${bandera}`);
            setDatosAlumno(response.data);
        }catch(error){
            console.error('Error al obtener los datos de los alumnos emparejados', error);
        }
    };


    const actualizarEmparejamientosDisponibles = async () => {
        try{
            const response = await axios.post(`http://localhost:3001/api/emparejamiento/actualizarEmparejamientosDisponibles?userPk=${userPk}`);
            const emparejamientos_disponibles=response.data.emparejamientosdisponibles;
        }catch(error){
            console.error('Error al actualizar los emparejamientos disponibles', error);
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
                        <div class="row">
                        <div class="col">Rechazos disponibles:  {sessionStorage.getItem('numRechazos')}</div>
                        <div class="col">Emparejamientos que tienes:  {sessionStorage.getItem('totalEmparejamientos')}</div>
                        </div>
                        {datosAlumno.map((alumno, index) => (
                            <Card key={index} className={index === deletedCardIndex ? 'fadeOutAnimation' : ''}>
                                <Card.Body>
                                    <Card.Title>{alumno.candidato.nombreCompleto}</Card.Title>
                                    <Card.Text>{"Tu seras " + alumno.tipoCoincidencia}</Card.Text>
                                    <div className="card">
                                        <div className="fondo_def_conoc">
                                            <h5 className="card-title">Deficiencias/Conocimientos</h5>
                                            <div className="conocimientos_deficiencias">
                                                <section className="columna">
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                        <div className="card text-white bg-danger mb-3">
                                                            <div className="card-header">Deficiencias</div>
                                                            <div className="card-body">
                                                                {alumno.candidato.NOMBRE_DEFICIENCIA1 && <p>{alumno.candidato.NOMBRE_DEFICIENCIA1}</p>}
                                                                {alumno.candidato.NOMBRE_DEFICIENCIA2 && <p>{alumno.candidato.NOMBRE_DEFICIENCIA2}</p>}
                                                                {alumno.candidato.NOMBRE_DEFICIENCIA3 && <p>{alumno.candidato.NOMBRE_DEFICIENCIA3}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                                <section className="columna">
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                        <div className="card text-white bg-success mb-3">
                                                            <div className="card-header">Fortalezas</div>
                                                            <div className="card-body">
                                                                {alumno.candidato.NOMBRE_ENSEÑANZA1 && <p>{alumno.candidato.NOMBRE_ENSEÑANZA1}</p>}
                                                                {alumno.candidato.NOMBRE_ENSEÑANZA2 && <p>{alumno.candidato.NOMBRE_ENSEÑANZA2}</p>}
                                                                {alumno.candidato.NOMBRE_ENSEÑANZA3 && <p>{alumno.candidato.NOMBRE_ENSEÑANZA3}</p>}
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
                                    <button className="btn_rechazo" onClick={() => { handleDeleteCard(index); actualizarRechazos();  }}>X</button>

                                    </div>
                                    <div className="columna">
                                        <button href="#" className="btn btn-primary" onClick={() => { handleDeleteAcceptCard(index,alumno.candidato.PK_USUARIO, alumno.tipoCoincidencia);  }}>Aceptar emparejamento</button>
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
