
import React, { useState, useEffect } from "react";
import {Button, Card, Modal,Container, CardTitle, CardBody,Form,Pagination,Col } from 'react-bootstrap';
import perfil_generico from './Utils/perfil.png';
import Swal from "sweetalert2";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./Css/DetallesEmparejamiento.css";
import { Await } from "react-router";
import Cookies from 'js-cookie';


const DetalleEmparejamiento = () => {

    const userPk = Cookies.get('userPk');
    //const userPk = sessionStorage.getItem("userPk");
    const pkemparejamiento = Cookies.get('pkEmparejamiento');
    //const pkemparejamiento = sessionStorage.getItem("pkEmparejamiento");
    const [Mentor, setMentor] = useState([]);
    const [Aprendiz, setAprendiz] = useState([]);
    const [PKaValidarMentor, setPkaValidarMentor] = useState([]);
    const [PKaValidarAprendiz, setPkaValidarAprendiz] = useState([]);
    const [banderaValidacionMentor, setBanderaValidacionMentor] = useState(null);
    const [banderaValidacionAprendiz, setBanderaValidacionAprendiz] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [respuesta1, setRespuesta1] = useState(0);
    const [respuesta2, setRespuesta2] = useState(0);
    const [respuesta3, setRespuesta3] = useState(0);
    const [showModalReporte, setShowModalReporte] = useState(false);
    const [reportText, setReportText] = useState('');
    
     const [currentPage, setCurrentPage] = useState(1);
     const [deletedCardIndex, setDeletedCardIndex] = useState(null); 
     const [rol, setRol] = useState(null);
     let banderaFormulario = 0;

 
     const handleRespuesta1 = (event) => {
        const value = event.target.value ? parseInt(event.target.value, 10) : 0;
        console.log("AQUI"+value);
        setRespuesta1(value);
    };

    const handleRespuesta2 = (event) => {
        const value = event.target.value ? parseInt(event.target.value, 10) : 0;
        console.log(value);
        setRespuesta2(value);
    };

    const handleRespuesta3 = (event) => {
        const value = event.target.value ? parseInt(event.target.value, 10) : 0;
        console.log(value);
        setRespuesta3(value);
    };
 
     const handleDeleteCard = async (index) => {
            setDeletedCardIndex(index);
    };

    useEffect(() => {
        if (deletedCardIndex !== null) {
            setTimeout(() => {
                setMentor((prevDatos) => prevDatos.filter((_, index) => index !== deletedCardIndex));
                setDeletedCardIndex(null);
            }, 300); // Tiempo de espera que coincide con la duración de la animación
        }
    }, [deletedCardIndex]);
     
 
     const nextPage = () => {
         setCurrentPage(currentPage + 1);
     };
 
     const prevPage = () => {
         setCurrentPage(currentPage - 1);
     };



     const abrirModal = (PK_EMPAREJAMIENTO,rol) => {
            setShowModal(true);
            console.log(PK_EMPAREJAMIENTO+"aqui");
            Cookies.set('pkEmparejamiento', JSON.stringify(PK_EMPAREJAMIENTO), { expires: 1 });
            Cookies.set('rol',rol);
            setRol(rol);

    };
    
    const confirmarReporte =async() => {
        try {
            const pkemparejamiento = Cookies.get('pkEmparejamiento');
            const userPk = Cookies.get('userPk');
            console.log(pkemparejamiento);
            console.log(userPk);
            console.log(reportText);
            const response = await axios.post('http://localhost:3001/api/emparejamiento/reportarUsuario', {
                pkEmparejamiento: pkemparejamiento,
                pkUsuarioQueReporta: userPk,
                mensaje: reportText,
            });
            if (response.status===201)
                {
                    Swal.fire({
                        icon: "success",
                        title: "Usuario reportado con éxito.",
                        message: "Lamentamos la mala experiencia que has tenido, este reporte no repercutira en tus calificaciones",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    setShowModalReporte(false);
                }
            
        } catch (error) {
            console.log("Error al reportar al usuario");
        }
        
    };
    const handleAccept = () => {
        setShowModalReporte(true);
    };

    const handleCancelModal = () => {
        setShowModalReporte(false);
    };

    const reportarUsuario = async () => 
    {
        Swal.fire({
            title: '¿Estás seguro en reportar a este alumno?',
            text: "No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Rechazar',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setShowModal(false);
                handleAccept();
            }
        });
    }
    
    const enviarModal = async () => { 
        if (respuesta1 === 0 || respuesta2 === 0 || respuesta3 === 0) {
            await Swal.fire({
                icon: 'warning',
                title: 'Faltan preguntas por responder',
                text: 'Debes de responder a todas las preguntas si quieres continuar con tu proceso de finalizar emparejamiento.'
            });
            return;
        }
        try {
            await Swal.fire({
                icon: 'success',
                title: 'Tus respuestas fueron evaluadas',
                text: 'Gracias por contestar la evaluación,puedes continuar con tus emparejamientos.'
            });
            setShowModal(false);
            const promedio = sumarRespuestas();
            const pkemparejamiento = Cookies.get('pkEmparejamiento');
            const userPk = Cookies.get('userPk');
            console.log(pkemparejamiento);
            console.log(userPk);
            console.log(promedio);
            console.log("aqui");
            console.log("Aqui empieza el insertar califiacion");
            const response = await axios.post(`http://localhost:3001/api/emparejamiento/actualizarCalificacion?PK_EMPAREJAMIENTO=${pkemparejamiento}&userPk=${userPk}&promedio=${promedio}`);
            console.log(response);
            const response2 = await axios.post(`http://localhost:3001/api/emparejamiento/comprobar2Calificaciones?PK_EMPAREJAMIENTO=${pkemparejamiento}`);
            // Verificar la respuesta para asegurarse de que la actualización fue exitosa
            if(response2.data == "Completo"){
                await Swal.fire({
                    icon: 'success',
                    title: '¡Emparejamiento finalizado!',
                    text: 'Ya puedes hacer mas emparejamientos.',
                });

            const response3 = await axios.post(`http://localhost:3001/api/emparejamiento/actualizarEstadoEmparejamiento?PK_EMPAREJAMIENTO=${pkemparejamiento}`);
            //consulta que me traiga el pk del emparejado
            console.log("Aqui empieza el insertar califiacion");
            const emparejadosResponse= await axios.post(`http://localhost:3001/api/emparejamiento/obtenerEmparejados?PK_EMPAREJAMIENTO=${pkemparejamiento}`);


         const emparejados = emparejadosResponse.data;
         console.log("Estos son los emparejados");
        console.log(emparejados);

        // Iterar sobre los emparejados y actualizar calificaciones para cada uno
        for (const emparejado of emparejados) {
            const userPks = [emparejado.PK_USER1, emparejado.PK_USER2];

            for (const userPk of userPks) {
                console.log(`Actualizando calificaciones para el usuario con PK ${userPk}`);
                const response4 = await axios.post(`http://localhost:3001/api/emparejamiento/actualizarCalfAlumnoGeneral?userPk=${userPk}`);
                console.log(response4.data);

                const { promedio_rol_1, promedio_rol_2 } = response4.data;
                
                    console.log(`Promedio rol 1: ${promedio_rol_1}`);
                    console.log(`Promedio rol 2: ${promedio_rol_2}`);
                    let promedioGeneral;
                    if (promedio_rol_1 === 0) {
                        promedioGeneral = (5 + promedio_rol_2) / 2
                    } else if (promedio_rol_2 === 0) {
                        promedioGeneral = (promedio_rol_1 + 5) / 2
                    } else {
                        promedioGeneral = (promedio_rol_1 + promedio_rol_2) / 2;
                    }

                    const response5 = await axios.post(`http://localhost:3001/api/emparejamiento/updatearCalificacion`, {
                        userPk,
                        promedio_rol_1,
                        promedio_rol_2,
                        promedioGeneral
                    });
                    console.log(response5.data);
                

                //logica medallas
                //medalla 1
                const medalla1 = await axios.post(`http://localhost:3001/api/emparejamiento/medalla1?userPk=${userPk}`);
                console.log(medalla1);

                //medalla 2
                const medalla2 = await axios.post(`http://localhost:3001/api/emparejamiento/medalla2?userPk=${userPk}`);
            
                //medalla 3
                const medalla3 = await axios.post(`http://localhost:3001/api/emparejamiento/medalla3?userPk=${userPk}`);

                //medalla 4
                const medalla4 = await axios.post(`http://localhost:3001/api/emparejamiento/medalla4?userPk=${userPk}`);

                //medalla 5
                const medalla5 = await axios.post(`http://localhost:3001/api/emparejamiento/medalla5?userPk=${userPk}`);

                //medalla 6
                const medalla6 = await axios.post(`http://localhost:3001/api/emparejamiento/medalla6?userPk=${userPk}`);
            
            }

        }

         

        }    
            //window.location.reload();
            //verificar si si se inserto calificacion
            //Falta hacer una funcion para comprobar si ya estan las 2 calificaciones
            //Falta hacer una actualizacion en la tabla de alumnos, para actualizar su calificacion
        } catch (error) {
            console.error("Error al enviar la calificación:", error);
        }
    };
     
    
    
    
    const sumarRespuestas = () => {
        const sumaTotal = respuesta1 + respuesta2 + respuesta3;
        const promedio = (sumaTotal*5) / 12;
        console.log(promedio);
        return promedio;
    };

    useEffect(() => {
        const obtenerEmparejamientoMentor = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/emparejamiento/obtenerMentor?userPk=${userPk}`);
                setMentor(response.data);
                setPkaValidarMentor(response.data);
                //setRol(response.data.rol);
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
                //setRol(response.data.rol);
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

               //Se inserta en la tabla en la tabla comunicacionzg un nuevo registro //
               const generartoken = await axios.post('http://localhost:3001/api/emparejamiento/hacerTokenSala', {
                PK_EMPAREJAMIENTO: PK_EMPAREJAMIENTO
            });            
            console.log('Este es el token generado', generartoken);
            //Se cambia el estatus del emparejamiento//
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

    const obtenerToken = async(PK_EMPAREJAMIENTO)=>
        {
            try {
                const response = await axios.get(`http://localhost:3001/api/emparejamiento/obtenerTokenC?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
                const { token } = response.data;

                // Mostrar Sweet Alert
                await Swal.fire({
                    icon: 'success',
                    title: 'Token de videochat copiado',
                    text: 'Ve a tu módulo de Comunicación, coloca tu nombre y entra a la reunión.'
                });

                // Concatenar el token al final del URL
                const newUrl = `http://localhost:3000/VistasAlumno/PrincipalAlumno?roomID=${token}`;
                window.history.replaceState({}, '', newUrl);
                // Recargar la pestaña actual
                window.location.reload();
            } catch (error) {
                console.error('Error al obtener el token:', error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo obtener el token. Inténtalo de nuevo más tarde.'
                });
            }
        }

    const handleRechazarEmparejamiento = async (PK_EMPAREJAMIENTO,rol) => {
        try {           
            // Aqui primero se hacec una consulta para obtener el estado del emparejamiento, si esta pendiente o activo, dependiendo, se hace el rechazo o se finaliza el emparejamiento
            const response = await axios.post(`http://localhost:3001/api/emparejamiento/saberEstado?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
           
            if(response.data == 5){
                console.log("dio 5");
                await Swal.fire({
                    icon: 'success',
                    title: 'Emparejamiento parcialmente finalizado',
                    text: 'Ya no puedes finalizar este emparejamiento porque ya lo hiciste o ya lo finalizaron., debes responder la evaluación',
                });
            }else if (response.data == 3) {
                console.log("dio 3");
                console.log(rol);
                await axios.post(`http://localhost:3001/api/emparejamiento/preFinalizarEmparejamiento?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
                let promedio = abrirModal(PK_EMPAREJAMIENTO,rol); // Abre el modal y obtiene el promedio
                console.log("La suma de respuestas es:", promedio);

                console.log("Soy una consulta y recibo este parametro", promedio);

                //axios hacer consulta del pk y promedio
                //axios.post(`http://localhost:3001/api/emparejamiento/actualizarCalificacion?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}&CALIFICACION=${promedio}`);
                //update en la base con la calificacion where  // Espera hasta que se resuelva abrirModal
               // console.log(calif);
            }else if(response.data == 1){
                console.log("dio 1");
                await axios.post(`http://localhost:3001/api/emparejamiento/rechazarEmparejamiento?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
                //handleDeleteCard(index,dato);
                await Swal.fire({
                    icon: 'success',
                    title: 'Emparejamiento rechazado',
                    text: 'El emparejamiento ha sido rechazado exitosamente.',
                });
                window.location.reload();
            }

        } catch (error) {
           
            console.error('Error al rechazar el emparejamiento:', error);
        }
    };

    const abrirModalParaEvaluar = async (PK_EMPAREJAMIENTO,rol) => {
        try {
            abrirModal(PK_EMPAREJAMIENTO,rol);
        } catch (error) {
            console.error('Error al activar el emparejamiento:', error);
        }
    }

 
    
    

  
    return (
        <div className='margen_superior'>
            <Modal show={showModalReporte} onHide={handleCancelModal}>
                <Modal.Header>
                    <Modal.Title>Redacta tu reporte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formReportText">
                            <Form.Label>Reporte</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Escribe tu reporte a 50 caracteres"
                                maxLength="50"
                                value={reportText}
                                onChange={(e) => setReportText(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={confirmarReporte}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card className="custom-card">
        <div className="custom-card-header-mentorias">
            <Card.Title className="custom-card-title">Emparejamientos donde eres Mentor</Card.Title>
        </div>
        <Card.Body>
            {Aprendiz.map((aprendiz, index) => (
                <div className="inner-card mb-3" key={index}>
                    <div className="row no-gutters align-items-center">
                        <div className="col-md-2 text-center">
                            <img
                                className="img_perfil_m"
                                alt="imagen de perfil"
                                src={perfil_generico}
                            />
                        </div>
                        <div className="col-md-7">
                            <div className="card-body">
                                <h5 className="card-title">{aprendiz.nombreCompleto}</h5>
                                
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <button className="btn btn-danger btn-sm" onClick={() => handleRechazarEmparejamiento(aprendiz.PK_EMPAREJAMIENTO, aprendiz.rol)}>
                                Rechazar/Finalizar emparejamiento
                            </button>
                        </div>
                    </div>
                    <div className="row no-gutters mt-2 text-center">
                        <div className="col-md-12">
                            {aprendiz.estado == 1 ? (
                                <div>
                                    <p>Pendiente</p>
                                    <i className="bi bi-clock-fill fs-1 text-primary"></i>
                                </div>
                            ) : aprendiz.estado == 2 ? (
                                <div>
                                    <p>Finalizado</p>
                                    <i className="bi bi-person-badge-fill fs-1 text-danger"></i>
                                </div>
                            ) : aprendiz.estado == 3 ? (
                                <div>
                                    <p>Activo</p>
                                    <i className="bi bi-person-fill-check fs-1 text-success"></i>
                                </div>
                            ) : aprendiz.estado == 4 ? (
                                <div>
                                    <p>Rechazado</p>
                                    <i className="bi bi-person-fill-x fs-1 text-danger"></i>
                                </div>
                            ) : aprendiz.estado == 5 ? (
                                <div>
                                    <p>Finalizado parcialmente</p>
                                    <i className="bi bi-person-fill-down fs-1 text-success"></i>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    {aprendiz.estado == 3 && (
                        <div className="row no-gutters mt-2 text-center">
                            <div className="col-md-12">
                                <Container>
                                    <Button onClick={() => obtenerToken(aprendiz.PK_EMPAREJAMIENTO)}>Copiar Token</Button>
                                </Container>
                            </div>
                        </div>
                    )}
                    {banderaValidacionAprendiz && banderaValidacionAprendiz.some(bandera => bandera.PK_EMPAREJAMIENTO == aprendiz.PK_EMPAREJAMIENTO && bandera.resultado == 1) ? (
                        <div className="row no-gutters mt-2 text-center">
                            <div className="col-md-12">
                                <Button onClick={() => handleActivarEmparejamiento(aprendiz.PK_EMPAREJAMIENTO)}>Activar emparejamiento</Button>
                            </div>
                        </div>
                    ) : banderaValidacionAprendiz && banderaValidacionAprendiz.some(bandera => bandera.PK_EMPAREJAMIENTO == aprendiz.PK_EMPAREJAMIENTO && bandera.resultado == 5) ? (
                        <div className="row no-gutters mt-2 text-center">
                            <div className="col-md-12">
                                <Button onClick={() => abrirModalParaEvaluar(aprendiz.PK_EMPAREJAMIENTO, aprendiz.rol)}>Hacer evaluación</Button>
                            </div>
                        </div>
                    ) : null}
                </div>
            ))}
        </Card.Body>
    </Card>
            <p>&emsp;</p>
           
            <Card className="custom-card">
        <div className="custom-card-header-oportunidad">
            <Card.Title className="custom-card-title">Emparejamientos donde eres Aprendiz</Card.Title>
        </div>
        <Card.Body>
            {Mentor.map((mentor, index) => (
                <div className="inner-card mb-3" key={index}>
                    <div className="row no-gutters align-items-center">
                        <div className="col-md-2 text-center">
                            <img
                                className="img_perfil_m"
                                alt="imagen de perfil"
                                src={perfil_generico}
                            />
                        </div>
                        <div className="col-md-7">
                            <div className="card-body">
                                <h5 className="card-title">{mentor.nombreCompleto}</h5>
                                
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <button className="btn btn-danger btn-sm" onClick={() => handleRechazarEmparejamiento(mentor.PK_EMPAREJAMIENTO, mentor.rol)}>
                                Rechazar/Finalizar emparejamiento
                            </button>
                        </div>
                    </div>
                    <div className="row no-gutters mt-2 text-center">
                        <div className="col-md-12">
                            {mentor.estado == 1 ? (
                                <div>
                                    <p>Pendiente</p>
                                    <i className="bi bi-clock-fill fs-1 text-primary"></i>
                                </div>
                            ) : mentor.estado == 2 ? (
                                <div>
                                    <p>Finalizado</p>
                                    <i className="bi bi-person-badge-fill fs-1 text-danger"></i>
                                </div>
                            ) : mentor.estado == 3 ? (
                                <div>
                                    <p>Activo</p>
                                    <i className="bi bi-person-fill-check fs-1 text-success"></i>
                                </div>
                            ) : mentor.estado == 4 ? (
                                <div>
                                    <p>Rechazado</p>
                                    <i className="bi bi-person-fill-x fs-1 text-danger"></i>
                                </div>
                            ) : mentor.estado == 5 ? (
                                <div>
                                    <p>Finalizado parcialmente</p>
                                    <i className="bi bi-person-fill-down fs-1 text-success"></i>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    {mentor.estado == 3 && (
                        <div className="row no-gutters mt-2 text-center">
                            <div className="col-md-12">
                                <Container>
                                    <Button onClick={() => obtenerToken(mentor.PK_EMPAREJAMIENTO)}>Copiar Token</Button>
                                </Container>
                            </div>
                        </div>
                    )}
                    {banderaValidacionMentor && banderaValidacionMentor.some(bandera => bandera.PK_EMPAREJAMIENTO == mentor.PK_EMPAREJAMIENTO && bandera.resultado == 1) ? (
                        <div className="row no-gutters mt-2 text-center">
                            <div className="col-md-12">
                                <Button onClick={() => handleActivarEmparejamiento(mentor.PK_EMPAREJAMIENTO)}>Activar emparejamiento</Button>
                            </div>
                        </div>
                    ) : banderaValidacionMentor && banderaValidacionMentor.some(bandera => bandera.PK_EMPAREJAMIENTO == mentor.PK_EMPAREJAMIENTO && bandera.resultado == 5) ? (
                        <div className="row no-gutters mt-2 text-center">
                            <div className="col-md-12">
                                <Button onClick={() => abrirModalParaEvaluar(mentor.PK_EMPAREJAMIENTO, mentor.rol)}>Hacer evaluación</Button>
                            </div>
                        </div>
                    ) : null}
                </div>
            ))}
        </Card.Body>
    </Card>
            <Modal show={showModal} onHide={() => {}} backdrop="static" keyboard={false} size="xl">
                <Modal.Header>
                    <Modal.Title>Califica a tu {rol == '1' ? "mentor" : "aprendiz"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Te agradezco por participar en este emparejamiento, por favor, califica mi desempeño llenando el formulario que se presenta a continuación:</h3>
                    <Card>
                    
                    <CardBody>
                            
                            {currentPage === 1 && (
                                <Form>
                                    <Form.Group>
                                    {rol == '1' ?
                                        <Form.Label>¿Qué tan claro fue en sus explicaciones?</Form.Label>
                                    : <Form.Label>¿Que tanto asistió a sus sesiones?</Form.Label>}
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
                                                onClick={() => handleRespuesta1({ target: { value: 0 } })} 
                                                
                                            />
                                            <Form.Check 
                                                type="radio" 
                                                label="Suficiente" 
                                                value={3} 
                                                checked={respuesta1 === 3} 
                                                onChange={handleRespuesta1} 
                                                onClick={() => handleRespuesta1({ target: { value: 0 } })} 
                                                
                                            />
                                            <Form.Check 
                                                type="radio" 
                                                label="Mucho" 
                                                value={4} 
                                                checked={respuesta1 === 4} 
                                                onChange={handleRespuesta1} 
                                                onClick={() => handleRespuesta1({ target: { value: 0 } })} 
                                               
                                            />
                                        </div>
                                    </Form.Group>
                                </Form>
                            )}
                            {currentPage === 2 && (
                                <Form>
                                <Form.Group>
                                {rol == '1' ?
                                        <Form.Label>¿Qué tanto te ayudó a aclarar las dudas que obtuviste?</Form.Label>
                                : <Form.Label>¿Qué tanto consideras que tuvo una actitud positiva?</Form.Label>}
                                    <div>
                                        <Form.Check 
                                            type="radio" 
                                            label="Poca" 
                                            value={1} 
                                            checked={respuesta2 === 1} 
                                            onChange={handleRespuesta2} 
                                            onClick={() => handleRespuesta2({ target: { value: 0 } })}
                                           
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Regular" 
                                            value={2} 
                                            checked={respuesta2 === 2} 
                                            onChange={handleRespuesta2} 
                                            onClick={() => handleRespuesta2({ target: { value: 0 } })}
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Buena" 
                                            value={3} 
                                            checked={respuesta2 === 3} 
                                            onChange={handleRespuesta2} 
                                            onClick={() => handleRespuesta2({ target: { value: 0 } })}
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Muy buena" 
                                            value={4} 
                                            checked={respuesta2 === 4} 
                                            onChange={handleRespuesta2} 
                                            onClick={() => handleRespuesta2({ target: { value: 0 } })}
                                        />
                                    </div>
                                </Form.Group>
                            </Form>
                            )}
                            
                            {currentPage === 3 && (
                                <Form>
                                <Form.Group>
                                {rol == '1' ?
                                    <Form.Label>¿Qué tanto lo recomendarías?</Form.Label>
                                : <Form.Label>¿Qué tanto cumplió con las actividades asignadas?</Form.Label>}
                                    <div>
                                        <Form.Check 
                                            type="radio" 
                                            label="Poco" 
                                            value={1} 
                                            checked={respuesta3 === 1} 
                                            onChange={handleRespuesta3} 
                                            onClick={() => handleRespuesta3({ target: { value: 0 } })}
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Regular" 
                                            value={2}
                                            checked={respuesta3 === 2} 
                                            onChange={handleRespuesta3} 
                                            onClick={() => handleRespuesta3({ target: { value: 0 } })}
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Bueno" 
                                            value={3}
                                            checked={respuesta3 === 3} 
                                            onChange={handleRespuesta3} 
                                            onClick={() => handleRespuesta3({ target: { value: 0 } })}
                                        />
                                        <Form.Check 
                                            type="radio" 
                                            label="Muy bueno" 
                                            value={4} 
                                            checked={respuesta3 === 4} 
                                            onChange={handleRespuesta3} 
                                            onClick={() => handleRespuesta3({ target: { value: 0 } })}
                                        />
                                    </div>
                                </Form.Group>
                            </Form>
                            )}
                        </CardBody>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Col><Button variant="danger" onClick={reportarUsuario}>Reportar</Button></Col>
                    <Pagination>
                        <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
                        <Pagination.Item active={currentPage === 1} onClick={() => setCurrentPage(1)}>1</Pagination.Item>
                        <Pagination.Item active={currentPage === 2} onClick={() => setCurrentPage(2)}>2</Pagination.Item>
                        <Pagination.Item active={currentPage === 3} onClick={() => setCurrentPage(3)}>3</Pagination.Item>
                        <Pagination.Next onClick={nextPage} disabled={currentPage === 3} />
                        <Button variant="primary" onClick={enviarModal}>Enviar</Button>
                    </Pagination>
                    
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DetalleEmparejamiento;