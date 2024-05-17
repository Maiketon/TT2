const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

const app = express();

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



// Rutas de los certificados SSL
const sslOptions = {
  key: fs.readFileSync('C:\\Users\\Anonymous\\Desktop\\TT2\\server\\CertificadosSSL\\private.key'),
  cert: fs.readFileSync('C:\\Users\\Anonymous\\Desktop\\TT2\\server\\CertificadosSSL\\server.crt')
};

// Puerto en el que deberá escuchar React
const HTTPS_PORT = 3001;
https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
  console.log(`Servidor HTTPS corriendo en el puerto ${HTTPS_PORT}`);
});
// Redirigir tráfico HTTP a HTTPS
const HTTP_PORT = 80;
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + ':' + HTTPS_PORT + req.url });
  res.end();
}).listen(HTTP_PORT, () => {
  console.log(`Redireccionando tráfico HTTP en el puerto ${HTTP_PORT} a HTTPS`);
});