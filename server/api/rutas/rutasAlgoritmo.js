const express = require('express');
const router = express.Router();
const controlAlgoritmo = require('../controladores/controlAlgoritmo');

//ENDPOINTS PARA ALGORITMO//



router.post('/obtenerUsuarioPrincipal', controlAlgoritmo.algoritmoPrincipal);

//router.post('/verificar/:correo', controlAlumnos.verificarAlumno);

module.exports = router;