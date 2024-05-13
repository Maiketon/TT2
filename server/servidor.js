const express = require ("express");
const cors = require("cors");
//const dbConexion = require('./configuracion/dbconfiguracion');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


app.use(cors());
app.use (express.json());

//ACCESO AL ARCHIVO CON TODOS LOS END POINT DEL ADMINISTRADOR
const rutasAdministrador = require('./api/rutas/rutasAdministrador');
app.use('/api/administracion', rutasAdministrador);


//ACCESO AL ARCHIVO CON TODOS LOS END POINT DEL ALUMNO
const rutasAlumnos = require('./api/rutas/rutasAlumnos');
app.use(bodyParser.json());
app.use('/api/alumnos', rutasAlumnos);
//ACCESO AL ARCHIVO CON TODOS LOS ENDPOINT DEL LOGIN
const rutasLogin = require('./api/rutas/rutasLogin');
app.use('/api/login', rutasLogin);

const rutasAlgoritmo = require('./api/rutas/rutasAlgoritmo');
app.use('/api/algoritmo', rutasAlgoritmo);

const rutasEmparejamiento =  require('./api/rutas/rutasEmparejamiento');
app.use('/api/emparejamiento',rutasEmparejamiento);

  
  // Servir archivos estáticos de React
  app.use(express.static(path.join(__dirname, '..', 'cliente', 'build')));
  
  // Redirecciona todas las rutas no-API a React
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'cliente', 'build', 'index.html'));
  });

  
//Manejo de errores MiddleWare que se estara desarrollando//
app.use((req, res, next) => {
    res.status(404).send("La ruta que intentas acceder no existe.");
});
app.use((err, req, res, next) => {
    console.error(err); // Podrías querer loguear los errores de alguna forma
    res.status(500).send("Ha ocurrido un error en el servidor.");
});



//PUERTO EN EL QUE DEBERA ESCUCHAR REACT //
const PORT = 3001;
app.listen (PORT, () =>
{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}
);
    

