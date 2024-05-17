import React from 'react';
import './Css/Sidebar.css';
import logo from '../VistasAdmin/Utils/usuario.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const BarraNavegacion = ({ setVista }) => {
  const navigate = useNavigate(); // Utiliza useNavigate para redireccionar en React Router v6


  const limpiarCookies = () => {
    const cookies = Cookies.get(); // Obtener todas las cookies
    for (const cookie in cookies) {
      Cookies.remove(cookie);
    }
  };
  const handleLogout = () => {
    // Aquí podrías agregar cualquier lógica relacionada con cerrar sesión, como limpiar el almacenamiento local o enviar una solicitud al servidor
    // Después de cerrar sesión, redirige al usuario a la vista principal
    //sessionStorage.clear();
    limpiarCookies();
    navigate("/"); // Utiliza navigate para redireccionar en React Router v6
  };

  return (
    <>
    <div className="pagina">
     
      <div className="sidebar">
      
        <button className="logo-button">
          <img src={logo} alt="Logo" />
        </button>
        {/* Botón de Cerrar Sesión */}
        <button className="cerrar-sesion" onClick={handleLogout}>Cerrar Sesión</button>
        {/* Título Administrador */}
        <h3 className="titulo">Administrador</h3>
        {/* Lista */}
        <div className="botones">
          <button className="elemento" onClick={() => setVista('registro')}>
            Registros de usuarios
          </button>
          <button className="elemento" onClick={() => setVista('estadistica')}>
            Estadisticas y reportes del algoritmo
          </button>
          <button className="elemento" onClick={() => setVista('sanciones')}>
            Reportes de cada usuario
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default BarraNavegacion;