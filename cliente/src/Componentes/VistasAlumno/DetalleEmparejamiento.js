import React, { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Card } from 'react-bootstrap';
import './Css/EmparejamientoCard.css';
import perfil_generico from './Utils/perfil.png';
import axios from "axios";

const DetalleEmparejamiento = () => {
    const userPk = sessionStorage.getItem("userPk");
    const [Mentor, setMentor] = useState([]);
    const [Aprendiz, setAprendiz] = useState([]);
    //const [PKaValidar, setPkaValidar] = useState([]);
    //const [banderaValidacion, setBanderaValidacion] = useState(null);
    const [banderaValidacionMentor, setBanderaValidacionMentor] = useState('');
    const [banderaValidacionAprendiz, setBanderaValidacionAprendiz] = useState('');
    //const response5 = 0;

    useEffect(() => {
        const obtenerEmparejamientoMentor = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/emparejamiento/obtenerMentor?userPk=${userPk}`);
                setMentor(response.data);
                //setPkaValidar(response.data);
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
                //setPkaValidar(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del emparejamiento activo del aprendiz:', error);
            }
        };
        obtenerEmparejamientoAprendiz();
    }, [userPk]);

   
    useEffect(() => {
        const obtenerBanderasValidacionMentor = async () => {
            try {
                const nuevasBanderas = {};
                for (const usuariomentor of Mentor) {
                    const { PK_USERPAIRED, PK_EMPAREJAMIENTO } = usuariomentor;
                    if (PK_USERPAIRED !== undefined && PK_EMPAREJAMIENTO !== undefined) {
                        const response = await axios.post(`http://localhost:3001/api/emparejamiento/obtenerPkaValidar?PK_USERPAIRED=${PK_USERPAIRED}&PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
                        nuevasBanderas[PK_EMPAREJAMIENTO] = response.data;
                        //console.log(response.data);
                    }
                }
                setBanderaValidacionMentor(nuevasBanderas);
                console.log(banderaValidacionMentor);
            } catch (error) {
                console.error('Error al obtener las banderas de validación', error);
            }
        };
        obtenerBanderasValidacionMentor();
    }, [Mentor]);


    useEffect(() => {
        const obtenerBanderasValidacionAprendiz = async () => {
            try {
                const nuevasBanderas = {};
                for (const usuario of Aprendiz) {
                    const { PK_USERPAIRED, PK_EMPAREJAMIENTO } = usuario;
                    if (PK_USERPAIRED !== undefined && PK_EMPAREJAMIENTO !== undefined) {
                        const response = await axios.post(`http://localhost:3001/api/emparejamiento/obtenerPkaValidar?PK_USERPAIRED=${PK_USERPAIRED}&PK_EMPAREJAMIENTO=${PK_EMPAREJAMIENTO}`);
                        nuevasBanderas[PK_EMPAREJAMIENTO] = response.data;
                        console.log(response);
                    }
                }
                setBanderaValidacionAprendiz(nuevasBanderas);
            } catch (error) {
                console.error('Error al obtener las banderas de validación', error);
            }
        };
        obtenerBanderasValidacionAprendiz();
    }, [Aprendiz]);
    
    




    return (
        <div className='margen_superior'>
            <Card>
                <Card.Body>
                    <Card.Title>Mis mentorias </Card.Title>
                    {Aprendiz.map((aprendiz, index) => (
                        <div className="card" key={index}>
                            <div >
                                <div class="row">
                                    <div class="col">
                                        <img
                                            className="img_perfil_m"
                                            alt="imagen de perfil"
                                            src={perfil_generico}
                                        />
                                    </div>
                                    <div class="col">{aprendiz.nombreCompleto}</div>
                                    <div class="col">Fecha</div>
                                </div>
                                <div class="row">
                                    <div class="col"><button className="btn_rechazo">X</button></div>
                                    <div class="col">{aprendiz.estado}</div>
                                    <div class="col">TOKEN</div>
                                </div>
                                {(aprendiz.estado === 1 && banderaValidacionAprendiz === 1) ?(
                                <div class="row">
                                    <div class="col"><Button>Activar emparejamiento</Button></div>
                                </div>
                                ):<p>Hola</p>}
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
                            <div >
                                <div class="row">
                                    <div class="col">
                                        <img
                                            className="img_perfil_m"
                                            alt="imagen de perfil"
                                            src={perfil_generico}
                                        />
                                    </div>
                                    <div class="col">{mentor.nombreCompleto}</div>
                                    <div class="col">Fecha</div>
                                </div>
                                <div class="row">
                                    <div class="col"><button className="btn_rechazo">X</button></div>
                                    {/*<div class="col">
                                        {mentor.estado === 1 && userPk === mentor.PK_USERPAIRED && (
                                            <Button variant="success">Validar Emparejamiento</Button>
                                        )}
                                    </div>*/}
                                    <div class="col">{mentor.estado}</div>
                                    <div class="col">TOKEN</div>
                                </div>
                                {(mentor.estado === 1 && banderaValidacionMentor === 1)?(
                                <div class="row">
                                <div class="col"><Button>Activar emparejamiento</Button></div>
                                </div>
                                ): null}
                            </div>
                        </div>
                    ))}
                </Card.Body>
            </Card>
        </div>
    );
};

export default DetalleEmparejamiento;
