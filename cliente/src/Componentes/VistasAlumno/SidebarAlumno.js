import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Container, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import perfil_generico from './Utils/perfil.png'
import './Css/SidebarStyles.css';

const SidebarAlumno = ({ setVista }) => {
    // Estado para controlar el ancho del sidebar
    const [sidebarWidth] = useState('300px');

    // Efecto secundario para cambiar el ancho del sidebar
    useEffect(() => {
        const sidebarElement = document.querySelector('.css-1wvake5');
        if (sidebarElement) {
            sidebarElement.style.width = sidebarWidth;
        }
    }, [sidebarWidth]); // Se ejecuta cada vez que sidebarWidth cambia

    return (
        <Container>
            <div className="sb_styles">
                <Sidebar className="sb_styles">
                    <Menu>
                        <Container>
                            <img
                                alt="imagen de perfil"
                                width="100px"
                                height="100px"
                                src={perfil_generico}
                            />
                        </Container>
                        <hr />
                            <MenuItem icon={<i className="bi bi-book-half"></i>} onClick={() => setVista('inicio')}>Emparejamiento</MenuItem>
                            <MenuItem icon={<i className="bi bi-clipboard2-pulse-fill"></i>} onClick={() => setVista('preferencias')}>Preferencias académicas</MenuItem>
                            <MenuItem icon={<i className="bi bi-camera-video-fill"></i>} onClick={() => setVista('comunicacion')}>Comunicación con usuarios</MenuItem>
                            <MenuItem icon={<i className="bi bi-gear-wide"></i>} onClick={() => setVista('configuracion')}>Configuración</MenuItem>
                    </Menu>
                    <hr />
                    <Button>Cerrar Sesión</Button>
                </Sidebar>
            </div>
        </Container>
    );
}

export default SidebarAlumno;
