import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/SidebarStyles.css'
import Sidebar from './SidebarAlumno';
import Comunicacion from './ComunicacionUsuarios';
import MConfiguracion from './Configuracion';
import MEmparejamiento from './Emparejamiento';
import MPreferenciasAcademicas from './PreferenciasAcademicas';


const VistaPrincipal = () => {
  const [vista, setVista] = useState('inicio');
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
        </section>
      </div>
  );
}

export default VistaPrincipal;
