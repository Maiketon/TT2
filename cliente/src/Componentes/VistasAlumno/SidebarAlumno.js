import React, { useState, useEffect } from "react";
import { Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Cookies from 'js-cookie';
import axios from "axios";

import perfil_generico from './Utils/perfil.png';
import medalla_Primer from './Utils/Uno.png';
import medalla_Cinco from './Utils/Cinco.png';
import medalla_Maestro from './Utils/Maestro.png';
import medalla_Escucha from './Utils/Escucha.png';
import medalla_Comunicados from './Utils/Comunicados.png'
import medalla_Conex from './Utils/Conexion.png';
import './Css/SidebarStyles.css';

const SidebarAlumno = ({ setVista }) => {
  const navigate = useNavigate();
  const userPk = Cookies.get('userPk');
  const [fullName, setFullName] = useState('');
  const [medallas, setMedallas] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://201.124.183.3:3001/api/alumnos/obtenerNombreCompleto?userPk=${userPk}`);
        setFullName(response.data[0].nombreCompleto);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchMedallas = async () => {
      try {
        const response = await axios.get(`https://201.124.183.3:3001/api/alumnos/obtenerMedallas?pkUsuario=${userPk}`);
        if (response.data && response.data.data) {
          setMedallas(response.data.data);
        } else {
          setMedallas([]);
        }
      } catch (error) {
        console.error('Error fetching medals:', error);
        setMedallas([]);
      }
    };

    fetchUserData();
    fetchMedallas();
  }, [userPk]);

  const handleLogout = () => {
    // Logic to logout user
    navigate("/"); // Redirect to homepage after logout
  };

  const medallaPrimer = medallas.length > 0 ? medallas.find(medalla => medalla.FK_MEDALLA === 1) : null;
  const medallaCincoE = medallas.length > 0 ? medallas.find(medalla => medalla.FK_MEDALLA === 2) : null;
  const medallaBuenM = medallas.length > 0 ? medallas.find(medalla => medalla.FK_MEDALLA === 3) : null;
  const medallaEscucha = medallas.length > 0 ? medallas.find(medalla => medalla.FK_MEDALLA === 4) : null;
  const medallaComuE = medallas.length > 0 ? medallas.find(medalla => medalla.FK_MEDALLA === 5) : null;
  const medallaGranC = medallas.length > 0 ? medallas.find(medalla => medalla.FK_MEDALLA === 6) : null;

  return (
    <>
      <div className="col">
        <Container>
          <div className="sb_styles">
            <aside className="sb_styles">
              <Container>
                <Row>
                  <Col md={6}>
                    <img
                      className="img_perfil_m"
                      alt="imagen de perfil"
                      src={perfil_generico}
                    />
                  </Col>
                  <Col md={6}>
                    <Container>
                      <Row>
                        <Col>
                          <Row>
                            {medallaPrimer ? (
                              <img
                                src={medalla_Primer}
                                alt="Medalla de primer emparejamiento"
                                className={`medalla ${medallaPrimer.ESTADO === 1 ? 'habilitada' : ''}`}
                                title="Primer emparejamiento completo: Este logro se otorga cuando un usuario completa su primer emparejamiento, ya sea como enseñante o aprendiz."
                              />
                            ) : (
                              <p>Medalla no encontrada o datos aún no cargados</p>
                            )}
                          </Row>
                          <Row>
                            {medallaCincoE ? (
                              <img
                                src={medalla_Cinco}
                                alt="Medalla de Ejemplo"
                                className={`medalla ${medallaCincoE.ESTADO === 1 ? 'habilitada' : ''}`}
                                title=" Cinco emparejamientos completos: Otorga este logro a los usuarios que han completado cinco emparejamientos, destacando su compromiso continuo con la plataforma."
                              />
                            ) : (
                              <p>Medalla no encontrada o datos aún no cargados</p>
                            )}
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            {medallaBuenM ? (
                              <img
                                src={medalla_Maestro}
                                alt="Medalla de buen mentor"
                                className={`medalla ${medallaBuenM.ESTADO === 1 ? 'habilitada' : ''}`}
                                title="Buen mentor: Reconoce a los usuarios que han completado al menos 10 emparejamientos como enseñante y han recibido una calificación de cinco estrellas en cada uno. Este logro destaca la calidad y efectividad de su enseñanza."
                              />
                            ) : (
                              <p>Medalla no encontrada o datos aún no cargados</p>
                            )}
                          </Row>
                          <Row>
                            {medallaEscucha ? (
                              <img
                                src={medalla_Escucha}
                                alt="Medalla de buena escucha"
                                className={`medalla ${medallaEscucha.ESTADO === 1 ? 'habilitada' : ''}`}
                                title="Buena escucha: Premia a los usuarios que, como aprendices, han completado 10 emparejamientos en sus áreas de oportunidad (donde más necesitan mejorar), recibiendo en cada uno una calificación de cinco estrellas. Este logro enfatiza su compromiso y capacidad para aprender y aplicar nuevas habilidades."
                              />
                            ) : (
                              <p>Medalla no encontrada o datos aún no cargados</p>
                            )}
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            {medallaComuE ? (
                              <img
                                src={medalla_Comunicados}
                                alt="Medalla de Ejemplo"
                                className={`medalla ${medallaComuE.ESTADO === 1 ? 'habilitada' : ''}`}
                                title="Comunicador estelar: Este logro se puede dar a aquellos usuarios que, en más de 15 emparejamientos, han recibido calificaciones positivas por su habilidad de comunicación, tanto en el rol de enseñante como de aprendiz. Este logro valora la habilidad de mantener una comunicación clara y efectiva, un aspecto crucial en cualquier proceso de enseñanza-aprendizaje."
                              />
                            ) : (
                              <p>Medalla no encontrada o datos aún no cargados</p>
                            )}
                          </Row>
                          <Row>
                            {medallaGranC ? (
                              <img
                                src={medalla_Conex}
                                alt="Medalla de Ejemplo"
                                className={`medalla ${medallaGranC.ESTADO === 1 ? 'habilitada' : ''}`}
                                title="Gran conexión comunitaria: Este logro se da a aquella persona que tiene 100 emparejamientos totales o más. Este logro tiene como objetivo valorar la participación de un alumno en LearnMatch."
                              />
                            ) : (
                              <p>Medalla no encontrada o datos aún no cargados</p>
                            )}
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
                <Menu>
                  
                  <p className="name-color">Bienvenida/o: {fullName}</p>
                  <p className="name-color">Rol:Alumno</p>
                  <hr />
                  <div className="menu_list">
                    <MenuItem className="objeto-menu" icon={<i className="bi bi-book-half"></i>} onClick={() => setVista('inicio')}><span className="txt_hdn">Busqueda de candidatos</span></MenuItem>
                    <MenuItem className="objeto-menu" icon={<i className="bi bi-person-fill-check"></i>} onClick={() => setVista('empact')}><span className="txt_hdn">Emparejamientos</span></MenuItem>
                    <MenuItem className="objeto-menu" icon={<i className="bi bi-clipboard2-pulse-fill"></i>} onClick={() => setVista('preferencias')}><span className="txt_hdn">Preferencias académicas</span></MenuItem>
                    <MenuItem className="objeto-menu" icon={<i className="bi bi-camera-video-fill"></i>} onClick={() => setVista('comunicacion')}><span className="txt_hdn">Comunicación con usuarios</span></MenuItem>
                    <MenuItem className="objeto-menu" icon={<i roomID="TT2024" className="bi bi-gear-wide"></i>} onClick={() => setVista('configuracion')}><span className="txt_hdn">Configuración</span></MenuItem>
                  </div>
                </Menu>
                <hr />
                <Button className="btn-cerrar-sesion" onClick={handleLogout}>Cerrar Sesión</Button>
              </Container>
            </aside>
          </div>
        </Container>
      </div>
    </>
  );
}

export default SidebarAlumno;
