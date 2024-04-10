//LIBRERIAS DE REACT//
import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
//COMPONENTES//

import RegistroUsuarios from '../VistasAdmin/RegistroUsuarios';
import Sanciones from '../VistasAdmin/Sanciones';
import FormularioInscribirse from '../VistasPrincipal/FormularioInscribirse';
import BarraNavegacion from './BarraNavegacion';
import PruebaAdmin from './PruebaAdmin';

const VistaPrincipal = () => {
  const [vista, setVista] = useState('inicio'); // Estado que me permitira que componente mostrar//
   // Función para determinar el tamaño de la columna del contenido principal
   const getContentColumnSize = () => {
    return vista === 'registro' ? { md: 6 } : {}; // Si la vista es 'registro', devuelve { md: 6 }, de lo contrario, devuelve un objeto vacío
  };
  return (
    <Container fluid>
      <Row>
        {/* Columna del sidebar */}
        <Col xs lg="3">
          <BarraNavegacion setVista={setVista} />
        </Col>
        {/* Columna del contenido principal */}
        <Col {...getContentColumnSize()}>
          {vista === 'inicio' && <PruebaAdmin />}
          {vista === 'registro' && <RegistroUsuarios />} 
          {vista === 'sanciones' && <Sanciones />} 
          {vista === 'inscribirse' && <FormularioInscribirse />}
        </Col>
      </Row>
    </Container>
  );
}

export default VistaPrincipal;
