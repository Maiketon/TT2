const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

const app = express();

// Configuración de CORS para permitir solicitudes desde Netlify
const corsOptions = {
  origin: ['https://learnmatch.netlify.app'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware de bodyParser
app.use(bodyParser.json());

// Rutas de la API
const rutasAdministrador = require('./api/rutas/rutasAdministrador');
app.use('/api/administracion', rutasAdministrador);

const rutasAlumnos = require('./api/rutas/rutasAlumnos');
app.use('/api/alumnos', rutasAlumnos);

const rutasLogin = require('./api/rutas/rutasLogin');
app.use('/api/login', rutasLogin);

const rutasAlgoritmo = require('./api/rutas/rutasAlgoritmo');
app.use('/api/algoritmo', rutasAlgoritmo);

const rutasEmparejamiento = require('./api/rutas/rutasEmparejamiento');
app.use('/api/emparejamiento', rutasEmparejamiento);

// Servir archivos estáticos de React
app.use(express.static(path.join(__dirname, '..', 'cliente', 'build')));

// Redirecciona todas las rutas no-API a React
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'cliente', 'build', 'index.html'));
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).send("La ruta que intentas acceder no existe.");
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Ha ocurrido un error en el servidor.");
});

// Configuración del certificado SSL autofirmado
const sslOptions = {
  key: fs.readFileSync('C:\\Users\\Anonymous\\Desktop\\TT2\\server\\CertificadosSSL\\private.key'),
  cert: fs.readFileSync('C:\\Users\\Anonymous\\Desktop\\TT2\\server\\CertificadosSSL\\server.crt')
};

// Puerto HTTPS
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
