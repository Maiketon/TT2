import React from 'react';
import './Css/Sidebar.css';
import logo from '../VistasAdmin/Utils/usuario.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
        <button className="cerrar-sesion" onClick={handleLogout}>Cerrar Sesión</button>
        <h3 className="titulo">Administrador</h3>
        <div className="botones">
          <button className="elemento" onClick={() => setVista('registro')}>
            <i className="bi bi-people-fill"></i>
             <span className='d_texto'>Estad&iacute;sticas de usuarios</span>
          </button>
          <button className="elemento" onClick={() => setVista('estadistica')}>
          <i className="bi bi-activity"></i>
            <span className='d_texto'>Estad&iacute;sticas y reportes del algoritmo</span>
          </button>
          <button className="elemento" onClick={() => setVista('sanciones')}>
          <i className="bi bi-person-bounding-box"></i>
            <span className='d_texto'>Reportes de cada usuario</span>
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default BarraNavegacion;