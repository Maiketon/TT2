import React, { useState, useEffect } from 'react';
import { Container, Row, Col ,Spinner} from 'react-bootstrap';
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
import {CargarProvider,useCarga} from "../ContextoCarga";

const VistaPrincipal = () => {

  const SpinnerGlobal = () => 
    {
      const {estaCargando} = useCarga();
      if(!estaCargando) return null;
      return (
        <div className="spinner-container d-flex" >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span> 
          </Spinner>
          <div>Cargando . . .</div>
        </div>
      );
    }


  const [vista, setVista] = useState('inicio');
  const [Rol, setRol] = useState([]);
  console.log(Rol);
  const userPk = Cookies.get('userPk');
  //const userPk = sessionStorage.getItem('userPk');

  useEffect(() => {
    const obtenerRol = async () => {
      try {
        console.log(userPk);
        const response = await axios.get(`https://201.124.162.192:3001/api/emparejamiento/obtenerRol?userPk=${userPk}`);
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
    <>
    <CargarProvider>
    <div className='divide_secciones'>
      <section className='columna_sidebar'>
        <Sidebar setVista={setVista} />
        <SpinnerGlobal/>
      </section>
      <section className='margen_vistas'>
        {vista === 'inicio' && <MEmparejamiento />}
        {vista === 'comunicacion' && <Comunicacion />} 
        {vista === 'preferencias' && <MPreferenciasAcademicas />} 
        {vista === 'configuracion' && <MConfiguracion />}
        {vista === 'empact' && <MEmparejamientosActivos />}
      </section>
    </div>
    </CargarProvider>
    </>
    
  );
};

export default VistaPrincipal;
