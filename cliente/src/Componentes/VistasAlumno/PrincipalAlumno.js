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

const VistaPrincipal = () => {
  const [vista, setVista] = useState('inicio');
  const [Rol, setRol] = useState([]);
  const userPk = sessionStorage.getItem('userPk');

  useEffect(() => {
    const obtenerRol = async () => {
      try {
        console.log(userPk);
        const response = await axios.get(`http://localhost:3001/api/emparejamiento/obtenerRol?userPk=${userPk}`);
        setRol(response.data);
        sessionStorage.setItem('bandera', JSON.stringify(response.data.bandera));
        sessionStorage.setItem('totalEmparejamientos', JSON.stringify(response.data.totalEmparejamientos));
        
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
