import React from 'react';
import Logo from './Utils/LearnMatchCaraHumana.png';
import './Css/Botones.css';
import { Navbar, NavDropdown ,Nav, Container, Button } from 'react-bootstrap';
const BarraNavegacion = ({ setVista }) => 
{
    return(
        <>
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand onClick={() => setVista('inicio')} style={{ cursor: 'pointer' }}>
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
            <Nav className="me-auto">
            <NavDropdown title="Material de aprendizaje" id="materialesAprendizaje1" className='mx-2'>
                <NavDropdown.Item href="#action/3.1">Material de aprendizaje 1</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Material de aprendizaje 2</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Material de aprendizaje 3</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Material de aprendizaje 4</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => setVista('sobreNosotros')} className="mx-2" style={{ cursor: 'pointer' }}>Sobre nosotros</Nav.Link>
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