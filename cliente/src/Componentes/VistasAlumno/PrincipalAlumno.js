import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './SidebarAlumno';
import Comunicacion from './ComunicacionUsuarios';
import MConfiguracion from './Configuracion';
import MEmparejamiento from './Emparejamiento';
import MPreferenciasAcademicas from './PreferenciasAcademicas';

const VistaPrincipal = () => {
  const [vista, setVista] = useState('inicio');

  return (
    <Container fluid className="fondo_modulo_alumno tamano_modulo"> {/* Agrega la clase a la etiqueta Container */}
      <Row>
        <Col xs lg="3">
          <Sidebar setVista={setVista} />
        </Col>
        <Col>
          {vista === 'inicio' && <MEmparejamiento />}
          {vista === 'comunicacion' && <Comunicacion />} 
          {vista === 'preferencias' && <MPreferenciasAcademicas />} 
          {vista === 'configuracion' && <MConfiguracion />}
        </Col>
      </Row>
    </Container>
  );
}

export default VistaPrincipal;
