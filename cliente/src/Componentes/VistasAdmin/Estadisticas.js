import React, { useRef, useEffect } from 'react';
import { Container, Button,Card, Row, Col} from 'react-bootstrap';

import GraficaBarras from './EjemploGraficaBarras';
import GraficaR from './EjemploGraficaRadar';
import GraficaD from './EjemploGraficaDona'; // PARA LAS MATERIAS//
import GraficaP from './EjemploGraficaPolar'; // ESTA PARA MEDALLAS
import GraficaPl from './EjemploGraficaPastel';
import './Css/EstilosGraficas.css';


const Estadisticas = () => {
    

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
                   <Button className='m-1'>Uso de la aplicación</Button>
                    <Button  className='m-1'>Sanciones de los usuarios</Button>
                    <Button  className='m-1'>Emparejamientos Totales Realizados</Button>
                   </Col>
                   </Row>

                   <Row className='p-1'>
                    <Col>
                   <Button  className='m-1'>Materias seleccionadas por alumnos</Button>
                   <Button  className='m-1'>Estatus de los emparejamientos</Button>
                   <Button  className='m-1'>Estatus de medallas de los usuarios</Button>
                    </Col>
                   </Row>
              </Container>
                <Card.Footer></Card.Footer>
              <Container className='contendedor-grafica'>
                <h1>AQUI VAN LAS GRAFICAS</h1>
                <GraficaBarras/>
                <GraficaR/>
                <GraficaD/>
                <GraficaP/>
                <GraficaPl/>

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
