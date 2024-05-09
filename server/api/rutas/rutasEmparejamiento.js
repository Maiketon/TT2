const express = require('express');
const router = express.Router();
const controlEmparejamiento = require('../controladores/controlEmparejamiento');
//ENDPOINTS PARA ALUMNOS//
//GETS//
router.get('/obtenerDatosAlumno', controlEmparejamiento.obtenerNombresFortalezasDeficiencias);

//POSTS//
module.exports = router;