import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Container, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import perfil_generico from './Utils/perfil.png'
import './Css/SidebarStyles.css';

const SidebarAlumno = ({ setVista }) => {
    return (
        <Container>
            <div className="sb_styles">
                <aside className="sb_styles">
                    <Container>
                                <img
                                    className="img_perfil_m"
                                    alt="imagen de perfil"
                                    src={perfil_generico}
                                />
                    </Container>
                    <Menu> 
                        <hr />
                            <div className="menu_list">
                                <MenuItem icon={<i className="bi bi-book-half"></i>} onClick={() => setVista('inicio')}><span className="txt_hdn">Emparejamiento</span></MenuItem>
                                <MenuItem icon={<i className="bi bi-clipboard2-pulse-fill"></i>} onClick={() => setVista('preferencias')}><span className="txt_hdn">Preferencias académicas</span></MenuItem>
                                <MenuItem icon={<i className="bi bi-camera-video-fill"></i>} onClick={() => setVista('comunicacion')}><span className="txt_hdn">Comunicación con usuarios</span></MenuItem>
                                <MenuItem icon={<i className="bi bi-gear-wide"></i>} onClick={() => setVista('configuracion')}><span className="txt_hdn">Configuración</span></MenuItem>
                            </div>
                        </Menu>
                        <hr />
                    <Button>Cerrar Sesión</Button>
                </aside>
            </div>
        </Container>
    );
}

export default SidebarAlumno;
