const express = require('express');
const router = express.Router();
const controlEmparejamiento = require('../controladores/controlEmparejamiento');
//ENDPOINTS PARA ALUMNOS//
//GETS//
router.get('/obtenerNombre', controlEmparejamiento.obtenerNombreUsuarios);
router.get('/obtenerDeficiencias', controlEmparejamiento.obtenerDeficienciasAlumnos);
router.get('/obtenerFortalezas', controlEmparejamiento.obtenerFortalezasAlumnos);
router.get('/obtenerStrikes', controlEmparejamiento.obtenerStrikes);
//POSTS//
module.exports = router;