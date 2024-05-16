//IMPORTACIONES DEL MODELO//
const modeloAlumnos = require('../modelo/alumnosModelo');

//IMPORTACION DE LIBRERIAS PARA CONTROL//
const jsonwebtoken = require('jsonwebtoken'); //LIBRERIA PARA ENCRIPTAR LOS DATOS PARA LA BASE DE DATOS //
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


//FORMULARIOINSCRIBIRSE//
//REGISTRAR USUARIO
exports.guardarAlumno = async (req, res) => {
    const { nombres, apellidoP, apellidoM, correo, password, carrera, semestre } = req.body;

    try {
        // Verificar si el correo ya existe
        const registros = await modeloAlumnos.verificarCorreoExistente(correo);
        console.log(registros);
        console.log(correo);
        const cuentaActiva = registros.find(registro => registro.FK_ESTATUSUSUARIO === 1 && registro.FECHA_BORRADO == null);
        const cuentaReactivable = registros.every(registro => registro.FK_ESTATUSUSUARIO === 7);
        console.log(cuentaActiva);
        console.log(cuentaReactivable);

        if (cuentaActiva) {
            // Reactivar cuenta enviando nuevamente el correo de verificación
            const verificacionToken = jsonwebtoken.sign({ usuarioId: cuentaActiva.PK_USUARIO, correo }, 'pruebaclave');
            const verificationLink = `http://localhost:3001/api/alumnos/verificar/${verificacionToken}`;
            console.log("Entre a cuenta activa voy a enviar 200");
            const correoOpciones = {
                from: "learnmatch2024029@hotmail.com", 
                to: correo,
                subject: 'Reactivación de tu cuenta en LearnMatch',
                text: `Hola ${nombres}, parece que no completaste tu proceso de verificación. Por favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}`
            };

            await transporter.sendMail(correoOpciones);
            return res.status(200).send('Correo de verificación reenviado exitosamente.');
        } else if (cuentaReactivable) {
            // Si es registrable, proceder con el registro
            const usuarioId = await modeloAlumnos.guardarNuevoAlumno({ nombres, apellidoP, apellidoM, correo, password, carrera, semestre });
            const verificacionToken = jsonwebtoken.sign({ usuarioId, correo }, 'pruebaclave');
            const verificationLink = `http://localhost:3001/api/alumnos/verificar/${verificacionToken}`;
            
            const correoOpciones = {
                from: "learnmatch2024029@hotmail.com", 
                to: correo,
                subject: 'Bienvenido a LearnMatch!!!',
                text: `Hola ${nombres}, por favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}`
            };
            console.log("Nuevo registro voy a enviar 201");
            let info = await transporter.sendMail(correoOpciones);
            console.log('Mensaje enviado: %s', info.messageId);
            res.status(201).send('Usuario registrado correctamente. Por favor verifica tu correo electrónico.');
        } else {
            return res.status(409).send('El correo ya está registrado con una cuenta activa o no deseada.');
        }
    
    } catch (error) {
        console.error('Error al registrar o reactivar al usuario:', error);
        res.status(500).send('Error al registrar o reactivar al usuario.');
    }
};



//Actualizar Status Alumno//
exports.verificarAlumno = async (req, res) => {
    const { token } = req.params;
    console.log("Token recibido:", token);
    try {
        const decoded = jsonwebtoken.verify(token, 'pruebaclave');  // Asegúrate de usar 'jwt' en lugar de 'jsonwebtoken'
        const { usuarioId, correo } = decoded;
        const resultado = await modeloAlumnos.actualizarEstatusUsuario(correo, usuarioId);
        
        if (resultado > 0) {
            res.send(generateModalHTML("Verificación Completada", "Usuario verificado con éxito. Ya puedes cerrar esta ventana.", true));
        } else {
            res.send(generateModalHTML("Usuario No Encontrado", "No pudimos verificar tu cuenta. Usuario no encontrado.", false));
        }
    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        if (error instanceof jwt.JsonWebTokenError) {
            res.send(generateModalHTML("Token Inválido", "El token proporcionado es inválido o ha expirado. Por favor, intenta de nuevo o contacta soporte.", false));
        } else {
            res.send(generateModalHTML("Error Interno", "Estamos teniendo problemas técnicos. Por favor, contacta soporte: learnmatch2024029@hotmail.com", false));
        }
    }
};

// LOGIN //
//RECUPERAR CONTRASEÑA//
 exports.recuperarContra = async(req, res)=>
 {
/////////////////////////////////////////////////
    function generarCadenaAleatoria(longitud) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let resultado = '';
        for (let i = 0; i < longitud; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            resultado += caracteres[indiceAleatorio];
        }
        return resultado;
    }
