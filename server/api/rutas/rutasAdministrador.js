const express = require('express');
const router = express.Router();
const controlAdministracion = require('../controladores/controlAdministrador');

router.get('/obtenerEstatus', controlAdministracion.obtenerEstatusAlumno);
router.get('/obtenerMedallas', controlAdministracion.obtenerMedallasAlumnos);

router.post('/registroUsuarios', controlAdministracion.obtenerRegistrosUsuarios);
module.exports = router;