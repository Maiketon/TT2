import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
// COMPONENTES DE LA VISTA PRINCIPAL
import VistaPrincipal from './Componentes/Principal';
import PrincipalAdmin from './Componentes/VistasAdmin/PrincipalAdmin';
import PrincipalAlumno from './Componentes/VistasAlumno/PrincipalAlumno';

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedRole = Cookies.get('userRole'); 
    if (storedRole) {
      setUserRole(parseInt(storedRole));
    }
  }, []);

  console.log("UserRole en App:", userRole);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Si el usuario ya está autenticado, redirigir fuera de la página principal */}
          <Route 
            path="/" 
            element={
              userRole ? (
                userRole === 8 ? (
                  <Navigate to="/VistasAdmin" />
                ) : userRole === 4 ? (
                  <Navigate to="/VistasAlumno/PrincipalAlumno" />
                ) : (
                  <VistaPrincipal />
                )
              ) : (
                <VistaPrincipal />
              )
            } 
          />
          <Route path="/VistasAdmin/*" element={<PrivateRoute allowedRoles={[8]} redirectTo="/" component={PrincipalAdmin} />} />
          <Route path="/VistasAlumno/*" element={<PrivateRoute allowedRoles={[4]} redirectTo="/" component={PrincipalAlumno} />} />
        </Routes>
      </Router>
    </div>
  );
}

function PrivateRoute({ allowedRoles, redirectTo, component: Component, ...props }) {
  const userRole = parseInt(Cookies.get('userRole'));

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} />;
  }

  return <Component {...props} />;
}

export default App;