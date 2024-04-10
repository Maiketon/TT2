import React from "react";
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Container, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import perfil_generico from './Utils/perfil.png'
import './Css/SidebarStyles.css';
import Emparejamiento from "./Emparejamiento";
import ComunicacionUsuarios from "./ComunicacionUsuarios";
import Configuracion from "./Configuracion";
import PreferenciasAcademicas from "./PreferenciasAcademicas";
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const SidebarAlumno = () => {
    return (
        <Router>
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
                        <Link to="/Emparejamiento" className="link_style">
                            <MenuItem icon={<i className="bi bi-book-half"></i>}>Emparejamiento</MenuItem>
                        </Link>
                        <Link to="/Preferencias" className="link_style">
                            <MenuItem icon={<i className="bi bi-clipboard2-pulse-fill"></i>}>Preferencias académicas</MenuItem>
                        </Link>
                        <Link to="/Comunicacion" className="link_style">
                            <MenuItem icon={<i className="bi bi-camera-video-fill"></i>}>Comunicación con usuarios</MenuItem>
                        </Link>
                        <Link to="/Configuracion" className="link_style">
                            <MenuItem icon={<i className="bi bi-gear-wide"></i>}>Configuración</MenuItem>
                        </Link>
                    </Menu>
                    <hr />
                    <Button>Cerrar Sesión</Button>
                </Sidebar>
            </div>
            <div className="content_wrapper">
                <Routes>
                    <Route path="/" element={<Emparejamiento />} />
                    <Route path="/Emparejamiento" element={<Emparejamiento />} />
                    <Route path="/Preferencias" element={<PreferenciasAcademicas />} />
                    <Route path="/Comunicacion" element={<ComunicacionUsuarios />} />
                    <Route path="/Configuracion" element={<Configuracion />} />
                </Routes>
            </div>
        </Router>
    );
}

export default SidebarAlumno;
