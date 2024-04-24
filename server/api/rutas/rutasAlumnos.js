const express = require('express');
const router = express.Router();
const controlAlumnos = require('../controladores/controlAlumnos');

//ENDPOINTS PARA ALUMNOS//

router.get('/materias', controlAlumnos.obtenerTodasLasMaterias);

router.post('/registro', controlAlumnos.guardarAlumno);
//router.post('/verificar/:correo', controlAlumnos.verificarAlumno);
router.get('/verificar/:token', controlAlumnos.verificarAlumno);

router.post('/recuperacion', controlAlumnos.recuperarContra);

router.post('/enviarPreferencias', controlAlumnos.guardarPreferenciasAcademicas);
// (req, res) => {
    // console.log('PK del usuario:', req.body.pkUsuario);
    // console.log('Selecciones Izquierda:', req.body.seleccionesIzquierda);
    // console.log('Selecciones Derecha:', req.body.seleccionesDerecha);
  
    // res.send({ message: 'Datos recibidos correctamente!' });
  //});


module.exports = router;