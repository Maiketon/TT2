import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/Dropdown.css';
import axios from 'axios';

const RegistroUsuarios = () => {
  const [estatus, setEstatus] = useState([]);
  const [medallas, setMedallas] = useState([]);
  const [selectedEstatus, setSelectedEstatus] = useState('0'); // Estado para controlar el estatus seleccionado

  useEffect(() => {
    const fetchEstatus = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/administracion/obtenerEstatus');
        setEstatus(response.data);
      } catch (error) {
        console.error('Error al obtener los estatus', error);
      }
    };

    const fetchMedallas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/administracion/obtenerMedallas');
        setMedallas(response.data);
      } catch (error) {
        console.error('Error al obtener las medallas', error);
      }
    };

    fetchEstatus();
    fetchMedallas();
  }, []);


  // Determina si los campos deben estar deshabilitados basados en el estatus seleccionado
  const disableControl = (selectedEstatus) => {
    if (selectedEstatus === '0') {
      return { semestre: true, calificacion: true, medallas: true };
    } else if (['1', '2', '3'].includes(selectedEstatus)) {
      return { semestre: true, calificacion: true, medallas: true };
    } else if (['4', '5', '6', '7'].includes(selectedEstatus)) {
      return { semestre: false, calificacion: false, medallas: false };
    }
    return { semestre: false, calificacion: false, medallas: false };
  };

  const disabledStatuses = disableControl(selectedEstatus);
  //LOGICA PARA ENVIAR INFORMACION AL BACK SEGUN LOS CAMPOS DE ENTRADA
   // Estados para cada campo del formulario
  const [pkUsuario, setPkUsuario] = useState('');
  const [carrera, setCarrera] = useState('1');
  const [semestre, setSemestre] = useState('0');
  const [calificacion, setCalificacion] = useState('0');
  const [medallaEs, setMedallaEs] = useState('0');

  const CambioEstatus = (event) => {
    const newEstatus = event.target.value;
    setSelectedEstatus(newEstatus);
    
    if (['0', '1', '2', '3'].includes(newEstatus)) {
      setSemestre('0');
      setCalificacion('0');
      setMedallaEs('0');
    }
  };

  const limpiar = () => {
    setSelectedEstatus('0');
    setPkUsuario('');
    setCarrera('1');
    setSemestre('0');
    setCalificacion('0');
    setMedallaEs('0');
  };

  const buscar = async () => {
    // Crear un objeto con los datos del formulario
    const informacionBuscar = {
      estatus: selectedEstatus,
      pkusuario: pkUsuario,
      carrera,
      semestre,
      calf: calificacion,
      medallaEs,
    };
  
    try {
      const response = await axios.post('http://localhost:3001/api/administracion/buscarFiltrado', informacionBuscar);
      console.log(response.data);
    } catch (error) {
      console.error('Error al realizar la búsqueda', error);
    }
  };
  

  return (
    <>
      <Container fluid>
        <Container className="mt-4">
          <h2>Filtrar Usuarios</h2>
          <Form>
            <Row>
              <Col>
                <Form.Group as={Row} className="mb-1 p-1" controlId="estatusAlumno">
                  <Form.Label className="text-md-right text-start form-label-pe-none">Estatus usuario</Form.Label>
                  <Form.Select name='estatusAlumno' value={selectedEstatus} onChange={CambioEstatus}>
                    <option value="0">GLOBAL</option>
                    {estatus.map((statusItem) => (
                      <option key={statusItem.PK_ESTATUS} value={statusItem.PK_ESTATUS}>
                        {statusItem.NOMBRE_ESTADO}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group as={Row} className="mb-1" controlId="pkusuario">
                  <Form.Label className="text-md-right text-start form-label-pe-none">Nombre:</Form.Label>
                  <Form.Control name='pkusuario' type="text" placeholder="Ingrese el ID del alumno" value={pkUsuario} onChange={e => setPkUsuario(e.target.value)} />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group as={Row} className="mb-1 p-1" controlId="carrera">
                  <Form.Label className="text-md-right text-start form-label-pe-none">Carrera</Form.Label>
                  <Form.Select name='carrera' value={carrera} onChange={e => setCarrera(e.target.value)}>
                    <option value={1}>ISC</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group as={Row} className="mb-1 p-1" controlId="semestre">
                  <Form.Label className="text-md-right text-start form-label-pe-none">Semestre</Form.Label>
                  <Form.Select name='semestre' value={semestre} onChange={e => setSemestre(e.target.value)} disabled={disabledStatuses.semestre}>
                    <option value={0}>TODOS LOS SEMESTRES</option>
                    <option value={1}>PRIMER SEMESTRE</option>
                    <option value={2}>SEGUNDO SEMESTRE</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group as={Row} className="mb-1" controlId="calificacion">
                  <Form.Label className="text-md-right text-start form-label-pe-none">Calificación</Form.Label>
                  <Form.Select name='calificacion' value={calificacion} onChange={e => setCalificacion(e.target.value)} disabled={disabledStatuses.calificacion}>
                    <option value={0}>TODAS LAS CALIFICACIONES</option>
                    <option value={5}>5</option>
                    <option value={4}>4</option>
                    <option value={3}>3</option>
                    <option value={2}>2</option>
                    <option value={1}>1</option>
                  </Form.Select
                  ></Form.Group>
              </Col>

              <Col>
                <Form.Group as={Row} className="mb-1" controlId="medallas">
                  <Form.Label className="text-md-right text-start form-label-pe-none">Medallas</Form.Label>
                  <Form.Select name='medallas'value={medallaEs} onChange={e => setMedallaEs(e.target.value)} disabled={disabledStatuses.medallas}>
                    <option value={0}>TODAS ACTIVAS E INACTIVAS</option>
                    {medallas.map((medallaItem) => (
                      <option key={medallaItem.PK_MEDALLAS} value={medallaItem.PK_MEDALLAS}>
                        {medallaItem.NOMBRE_MEDALLA}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Container>
              <Row>
                <Col as={Row}>
                <Button variant="primary" type="button" onClick={buscar}>Buscar</Button>

                </Col>
                <Col as={Row}>
                  <Button variant="danger" type="button" onClick={limpiar}>Limpiar</Button>
                </Col>
              </Row>
            </Container>

            <Container>
              <h1>AQUÍ VA EL COMPONENTE DINÁMICO QUE SE PINTARÁ VARIAS VECES SEGÚN EL RESULTADO DE LA BÚSQUEDA</h1>
            </Container>

          </Form>
        </Container>
      </Container>
    </>
  );
}

export default RegistroUsuarios;
