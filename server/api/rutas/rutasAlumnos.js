const express = require('express');
const router = express.Router();
const controlAlumnos = require('../controladores/controlAlumnos');

//ENDPOINTS PARA ALUMNOS//

router.get('/materias', controlAlumnos.obtenerTodasLasMaterias);

router.post('/registro', controlAlumnos.guardarAlumno);
//router.post('/verificar/:correo', controlAlumnos.verificarAlumno);
router.get('/verificar/:token', controlAlumnos.verificarAlumno);

router.post('/recuperacion', controlAlumnos.recuperarContra);


module.exports = router;