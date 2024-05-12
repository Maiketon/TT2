import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 //SE IMPORTA BOOSTRAP DENTRO DE REACT//
import 'bootstrap/dist/css/bootstrap.min.css';
//COMPONENTES D ELA VISTA PRINCIPAL//
import VistaPrincipal from './Componentes/Principal';

import PrincipalAdmin from './Componentes/VistasAdmin/PrincipalAdmin';
import PrincipalAlumno from './Componentes/VistasAlumno/PrincipalAlumno';
//import Swal from 'sweetalert2'
//import withReactContent from 'sweetalert2-react-content'


function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Verificar el rol de usuario al cargar la aplicación
    const storedRole = sessionStorage.getItem('userRole');
    if (storedRole) {
      // Si hay un rol almacenado en la sesión, establecerlo en el estado
      setUserRole(parseInt(storedRole));
    }
    // No devuelvas nada en el useEffect
  }, []); // Se ejecuta solo una vez al cargar la aplicación

  console.log("UserRole en App:", userRole); // Verifica el valor de userRole

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<VistaPrincipal />} />
          <Route path="/VistasAdmin/*" element={<PrivateRoute allowedRoles={[8]} redirectTo="/" component={PrincipalAdmin} />} />
          <Route path="/VistasAlumno/*" element={<PrivateRoute allowedRoles={[4]} redirectTo="/" component={PrincipalAlumno} />} />
        </Routes>
      </Router>
    </div>
  );
}

function PrivateRoute({ allowedRoles, redirectTo, component: Component, ...props }) {
  // Obtener el rol de usuario de la sesión
  const userRole = parseInt(sessionStorage.getItem('userRole'));

  if (!userRole || !allowedRoles.includes(userRole)) {
    // Si el usuario no tiene un rol permitido, redirige
    return <Navigate to={redirectTo} />;
  }

  // Si el usuario tiene un rol permitido, muestra el componente de la ruta protegida
  return <Component {...props} />;
}

export default App;