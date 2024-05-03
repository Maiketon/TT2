//LIBRERIAS DE REACT//
import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Logo from '../Utils/LearnMatchCerebro.png';
//FRAMEWORKS DE REACT //
import { Container, Spinner, Button, Modal } from 'react-bootstrap';

//HOJA DE ESTILOS//
import "./Principal.css";

//COMPONENTES//
import BarraNavegacion from './VistasPrincipal/BarraNavegacion';
import ContenidoPrincipal from './VistasPrincipal/ContenidoPrincipal';
import SobreNosotros from './VistasPrincipal/SobreNosotros';
import FormularioInscribirse from './VistasPrincipal/FormularioInscribirse';
import FormLogin from './VistasPrincipal/Login';

import {CargarProvider,useCarga} from "./ContextoCarga";

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




const VistaPrincipal = () => {
  const [vista, setVista] = useState('inicio'); // Estado que me permitira que componente mostrar//
  const [show, setShow] = useState(false);

  //cerrar modal
  const handleClose = () => setShow(false);

  //mostrarmodal
  const handleShow = () => setShow(true);

  // Usar useEffect para mostrar la modal automáticamente al cargar la página
  useEffect(() => {
      handleShow();
  }, []);
  return (
    <>
       <Modal className='xl' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>Términos y Condiciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               CREAR TERMINOS Y CONDICIONES
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Acepto
                </Button>
            </Modal.Footer>
        </Modal>

    <CargarProvider>
    <div className="principal-contenedor">
    <BarraNavegacion setVista={setVista}/>
    <SpinnerGlobal/>


    <div>
    {vista === 'inicio' && (
       <ContenidoPrincipal />
      )}
      {vista === 'sobreNosotros' && <SobreNosotros />} 
      {vista ==='inscribirse' && <FormularioInscribirse setVista={setVista}/>}     
      {vista ==='login' && <FormLogin/>}
    </div>

    <footer className="footer mt-auto py-3 bg-light">
        <Container>
          <span className="text-muted">"El maestro debe adoptar el papel de facilitador, no proveedor de contenido" <br/> -Lev Semyonovich Vygotski </span>
        </Container>
      </footer>

    </div>      
    </CargarProvider>
    </>
  );
}

export default VistaPrincipal;
