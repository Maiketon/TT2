const express = require('express');
const router = express.Router();
const controlLogin = require('../controladores/controlLogin');

//ENDPOINTS PARA Login//



router.post('/login', controlLogin.login);
//router.post('/verificar/:correo', controlAlumnos.verificarAlumno);

router.post('/actualizarVerificacion', controlLogin.actualizarVerificacion);
//router.post('/verificar/:correo', controlAlumnos.verificarAlumno);



module.exports = router;