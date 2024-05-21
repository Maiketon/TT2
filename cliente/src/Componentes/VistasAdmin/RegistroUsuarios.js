import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/Dropdown.css';
import './Css/PrincipalAdm.css';
import axios from 'axios';
import UsuarioComponent from './UsuarioInformacion';
import {useCarga} from "./ContextoCarga";
const RegistroUsuarios = () => {
  const {setEstaCargando} = useCarga();

  const [estatus, setEstatus] = useState([]);
  const [medallas, setMedallas] = useState([]);
  const [selectedEstatus, setSelectedEstatus] = useState('0'); // Estado para controlar el estatus seleccionado

  const [usuarios, setUsuarios] = useState([]);


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
  const [semestre, setSemestre] = useState('-1');
  const [calificacion, setCalificacion] = useState('-1');
  const [medallaEs, setMedallaEs] = useState('-1');

  const CambioEstatus = (event) => {
    const newEstatus = event.target.value;
    setSelectedEstatus(newEstatus);
    
    if (['0', '1', '2', '3'].includes(newEstatus)) {
      setSemestre('-1');
      setCalificacion('-1');
      setMedallaEs('-1');
    }
  };

  const limpiar = () => {
    setSelectedEstatus('0');
    setPkUsuario('');
    setCarrera('1');
    setSemestre('-1');
    setCalificacion('-1');
    setMedallaEs('-1');
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
      setEstaCargando(true);
      const response = await axios.post('http://localhost:3001/api/administracion/buscarFiltrado', informacionBuscar);
      setUsuarios(Array.isArray(response.data.data) ? response.data.data : []);
      console.log(response.data);
      setEstaCargando(false);
    } catch (error) {
      console.error('Error al realizar la búsqueda', error);
    }
  };


const tituloStyle = {
    color: 'black' // Ajusta el color del título
};

const formLabelStyle = {
    color: 'black' // Ajusta el color de las etiquetas de los formularios
};
  

  return (
    <>
       <Container fluid>
            <Container className="mt-4">
                <h2 style={tituloStyle}>Filtrar Usuarios</h2>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="estatusAlumno">
                                <Form.Label style={formLabelStyle}>Estatus usuario</Form.Label>
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
                            <Form.Group controlId="pkusuario">
                                <Form.Label style={formLabelStyle}>Nombre:</Form.Label>
                                <Form.Control name='pkusuario' type="text" placeholder="Ingrese el ID del alumno" value={pkUsuario} onChange={e => setPkUsuario(e.target.value)} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="carrera">
                                <Form.Label style={formLabelStyle}>Carrera</Form.Label>
                                <Form.Select name='carrera' value={carrera} onChange={e => setCarrera(e.target.value)}>
                                    <option value={1}>ISC</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="semestre">
                                <Form.Label style={formLabelStyle}>Semestre</Form.Label>
                                <Form.Select name='semestre' value={semestre} onChange={e => setSemestre(e.target.value)} disabled={disabledStatuses.semestre}>
                                    <option value={0}>TODOS LOS SEMESTRES</option>
                                    <option value={1}>PRIMER SEMESTRE</option>
                                    <option value={2}>SEGUNDO SEMESTRE</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="calificacion">
                                <Form.Label style={formLabelStyle}>Calificación</Form.Label>
                                <Form.Select name='calificacion' value={calificacion} onChange={e => setCalificacion(e.target.value)} disabled={disabledStatuses.calificacion}>
                                    <option value={0}>TODAS LAS CALIFICACIONES</option>
                                    <option value={5}>5</option>
                                    <option value={4}>4</option>
                                    <option value={3}>3</option>
                                    <option value={2}>2</option>
                                    <option value={1}>1</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="medallas">
                                <Form.Label style={formLabelStyle}>Medallas</Form.Label>
                                <Form.Select name='medallas' value={medallaEs} onChange={e => setMedallaEs(e.target.value)} disabled={disabledStatuses.medallas}>
                                    <option value={0}>SIN ESPCIFICAR</option>
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
                        <UsuarioComponent className='' usuarios={usuarios} />
                    </Container>

                </Form>
            </Container>
        </Container>
    </>
  );
}

export default RegistroUsuarios;
