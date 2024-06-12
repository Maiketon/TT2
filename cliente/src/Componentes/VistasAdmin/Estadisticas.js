import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';

import GraficaUsoA from './GraficaUsoAplicacion';
import GraficaMateriasA from './GraficaMateriasAlumnos';
import GraficaLogrosA from './GraficaLogrosAlumnos';
import GraficaCalif from './GraficaCalificacionesU';
import GraficaEmparejamientosT from './GraficaEmparejamientosT'; // ESTA PARA MEDALLAS
import GraficaSanciones from './GraficaSanciones';
import './Css/EstilosGraficas.css';
import './Css/Estadisticas.css';
import { useCarga } from './ContextoCarga';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const Estadisticas = () => {
  const [init, setInit] = useState(false);
  const [vista, setGrafica] = useState('usoAplicacion');
  const { setEstaCargando } = useCarga();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  
  const particlesLoaded = (container) => {
    console.log(container);
  };
  
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#cccccc",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 0.5,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <>
      <div className="particles-container">
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      </div>
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
};

export default Estadisticas;
