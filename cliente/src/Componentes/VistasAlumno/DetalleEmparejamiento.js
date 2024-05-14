import React, { useState, useEffect } from "react";
import { Button, InputGroup, FormControl,Card } from 'react-bootstrap';
import './Css/EmparejamientoCard.css';
import perfil_generico from './Utils/perfil.png';
import axios from "axios";


const DetalleEmparejamiento = () => {
    const userPk = sessionStorage.getItem("userPk");
    const [Mentor, setMentor] = useState([]);
    const [Aprendiz, setAprendiz] = useState([]);


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
            try{
                const response = await axios.get(`http://localhost:3001/api/emparejamiento/obtenerAprendiz?userPk=${userPk}`);
                setAprendiz(response.data);
            }catch(error){
                console.error('Error al obtener los datos del emparejamiento activo del aprendiz:', error);
            }
        };
        obtenerEmparejamientoAprendiz();
    },[userPk]);



    return (
        <div className='margen_superior'>
            <Card>
                <Card.Body>
                    <Card.Title>Mis mentorias </Card.Title>
                    {Aprendiz.map((aprendiz, index) => (
                        <div className="card" key={index}>
                            <div >
                                <div class="row">
                                    <div class="col"> <img
                                                    className="img_perfil_m"
                                                    alt="imagen de perfil"
                                                    src={perfil_generico}
                                                />  </div>
                                    <div class="col">{aprendiz.nombreCompleto}</div>
                                    <div class="col">Fecha</div>
                                </div>
                                <div class="row">
                                    <div class="col"><button className="btn_rechazo">X</button></div>
                                    <div class="col">{aprendiz.estado}</div>
                                    <div class="col">TOKEN</div>
                                </div>
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
                                    <div class="col"><img
                                                    className="img_perfil_m"
                                                    alt="imagen de perfil"
                                                    src={perfil_generico}
                                                />  </div>
                                    <div class="col">{mentor.nombreCompleto}</div>
                                    <div class="col">Fecha</div>
                                </div>
                                <div class="row">
                                    <div class="col"><button className="btn_rechazo">X</button></div>
                                    <div class="col">{mentor.estado}</div>
                                    <div class="col">TOKEN</div>
                                </div>
                            </div>
                            
                        </div>
                    ))}
                </Card.Body>
            </Card>
        </div>
    );
};

export default DetalleEmparejamiento;