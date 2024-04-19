import React from 'react';
import Logo from './Utils/LearnMatchCaraHumana.png';
import './Css/Botones.css';
import './Css/BarraNavegacion.css';
import { Navbar, NavDropdown ,Nav, Container, Button } from 'react-bootstrap';
const BarraNavegacion = ({ setVista }) => 
{
    const pdfFiles = {
        "UA C\u00E1lculo": "calculo_ISC2020.pdf",
        "UA An\u00E1lisis Vectorial": "analisisVectorial_ISC2020.pdf",
        "UA Matem\u00E1ticas Discretas" : "matematicasDiscretas_ISC2020.pdf",
        "UA Comunicaci\u00F3n Oral y Escrita": "comunicacionOralEscrita_ISC2020.pdf",
        "UA Fundamentos de Programaci\u00F3n": "fundamentosProgramacion_ISC2020.pdf",
        "UA \u00C1lgebra Lineal": "algebraLineal_ISC2020.pdf",
        "UA C\u00E1lculo Aplicado": "calculoAplicado_ISC2020.pdf",
        "UA Mec\u00E1nica y Electromagnetismo": "mecanicaElectromagnetismo_ISC2020.pdf",
        "UA Ingenier\u00EDa, \u00C9tica y Sociedad": "ingenieriaEticaSociedad_ISC2020.pdf",
        "UA Fundamentos Econ\u00F3micos": "fundamentosEconomicos_ISC2020.pdf",
        "UA Algoritmos y Estructura de Datos": "algoritmosEstructurasDatos_ISC2020.pdf"
        // ...continúa con los nombres de todos tus archivos
      };
    const descargarProgramSinteticoUA = (nombreMaterial, event)=> 
    {
        event.preventDefault();
        
        const link = document.createElement('a');
        link.href= `${window.location.origin}/ProgramasSinteticosUAs/${nombreMaterial}`;
        link.setAttribute('download',nombreMaterial);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

    }
    return(
        <>
    <Navbar expand="lg" className='navbar'>
        <Container>
            <Navbar.Brand className='texto-navbar' onClick={() => setVista('inicio')} style={{ cursor: 'pointer' }}>
            <img
            src= {Logo} // Ruta del Logo
            width="30"   // Establece el ancho del logo
            height="30"  // Establece la altura del logo
            className="d-inline-block align-top mx-3" // Añade margen a la derecha si es necesario
            alt="LearnMatch logo"
            onClick={() => setVista('inicio')}
            style={{ cursor: 'pointer' }}
          />
                LearnMatch
            </Navbar.Brand>
            <Nav className='me-auto texto-navbar'>
            <NavDropdown  title="Material de aprendizaje" id="materialesAprendizaje1" className='mx-2'>
            {
                Object.entries(pdfFiles).map(([key, nombreMaterial]) => (
                    <NavDropdown.Item className='dropdown-item-text'
                    key={key} 
                    onClick={(e) => descargarProgramSinteticoUA(nombreMaterial, e)}
                    >
                    {key}
                    </NavDropdown.Item>
                ))
                }
            </NavDropdown>
            <Nav.Link  onClick={() => setVista('sobreNosotros')} className="mx-2 texto-navbar" style={{ cursor: 'pointer' }}>Sobre nosotros</Nav.Link>
            </Nav>
            <Nav>
            <Button variant="primary"  onClick={() => setVista('inscribirse')} className="mx-1 btn-inscribete">Inscríbete</Button>
        <Button variant="outline-primary" onClick={() => setVista('login')} className="mx-1 btn-iniciar-sesion">Iniciar Sesión</Button>
            </Nav>
        </Container>
    </Navbar>
    </>
    );
}
export default BarraNavegacion;