const express = require('express');
const router = express.Router();
const controlAlumnos = require('../controladores/controlAlumnos');



router.get('/materias', controlAlumnos.obtenerTodasLasMaterias);


module.exports = router;