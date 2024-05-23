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
router.post('/preFinalizarEmparejamiento',controlEmparejamiento.preFinalizarEmparejamiento);
router.post('/actualizarCalificacion',controlEmparejamiento.actualizarCalificacion);

router.post('/comprobar2Calificaciones', controlEmparejamiento.comprobar2Calificaciones);
router.post('/actualizarEstadoEmparejamiento', controlEmparejamiento.actualizarEstadoEmparejamiento);
router.post('/actualizarCalfAlumnoGeneral', controlEmparejamiento.actualizarCalfAlumnoGeneral);
router.post('/updatearCalificacion', controlEmparejamiento.updatearCalificacion);
router.post('/reportarUsuario',controlEmparejamiento.reportarUsuario);
router.post('/obtenerEmparejados', controlEmparejamiento.obtenerEmparejados);
router.post('/medalla1', controlEmparejamiento.medalla1);
router.post('/medalla2', controlEmparejamiento.medalla2);
router.post('/medalla3', controlEmparejamiento.medalla3);
router.post('/medalla4', controlEmparejamiento.medalla4);
router.post('/medalla5', controlEmparejamiento.medalla5);
router.post('/medalla6', controlEmparejamiento.medalla6);
//ZEGO
router.post('/hacerTokenSala', controlEmparejamiento.hacertoken);
router.get('/obtenerTokenC',controlEmparejamiento.obtenerTokenC);

module.exports = router;