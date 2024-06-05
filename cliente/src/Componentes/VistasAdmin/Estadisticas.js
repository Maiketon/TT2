import React, { useState } from 'react';
import { Container, Button,Card, Row, Col} from 'react-bootstrap';

import GraficaUsoA from './GraficaUsoAplicacion';
import GraficaMateriasA from './GraficaMateriasAlumnos';
import GraficaLogrosA from './GraficaLogrosAlumnos'; 
import GraficaCalif from './GraficaCalificacionesU';
import GraficaEmparejamientosT from './GraficaEmparejamientosT'; // ESTA PARA MEDALLAS
import GraficaSanciones from './GraficaSanciones';
import './Css/EstilosGraficas.css';
import './Css/Estadisticas.css';
// import {useCarga} from "./ContextoCarga";

const Estadisticas = () => {

  const [vista, setGrafica] = useState('usoAplicacion');
  const {setEstaCargando} = useCarga();


  return (
    <>
        <Container fluid className="container-bg">
            <Card className="p-3 card-bg">
                <Card.Header className="card-bg">
                    <Card.Title>Módulo de selección de gráficas del comportamiento del algoritmo de emparejamiento</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Container fluid>
                        <Card className="card-bg">
                            <Card.Header className="card-bg">
                                Seleccione la opción para ver la gráfica de comportamiento
                            </Card.Header>
                            <Card.Body>
                                <Container>
                                    <Row className="p-1">
                                        <Col>
                                            <Button onClick={() => setGrafica('usoAplicacion')} className="m-1 button-bg">Uso de la aplicación</Button>
                                            <Button onClick={() => setGrafica('sanciones')} className="m-1 button-bg">Sanciones de los usuarios</Button>
                                            <Button onClick={() => setGrafica('emparejamientosT')} className="m-1 button-bg">Emparejamientos Totales Realizados</Button>
                                        </Col>
                                    </Row>
                                    <Row className="p-1">
                                        <Col>
                                            <Button onClick={() => setGrafica('materias')} className="m-1 button-bg">Materias seleccionadas por alumnos</Button>
                                            <Button onClick={() => setGrafica('calificaiones')} className="m-1 button-bg">Calificaciones de los Alumnos</Button>
                                            <Button onClick={() => setGrafica('logros')} className="m-1 button-bg">Estatus de medallas de los usuarios</Button>
                                        </Col>
                                    </Row>
                                </Container>
                                <Container className="contendedor-grafica">
                                    {vista === 'usoAplicacion' && <GraficaUsoA />}
                                    {vista === 'sanciones' && <GraficaSanciones />}
                                    {vista === 'emparejamientosT' && <GraficaEmparejamientosT />}
                                    {vista === 'materias' && <GraficaMateriasA />}
                                    {vista === 'calificaiones' && <GraficaCalif />}
                                    {vista === 'logros' && <GraficaLogrosA />}
                                </Container>
                            </Card.Body>
                        </Card>
                    </Container>
                </Card.Body>
            </Card>
        </Container>
    
    
    </>


  );
}

export default Estadisticas;
