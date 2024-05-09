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
                <Modal.Title>Términos y Condiciones de Uso</Modal.Title>
            </Modal.Header>
            <Modal.Body className='custom-modal-content' style={{textAlign:'justify'}}>
            <h6 style={{textAlign:'center'}}> Aceptación de los Términos</h6>
  Al acceder y utilizar este sistema web, usted acepta estar sujeto a estos términos y condiciones de uso, todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de cualquier ley local aplicable. Si no está de acuerdo con alguno de estos términos, se le prohíbe usar o acceder a este sitio.
        <h6 style={{textAlign:'center'}}>Propiedad Intelectual</h6>
Este sistema y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva del Instituto Politécnico Nacional (IPN). El sistema está protegido por derechos de autor, marcas registradas, y otras leyes de México y de países extranjeros.
<h6 style={{textAlign:'center'}}>Uso del Sistema</h6>
El acceso a este sistema está permitido solo a los miembros activos del IPN y sus colaboradores autorizados. Cualquier acceso o uso del sistema fuera del IPN queda expresamente excluido y no es responsabilidad de los desarrolladores.
<h6 style={{textAlign:'center'}}>Recopilación y Uso de Información</h6>
El sistema recopila datos durante su operación que serán utilizados exclusivamente para fines estadísticos relacionados con proyectos académicos, incluido el proyecto de titulación para obtener el título de Ingeniería en Sistemas Computacionales. Los datos recopilados no serán compartidos con terceros fuera del ámbito académico del IPN sin el consentimiento explícito de los usuarios afectados.
<h6 style={{textAlign:'center'}}>Exclusión de Garantías</h6>
Este sistema se proporciona "tal cual", sin garantías de ningún tipo, ya sea expresas o implícitas, incluidas, pero no limitadas a, las garantías implícitas de comerciabilidad, idoneidad para un propósito particular, o no infracción de propiedad intelectual. Además, no garantizamos ni hacemos representaciones relativas a la precisión, resultados probables o confiabilidad del uso del sistema.
<h6 style={{textAlign:'center'}}>Limitaciones</h6>
En ningún caso los desarrolladores o el IPN serán responsables por daños (incluyendo, sin limitación, daños por pérdida de datos o beneficio, o debido a interrupción del negocio) que surjan del uso o incapacidad para usar el sistema, incluso si un representante autorizado ha sido notificado oralmente o por escrito de la posibilidad de tales daños.
<h6 style={{textAlign:'center'}}>Modificaciones de los Términos</h6>
Estos términos y condiciones pueden ser modificados o reemplazados por el IPN en cualquier momento. Es su responsabilidad revisar periódicamente estos términos y condiciones para verificar cambios.
            </Modal.Body>
            <Modal.Footer className="custom-footer">
                <Button variant="primary" className="custom-button" onClick={handleClose}>
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

    <footer className="footer mt-auto py-3">
        <Container>
          <span className="text-footer">"El maestro debe adoptar el papel de facilitador, no proveedor de contenido" <br/> -Lev Semyonovich Vygotski </span>
        </Container>
      </footer>

    </div>      
    </CargarProvider>
    </>
  );
}

export default VistaPrincipal;
