const express = require('express');
const router = express.Router();
const controlAdministracion = require('../controladores/controlAdministrador');
//CATALOGOS//
router.get('/obtenerEstatus', controlAdministracion.obtenerEstatusAlumno);
router.get('/obtenerMedallas', controlAdministracion.obtenerMedallasAlumnos);
router.post('/registroUsuarios', controlAdministracion.obtenerRegistrosUsuarios);
router.get('/materiasRegistroU',controlAdministracion.obtenerNombreMaterias);
//MODULO DE REGISTROS USUARIO //
router.post('/buscarFiltrado',controlAdministracion.obtenerUsuariosFiltrados);




//MODULO DE REPORTES
router.get('/datosGraficaUsoBoton',controlAdministracion.datosGraficaUsoAplicacion);
router.get('/datosSanciones',controlAdministracion.datosGraficaSanciones);
router.get('/datosEmparejameintosT',controlAdministracion.datosGraficaEmparejamiento);
router.get('/datosGraficaMaterias',controlAdministracion.datosGraficaMaterias);
router.get('/datosGraficaCalf',controlAdministracion.datosGraficaCalificaciones);
router.get('/datosGraficaLogros',controlAdministracion.datosGraficaLogros);





module.exports = router;