///////////////////////////////////////////

    const { correo } = req.body;  // Extracción del correo del cuerpo de la solicitud
    console.log(correo);  // Imprime el correo para verificar que se recibe correctamente

    try {
        // Asumiendo que la función espera un objeto con una clave 'correo'
        const pkUsuario = await modeloAlumnos.verificarRegistroCorreo(correo); 
        console.log("Usuario existe:", pkUsuario.existe);
        console.log("PK del usuario:", pkUsuario.pk);
        console.log("PK del usuario:", pkUsuario.nombres);
        if (pkUsuario.existe) {
            console.log("Procesando recuperación de contraseña para:", correo);
            //Parametros para crear el correo//
            const passNueva = generarCadenaAleatoria(8);
            const resultado = await modeloAlumnos.escribirNuevaPass(passNueva,pkUsuario.pk);
             if (resultado > 0) {
                const correoOpciones = {
                    from: "learnmatch2024029@hotmail.com", 
                    to: correo,
                    subject: '¡¡Nueva contraseña de LearnMatch!!',
                    text: `Hola ${pkUsuario.nombres}, por favor ingresa a nuestro sistema con esta nueva clave en el Inicio de sesión ${passNueva}`
                };
               let info = await transporter.sendMail(correoOpciones);
                console.log('Mensaje enviado: %s', info.messageId);
                res.send(201, "Usuario reestablecido correctamente.");
        }
        } else {
            console.log("No existe un usuario con ese correo:", correo);
            res.status(404).send({ message: "No existe un usuario con ese correo en el sistema." });
        }
    } catch (error) {
        console.error("Error durante la verificación del correo:", error);
        res.status(500).send({ message: "Error interno del servidor." });
    }
 };
 exports.guardarPreferenciasAcademicas = async(req, res)=>
 {
    const recuperarCargaUtil = {pkUsuario,seleccionesIzquierda,seleccionesDerecha} =req.body;
    
    if (seleccionesIzquierda.length !== 3 || seleccionesDerecha.length !== 3) {
        return res.status(400).json({
            success: false,
            message: "Número incorrecto de selecciones."
        });
    }
    try {
        // Combinar las selecciones en un solo objeto
        const selecciones = {
            seleccion1: seleccionesIzquierda[0],//DEFICIENCIA
            seleccion2: seleccionesIzquierda[1],
            seleccion3: seleccionesIzquierda[2],
            seleccion4: seleccionesDerecha[0], //ENSEÑANZA//
            seleccion5: seleccionesDerecha[1],
            seleccion6: seleccionesDerecha[2]
        };

        // Llamar a la función del modelo para actualizar la base de datos
        const resultado = await modeloAlumnos.guardarPreferenciasAcademicas(pkUsuario, selecciones);

        //Hace registro de las 6 medallas que tiene el usuario//
        const resultadoMedallas = await modeloAlumnos.nuevasMedallas(pkUsuario);

        if (resultadoMedallas.affectedRows === 6 && resultado) {
            res.status(200).send("Usuario aprobado correctamente.");
        } else {
            res.status(400).send('No se pudieron actualizar las selecciones o inicializar las medallas');
        }      
    } catch (error) {
        console.error('Error al procesar las selecciones:', error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        });
    }
 };

 exports.obtenerPreferenciasAcademicas = async (req,res)=> 
 {
    const pkUsuario = req.query.pkUsuario;
    console.log("Valor del pk en control:");
    console.log(pkUsuario);
    try {
        const preferencias = await modeloAlumnos.obtenerPreferenciasAcademicas(pkUsuario);
        console.log(preferencias);
        res.json({ success: true, data: preferencias });
    } catch (error) {
        console.error('Error al obtener las preferencias:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
 }

 
 exports.obtenerMedallas = async (req, res) => {
    const pkUsuario = req.query.pkUsuario;
    try {
        const medallasHabilitadas = await modeloAlumnos.obtenerEstadoMedallas(pkUsuario);
        res.json({ success: true, data: medallasHabilitadas }); // Envía el array de objetos
    } catch (error) {
        console.error('Error al obtener las medallas:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}
 
 exports.cambiarContra = async (req, res) => {
    const { userPk, correo, pswdactual, pswdnuevo } = req.body;
    try {
        const respuesta = await modeloAlumnos.CambiarPswd(userPk, correo, pswdactual, pswdnuevo);
        if (respuesta.affectedRows > 0) {
            res.status(200).json({ message: "Contraseña cambiada exitosamente", affectedRows: respuesta });
        } else {
            res.status(400).json({ message: "Error al cambiar la contraseña", error: "La contraseña actual es incorrecta o el correo electrónico no coincide." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al cambiar la contraseña", error: error.message });
    }
};

exports.eliminarCuenta = async (req, res) => {
    const { userPk } = req.body;
    try {
        const respuesta = await modeloAlumnos.eliminarCuenta(userPk);
        if (respuesta.affectedRows > 0) {
            res.status(200).send("Usuario eliminado correctamente.");
        } else {
            res.status(400).send("Error al intentar eliminar tu cuenta, intenta más tarde.");
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        });
    }
}



//CONTENIDO HTML QUE REDIRIGE EL BACK AL FRONT//
function generateModalHTML(title, message, isSuccess) {
    const closeButtonAction = isSuccess ? "window.close();" : "";
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div id="myModal" class="modal" tabindex="-1" role="dialog" style="display:block;">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="${closeButtonAction}">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>${message}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onclick="${closeButtonAction}">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.min.js"></script>
        </body>
        </html>
    `;
}