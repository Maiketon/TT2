const express = require('express');
const router = express.Router();
const controlEmparejamiento = require('../controladores/controlEmparejamiento');
//ENDPOINTS PARA ALUMNOS//
//GETS//
router.get('/obtenerDatosAlumno', controlEmparejamiento.obtenerNombresFortalezasDeficiencias);
router.get('/obtenerStrikes', controlEmparejamiento.obtenerStrikes);
router.get('/obtenerRol', controlEmparejamiento.obtenerRolEmparejamiento);
router.get('/obtenerMentor', controlEmparejamiento.obtenerMentoresActivos);
router.get('/obtenerAprendiz',controlEmparejamiento.obtenerAprendizActivos);
//POSTS//
module.exports = router;