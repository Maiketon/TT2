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
router.get('/obtenerRechazos', controlEmparejamiento.obtenerRechazos);

//POSTS//
router.post('/actualizarRechazos', controlEmparejamiento.actualizarRechazos);
router.post('/actualizarEmparejamientosDisponibles', controlEmparejamiento.actualizarEmparejamientos);
router.post('/insertarRegistros', controlEmparejamiento.insertarRegistros);
router.post('/obtenerPkaValidar',controlEmparejamiento.obtenerPKaValidar);
router.post('/verificarColision', controlEmparejamiento.verificarColision);
router.post('/updateEmparejamiento', controlEmparejamiento.updateEmparejamiento);
router.post('/saberEstado', controlEmparejamiento.saberEstado);
router.post('/rechazarEmparejamiento', controlEmparejamiento.rechazarEmparejamiento);
module.exports = router;