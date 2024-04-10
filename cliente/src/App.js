import './App.css';
import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//CONECTAR CON EL BACK//
import Axios from "axios";
 //SE IMPORTA BOOSTRAP DENTRO DE REACT//
import 'bootstrap/dist/css/bootstrap.min.css';
//COMPONENTES D ELA VISTA PRINCIPAL//
import VistaPrincipal from './Componentes/Principal';
import PrincipalAdmin from './Componentes/VistasAdmin/PrincipalAdmin';
import VistaAlumno from './Componentes/VistaAlumno/SidebarAlumno';
//import Swal from 'sweetalert2'
//import withReactContent from 'sweetalert2-react-content'


  //App se va a encargar de mandar a llamar TODOS los Modulos//
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<VistaPrincipal />} /> {/* Ruta para VistaPrincipal */}
          <Route path="/VistasAdmin/PrincipalAdmin" element={<PrincipalAdmin />} />
          <Route path="/VistaAlumno/SidebarAlumno" element={<VistaAlumno />} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
