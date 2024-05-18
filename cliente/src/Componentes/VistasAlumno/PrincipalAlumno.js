import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/SidebarStyles.css';
import Sidebar from './SidebarAlumno';
import Comunicacion from './ComunicacionUsuarios';
import MConfiguracion from './Configuracion';
import MEmparejamiento from './Emparejamiento';
import MPreferenciasAcademicas from './PreferenciasAcademicas';
import MEmparejamientosActivos from './DetalleEmparejamiento';
import axios from 'axios';
import Cookies from 'js-cookie';

const VistaPrincipal = () => {
  const [vista, setVista] = useState('inicio');
  const [Rol, setRol] = useState([]);
  const userPk = Cookies.get('userPk');
  //const userPk = sessionStorage.getItem('userPk');

  useEffect(() => {
    const obtenerRol = async () => {
      try {
        console.log(userPk);
        const response = await axios.get(`http://localhost:3001/api/emparejamiento/obtenerRol?userPk=${userPk}`);
        setRol(response.data);
        Cookies.set('bandera', JSON.stringify(response.data.bandera), { expires: 1 });
        Cookies.set('totalEmparejamientos',JSON.stringify(response.data.totalEmparejamientos), { expires: 1 });
        Cookies.set('totalEnsenante', JSON.stringify(response.data.totalEnseñante), { expires: 1 });
        Cookies.set('totalAprendiz', JSON.stringify(response.data.totalAprendiz), { expires: 1 });
        sessionStorage.setItem('bandera', JSON.stringify(response.data.bandera));
        //sessionStorage.setItem('totalEmparejamientos', JSON.stringify(response.data.totalEmparejamientos));
        //sessionStorage.setItem('totalEnseñante', JSON.stringify(response.data.totalEnseñante));
        //sessionStorage.setItem('totalAprendiz', JSON.stringify(response.data.totalAprendiz));
        
      } catch (error) {
        console.error('Error al obtener el rol:', error);
      }
    };
    obtenerRol();
  }, [userPk]);

  return (
    <div className='divide_secciones'>
      <section className='columna_sidebar'>
        <Sidebar setVista={setVista} />
      </section>
      <section className='margen_vistas'>
        {vista === 'inicio' && <MEmparejamiento />}
        {vista === 'comunicacion' && <Comunicacion />} 
        {vista === 'preferencias' && <MPreferenciasAcademicas />} 
        {vista === 'configuracion' && <MConfiguracion />}
        {vista === 'empact' && <MEmparejamientosActivos />}
      </section>
    </div>
  );
};

export default VistaPrincipal;
