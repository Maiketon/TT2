//LIBRERIAS DE REACT//
import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col ,Spinner} from 'react-bootstrap';
//COMPONENTES//
import RegistroUsuarios from '../VistasAdmin/RegistroUsuarios';
import Sanciones from '../VistasAdmin/Sanciones';
import FormularioInscribirse from '../VistasPrincipal/FormularioInscribirse';
import Estadisticas from '../VistasAdmin/Estadisticas'
import BarraNavegacion from './BarraNavegacion';

import './Css/PrincipalAdm.css';

import {CargarProvider,useCarga} from "./ContextoCarga";


const VistaPrincipalAdm = () => {

  
const SpinnerGlobal = () => 
  {
    const {estaCargando} = useCarga();
    if(!estaCargando) return null;
    return (
      <div className="spinner-container d-flex" >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span> 
        </Spinner>
        <div>Cargando . . .</div>
      </div>
    );
  }




  const [vista, setVista] = useState('registro'); // Estado que me permitira que componente mostrar//
   // Función para determinar el tamaño de la columna del contenido principal
   const getContentColumnSize = () => {
    return vista === 'registro' ? { md: 8 } : {}; // Si la vista es 'registro', devuelve { md: 6 }, de lo contrario, devuelve un objeto vacío
  };

  
  return (
    <>
     <CargarProvider>
    <Container className='principal' fluid>
      <Row>
        
        <Col xs lg="3">
          <BarraNavegacion setVista={setVista} />
          <SpinnerGlobal/>
        </Col>
        
        <Col {...getContentColumnSize()}>
          {vista === 'registro' && <RegistroUsuarios />} 
          {vista === 'estadistica' && <Estadisticas/>} 
          {vista === 'sanciones' && <Sanciones />} 
          {vista === 'inscribirse' && <FormularioInscribirse />}
        </Col>
      </Row>
    </Container>
    </CargarProvider>
    </>
  );
}

export default VistaPrincipalAdm;
