import React, { useRef, useEffect, useState } from 'react';
import { Container, Button,Card, Row, Col} from 'react-bootstrap';

import GraficaUsoA from './GraficaUsoAplicacion';
import GraficaR from './EjemploGraficaRadar';
import GraficaD from './EjemploGraficaDona'; // PARA LAS MATERIAS//
import GraficaP from './EjemploGraficaPolar'; // ESTA PARA MEDALLAS
import GraficaSanciones from './GraficaSanciones';
import './Css/EstilosGraficas.css';

import {useCarga} from "./ContextoCarga";

const Estadisticas = () => {

  const [vista, setGrafica] = useState('');
  const {setEstaCargando} = useCarga();


  return (
    <>
      <Container fluid>
      <Card className='p-3'>
      <Card.Header >
        <Card.Title>Módulo de selección de gráficas del comportamiento del algoritmo de emparejamiento</Card.Title>
      </Card.Header>
      <Card.Body>
        <Container fluid>
          <Card>
            <Card.Header>
              Seleccione la opción para ver la gráfica de comportamiento
            </Card.Header>

            <Card.Body>
              <Container>
                   <Row className='p-1'>
                   <Col>
                   <Button  onClick={()=>setGrafica('usoAplicacion')} className='m-1'>Uso de la aplicación</Button>
                    <Button onClick={()=>setGrafica('sanciones')}  className='m-1'>Sanciones de los usuarios</Button>
                    <Button onClick={()=>setGrafica('emparejamientosT')} className='m-1'>Emparejamientos Totales Realizados</Button>
                   </Col>
                   </Row>

                   <Row className='p-1'>
                    <Col>
                   <Button onClick={()=>setGrafica('materias')} className='m-1'>Materias seleccionadas por alumnos</Button>
                   <Button onClick={()=>setGrafica('calificaiones')}className='m-1'>Estatus de los emparejamientos</Button>
                   <Button onClick={()=>setGrafica('logros')} className='m-1'>Estatus de medallas de los usuarios</Button>
                    </Col>
                   </Row>
              </Container>
                <Card.Footer></Card.Footer>
              <Container className='contendedor-grafica'>
                {vista === 'usoAplicacion' && <GraficaUsoA/>} 
                {vista === 'sanciones' &&  <GraficaSanciones/>} 
                {vista === 'emparejamientosT' && <GraficaP/>} 
                {vista === 'inscribirse' &&<GraficaP/>}
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
