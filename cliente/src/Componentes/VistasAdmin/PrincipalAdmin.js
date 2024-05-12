//LIBRERIAS DE REACT//
import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
//COMPONENTES//
import RegistroUsuarios from '../VistasAdmin/RegistroUsuarios';
import Sanciones from '../VistasAdmin/Sanciones';
import FormularioInscribirse from '../VistasPrincipal/FormularioInscribirse';
import Estadisticas from '../VistasAdmin/Estadisticas'
import BarraNavegacion from './BarraNavegacion';
const VistaPrincipalAdm = () => {
  const [vista, setVista] = useState('registro'); // Estado que me permitira que componente mostrar//
   // Función para determinar el tamaño de la columna del contenido principal
   const getContentColumnSize = () => {
    return vista === 'registro' ? { md: 8 } : {}; // Si la vista es 'registro', devuelve { md: 6 }, de lo contrario, devuelve un objeto vacío
  };
  return (
    <>
    <Container fluid>
      <Row>
        
        <Col xs lg="3">
          <BarraNavegacion setVista={setVista} />
        </Col>
        
        <Col {...getContentColumnSize()}>
          {vista === 'registro' && <RegistroUsuarios />} 
          {vista === 'estadistica' && <Estadisticas/>} 
          {vista === 'sanciones' && <Sanciones />} 
          {vista === 'inscribirse' && <FormularioInscribirse />}
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default VistaPrincipalAdm;
