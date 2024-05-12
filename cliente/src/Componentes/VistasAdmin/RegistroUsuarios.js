import React, { useState ,useEffect} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; // Importa Container, Row y Col de react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import './Css/Dropdown.css'; // Asegúrate de tener un archivo CSS para los estilos personalizados


import axios from  'axios';


const RegistroUsuarios= ()=> {

  //CATALOGOS//
  const [estatus, setEstatus] = useState([]);
  useEffect(() => {
    const fetchEstatus = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/administracion/obtenerEstatus');
console.log("Respuesta de la API:", response.data);  // Verifica cómo se ve la respuesta
        setEstatus(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error al obtener los estatus', error);
      }
    };

    fetchEstatus();
  }, [])

  const [medallas,setMedallas] = useState([]);
  useEffect(()=> {
    const fetchMedallas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/administracion/obtenerMedallas');
        setMedallas(response.data);
      } catch (error) {
        console.error('Error al obtener las medallas',error);
      }
    };
    fetchMedallas();
  },[])


  

  
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
      <Form.Select name='estatusAlumno'>
              {estatus.map((statusItem) => (
            <option key={statusItem.PK_ESTATUS} value={statusItem.PK_ESTATUS}>
              {statusItem.NOMBRE_ESTADO}
            </option>
          ))}
      </Form.Select>
    </Form.Group>
          </Col>

          <Col>
          <Form.Group as={Row} className="mb-1 p-1" controlId="rolAlumno">
                      <Form.Label className="text-md-right text-start form-label-pe-none">Rol de usuario</Form.Label>
                       <Form.Select name='rolAlumno'>
                         <option  value={1}>MENTOR</option>
                         <option  value={2}>APREDIZ</option>
                       </Form.Select>
                    </Form.Group>
          </Col>

          <Col>
          <Form.Group as={Row} className="mb-1 p-1" controlId="carrera">
                      <Form.Label className="text-md-right text-start form-label-pe-none">Carrera</Form.Label>
                       <Form.Select name='carrera'>
                         <option  value={1}>ISC</option>
                       </Form.Select>
                    </Form.Group>
          </Col>
        </Row>

        <Row>

          <Col>
          <Form.Group as={Row} className="mb-1 p-1" controlId="semestre">
                      <Form.Label className="text-md-right text-start form-label-pe-none">Semestre</Form.Label>
                       <Form.Select name='semestre'>
                         <option  value={1}>PRIMER SEMESTRE</option>
                         <option  value={2}>SEGUNDO SEMESTRE</option>
                       </Form.Select>
                    </Form.Group>
          </Col>
          
          
          
          <Col>
          <Form.Group as={Row} className="mb-1" controlId="calificacion">
          <Form.Label className="text-md-right text-start form-label-pe-none">Calificación</Form.Label>
                       <Form.Select name='calificacion'>
                         <option  value={5}>5</option>
                         <option  value={4}>4</option>
                         <option  value={3}>3</option>
                         <option  value={2}>2</option>
                         <option  value={1}>1</option>
                       </Form.Select>
                    </Form.Group>
          </Col>


          <Col>
          <Form.Group as={Row} className="mb-1" controlId="medallas">
          <Form.Label className="text-md-right text-start form-label-pe-none">Medallas</Form.Label>
                       <Form.Select name='medallas'>
                       {medallas.map((statusItem) => (
            <option key={statusItem.PK_MEDALLAS} value={statusItem.PK_MEDALLAS}>
              {statusItem.NOMBRE_MEDALLA}
            </option>
          ))}
                       </Form.Select>
                    </Form.Group>
          </Col>

        </Row>
        <Container>
          <Row>
          <Col as={Row}>
          <Button  variant="primary" type="button">Buscar</Button>
          </Col>
          <Col as={Row}>
          <Button variant="danger" type="button">Limpiar</Button>
          </Col>
          </Row>
        
        </Container>
        
        
      </Form>
    </Container>
        </Container>
        </>
      );
    }
  
  export default RegistroUsuarios;