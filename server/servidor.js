const express = require ("express");
const cors = require("cors");
//const dbConexion = require('./configuracion/dbconfiguracion');
const app = express();
const bodyParser = require('body-parser');


app.use(cors());
app.use (express.json());


const rutasAlumnos = require('./api/rutas/rutasAlumnos');
app.use(bodyParser.json());
app.use('/api/alumnos', rutasAlumnos);



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
    

