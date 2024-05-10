import React from 'react';
import { Button, InputGroup, FormControl,Card } from 'react-bootstrap';
import './Css/EmparejamientoCard.css';


const DetalleEmparejamiento = () => {
    return (
        <div className='margen_superior'>
            <Card>
                <Card.Body>
                    <Card.Title>Mis mentorias </Card.Title>
                        <div className="card">
                            <div >
                                <div class="row">
                                    <div class="col">Foto</div>
                                    <div class="col">Nombre</div>
                                    <div class="col">Fecha</div>
                                </div>
                                <div class="row">
                                    <div class="col"><button className="btn_rechazo">X</button></div>
                                    <div class="col">ESTADO?</div>
                                    <div class="col">TOKEN</div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="card">
                            <div >
                            <div class="row">
                                    <div class="col">Foto</div>
                                    <div class="col">Nombre</div>
                                    <div class="col">Fecha</div>
                                </div>
                                <div class="row">
                                    <div class="col">BOTON X</div>
                                    <div class="col">ESTADO?</div>
                                    <div class="col">TOKEN</div>
                                </div>
                            </div>
                            
                        </div>
                        <hr></hr>
                        <Card.Title>Mis A.O </Card.Title>
                        <div className="card">
                            <div >
                                <div class="row">
                                    <div class="col">Foto</div>
                                    <div class="col">Nombre</div>
                                    <div class="col">Fecha</div>
                                </div>
                                <div class="row">
                                    <div class="col">BOTON X</div>
                                    <div class="col">ESTADO?</div>
                                    <div class="col">TOKEN</div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="card">
                            <div >
                            <div class="row">
                                    <div class="col">Foto</div>
                                    <div class="col">Nombre</div>
                                    <div class="col">Fecha</div>
                                </div>
                                <div class="row">
                                    <div class="col">BOTON X</div>
                                    <div class="col">ESTADO?</div>
                                    <div class="col">TOKEN</div>
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
        </div>
    );
};

export default DetalleEmparejamiento;
