import React, { useState, useEffect } from "react";
import { Button, Card } from 'react-bootstrap';
import perfil_generico from './Utils/perfil.png';
import Swal from "sweetalert2";
import axios from "axios";

const DetalleEmparejamiento = () => {
    const userPk = sessionStorage.getItem("userPk");
    const [Mentor, setMentor] = useState([]);
    const [Aprendiz, setAprendiz] = useState([]);
    const [banderaValidacionMentor, setBanderaValidacionMentor] = useState(null);
    const [banderaValidacionAprendiz, setBanderaValidacionAprendiz] = useState(null);
  

    useEffect(() => {
        const obtenerEmparejamientoMentor = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/emparejamiento/obtenerMentor?userPk=${userPk}`);
                setMentor(response.data);
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
                for (const usuario of Mentor) {
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
    }, [Mentor]);

    useEffect(() => {
        const obtenerBanderasValidacionAprendiz = async () => {
            try {
                const nuevasBanderas = [];
                for (const usuario of Aprendiz) {
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
            // Aqui primero se hacec una consulta para obtener el estado del emparejamiento, si esta pendiente o activo, dependiendo, se hace el rechazo o se finaliza el emparejamiento
            const response = await axios.post(`http://localhost:3001/api/emparejamiento/saberEstado?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
            if (response.data == 2) {
                console.log("dio 2");
                //await axios.post(`http://localhost:3001/api/emparejamiento/finalizarEmparejamiento?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
            }else if(response.data == 1){
                console.log("dio 1");
                await axios.post(`http://localhost:3001/api/emparejamiento/rechazarEmparejamiento?PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
            }
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
        </div>
    );
};

export default DetalleEmparejamiento;