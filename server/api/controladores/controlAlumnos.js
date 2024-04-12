//IMPORTACIONES DEL MODELO//
const modeloAlumnos = require('../modelo/alumnosModelo');

//IMPORTACION DE LIBRERIAS PARA CONTROL//
const crypto = require('crypto'); //IMPORTAMOS LA LIBRERIA DE NO PARA ENCRIPTAR//
const transporter =require('../../configuracion/emailConfig');

//CATALOGOS//
exports.obtenerTodasLasMaterias = async (req, res) => {
    try {
        const materias = await modeloAlumnos.obtenerTodasLasMaterias();
        res.status(200).json(materias);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener las materias');
    }
};


//REGISTRO USUARIO//
exports.guardarAlumno = async (req, res) => {
    const { nombres, apellidoP, apellidoM, correo, password, carrera, semestre } = req.body;
    const verificationToken = crypto.randomBytes(20).toString('hex');

    try {
        const usuarioId = await modeloAlumnos.guardarNuevoAlumno({ nombres, apellidoP, apellidoM, correo, password, carrera, semestre });
        const verificationLink = `http://localhost:3000/verificar/${verificationToken}/${correo}`;
        console.log(usuarioId);
        const correoOpciones = {
            from: "learnmatch2024029@hotmail.com", 
            to: correo,
            subject: 'Bienvenido a LearnMatch!!!',
            text: `Hola ${nombres}, por favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}, una vez completado tu proceso, por favor procede a iniciar sesión en nuestro sistema`
        };
       let info = await transporter.sendMail(correoOpciones);
        console.log('Mensaje enviado: %s', info.messageId);
        res.status(201).send('Usuario registrado correctamente. Por favor verifica tu correo electrónico.');
    
    } catch (error) {
        console.error('Error al registrar al usuario:', error);
        res.status(500).send('Error al registrar al usuario.');
    }
};

exports.verificarAlumno = async (req, res) => {
    const { correo,pkusuario } = req.params;

    try {
        const resultado = await modeloAlumnos.actualizarEstatusUsuario(correo);
        if (resultado > 0) {
            res.status(200).send('Usuario verificado correctamente.');
        } else {
            res.status(404).send('Usuario no encontrado.');
        }
    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        res.status(500).send('Error durante la verificación del usuario.');
    }
};

