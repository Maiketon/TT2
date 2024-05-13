const express = require('express');
const router = express.Router();
const controlAdministracion = require('../controladores/controlAdministrador');

router.get('/obtenerEstatus', controlAdministracion.obtenerEstatusAlumno);
router.get('/obtenerMedallas', controlAdministracion.obtenerMedallasAlumnos);

router.post('/registroUsuarios', controlAdministracion.obtenerRegistrosUsuarios);



router.get('/datosGraficaUsoBoton',controlAdministracion.datosGraficaUsoAplicacion);
router.get('/datosSanciones',controlAdministracion.datosGraficaSanciones);


module.exports = router;