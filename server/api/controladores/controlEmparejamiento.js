//IMPORTACIONES DEL MODELO//
const modeloEmparejamiento = require('../modelo/emparejamientoModelo');
exports.obtenerNombresFortalezasDeficiencias = async (req,res) => {
    const { userPk } = req.query;
    try {
        const data = await modeloEmparejamiento.obtenerNombresFortalezasDeficiencias(userPk);
        res.json(data);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener los datos');
    }
};

exports.obtenerStrikes = async (req,res) => {
    const { userPk } = req.query;
    try {
        const strikes = await modeloEmparejamiento.obtenerStrikes(userPk);
        res.json(strikes);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener el numero de strikes');
    }
};

exports.obtenerRolEmparejamiento = async (req,res) => {
    const {userPk} = req.query;
    try {
        const respuesta = await modeloEmparejamiento.obtenerRolEmparejamiento(userPk);
       
        res.json(respuesta);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener el rol');
    }
};

exports.obtenerMentoresActivos = async(req,res) => {
    const {userPk} = req.query;
    try {
        const mentor = await modeloEmparejamiento.obtenerMentorActivo(userPk);
       
        res.json(mentor);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener el mentor activo');
    }
};

exports.obtenerAprendizActivos = async(req,res) => {
    const {userPk} = req.query;
    try {
        const aprendiz = await modeloEmparejamiento.obtenerAprendizActivo(userPk);
       
        res.json(aprendiz);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener el aprendiz activo');
    }
};

exports.obtenerRechazos = async(req,res) => {
    const {userPk} = req.query;
    try {
        const getrechazos = await modeloEmparejamiento.ObtenerRechazos(userPk);
       
        res.json(getrechazos);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener el numero de rechazos');
    }
};



exports.actualizarRechazos = async (req, res) => {
    const { userPk } = req.query;
    const { numrechazos } = req.query;
    let rechazosdisponibles = 0;
    try {
        rechazosdisponibles = numrechazos - 1;
        await modeloEmparejamiento.actualizarRechazos(rechazosdisponibles, userPk);
        // Enviamos la respuesta al cliente con los rechazos disponibles actualizados
        res.status(200).json({ rechazosdisponibles });
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al actualizar el número de rechazos');
    }
};

exports.actualizarEmparejamientos = async (req,res) => {
    const { userPk } = req.query;
    const { numrechazos } = req.query;
    let rechazosdisponibles = 0;
    try {
        rechazosdisponibles = numrechazos - 1;
        await modeloEmparejamiento.actualizarRechazos(rechazosdisponibles, userPk);
        // Enviamos la respuesta al cliente con los rechazos disponibles actualizados
        res.status(200).json({ rechazosdisponibles });
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al actualizar el número de rechazos');
    }
}

exports.insertarRegistros = async (req,res) => {
    const {usuarioPrincipalPK,tipoCoincidencia, usuarioCandidatoPK} = req.query;
    let usuarioCandidatoPKquery = 0;
    let rolUsuarioPrincipal = 0;
    let rolUsuarioCandidato = 0;
    console.log("Este es el tipo de coincidencia");
    console.log(tipoCoincidencia);
    console.log("Este es el usuario candidato");
    console.log(usuarioCandidatoPK);
    
    if(tipoCoincidencia === "Mentor"){
        usuarioCandidatoPKquery = req.query.usuarioCandidatoPK;
        rolUsuarioPrincipal = 1;
        rolUsuarioCandidato = 2;
         }else if(tipoCoincidencia === "Aprendiz"){
        usuarioCandidatoPKquery = req.query.usuarioCandidatoPK;
        rolUsuarioPrincipal = 2;
        rolUsuarioCandidato = 1;
    }
    try {
        console.log("Este es el rol del usuario principal");
        console.log(rolUsuarioPrincipal);
        console.log("Este es el rol del usuario candidato");
        console.log(rolUsuarioCandidato);
        
        await modeloEmparejamiento.insertarRegistros(usuarioPrincipalPK,rolUsuarioPrincipal,usuarioCandidatoPK,rolUsuarioCandidato);
        // Enviamos la respuesta al cliente con los rechazos disponibles actualizados
        res.status(200).json( "Salio bien" );
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al actualizar el número de rechazos');
    }
}

exports.verificarColision = async (req,res) => {
    const {pkUsuarioCandidato,tipoCoincidencia} = req.query;
    console.log("Entre a el controlador de verificar colision")
    let posibleEmparejamiento = 0;
    if(tipoCoincidencia === "Mentor"){
        //2 para aprendiz
        posibleEmparejamiento = 2;
    }else if(tipoCoincidencia === "Aprendiz"){
        //1 para mentor
        posibleEmparejamiento = 1;
    }
    try {
        const colision = await modeloEmparejamiento.obtenerRolEmparejamiento(pkUsuarioCandidato);
        console.log(colision.bandera);
        if(colision.bandera == 2 && posibleEmparejamiento == 1){
            console.log("Colision");
            res.json(1);
        }else
        if(colision.bandera == 1 && posibleEmparejamiento == 2){
            console.log("Colision");
            res.json(1);
        }if(colision.bandera == 3){
            console.log("Colision");
            res.json(1);
        }
        else{
            console.log("No hay colision");
            res.json(0);
        }
             
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al verificar colision');
    }
}

exports.obtenerPKaValidar  = async(req,res) => {
    const {PK_USERPAIRED,PK_EMPAREJAMIENTO} = req.query;
    try {  
        console.log("Esta recibiendo el PK_USERPAIRED y PK_EMPAREJAMIENTO");
        console.log(PK_USERPAIRED);
        console.log(PK_EMPAREJAMIENTO);
        // Realizar la consulta para obtener el resultado y el PK_EMPAREJAMIENTO
        const resultadoConsulta = await modeloEmparejamiento.obtenerPkaValidar(PK_USERPAIRED, PK_EMPAREJAMIENTO);
        const pkvalidar = {
            resultado: resultadoConsulta,
            PK_EMPAREJAMIENTO: PK_EMPAREJAMIENTO
        };
        if(resultadoConsulta == 0){
            const resultadoConsulta = await modeloEmparejamiento.obtenerCondicionEvaluacion(PK_USERPAIRED, PK_EMPAREJAMIENTO);
            
            const pkvalidar = {
            resultado: resultadoConsulta,
            PK_EMPAREJAMIENTO: PK_EMPAREJAMIENTO
        };
         console.log("Esta es la bandera y PK_EMPAREJAMIENTO: en caso de que el emparejamiento este activo");
        console.log(pkvalidar);
        res.json(pkvalidar);
         }else{
            console.log("Esta es la bandera y PK_EMPAREJAMIENTO:");
            console.log(pkvalidar);
            // Enviar el resultado junto con el PK_EMPAREJAMIENTO en formato JSON
            res.json(pkvalidar);
         }

       
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener el Pk que hará la validación');
    }
}

exports.updateEmparejamiento = async (req,res) => {
    const {PK_EMPAREJAMIENTO} = req.query;
    try {
        await modeloEmparejamiento.updateEmparejamiento(PK_EMPAREJAMIENTO);
        
        // Enviamos la respuesta al cliente con los rechazos disponibles actualizados
        res.status(200).json( "Salio bien" );
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al actualizar el emparejamiento');
    }
}

exports.saberEstado = async (req,res) => {
    const {PK_EMPAREJAMIENTO} = req.query;
    try {
        const response = await modeloEmparejamiento.saberEstado(PK_EMPAREJAMIENTO);
        console.log("Este es el response");
        console.log(response[0].FK_ESTADOEMPAREJAMIENTO);
        if (response && response.length > 0) {
            const estadoEmparejamiento = response[0].FK_ESTADOEMPAREJAMIENTO;
            if (estadoEmparejamiento === 3) {
                res.json(3);
            } else if (estadoEmparejamiento === 1) {
                res.json(1);
            } else if (estadoEmparejamiento === 5) {
                res.json(5);
            }
        } 
        // Enviamos la respuesta al cliente con los rechazos disponibles actualizados

    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al actualizar el emparejamiento');
    }
}

exports.rechazarEmparejamiento = async (req,res) => {
    const {PK_EMPAREJAMIENTO} = req.query;
    try {
        response = await modeloEmparejamiento.rechazarEmparejamiento(PK_EMPAREJAMIENTO);
        
        // Enviamos la respuesta al cliente con los rechazos disponibles actualizados
        res.status(200).json( "Salio bien" );
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al actualizar el emparejamiento');
    }
}

exports.preFinalizarEmparejamiento = async (req,res) => {
    const {PK_EMPAREJAMIENTO} = req.query;
    try {
        response = await modeloEmparejamiento.preFinalizarEmparejamiento(PK_EMPAREJAMIENTO);
        res.status(200).json( "Salio bien" );
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al actualizar el emparejamiento');
    }
}

exports.actualizarCalificacion = async (req, res) => {
    const { PK_EMPAREJAMIENTO, userPk, promedio } = req.query;
    try {
        console.log(PK_EMPAREJAMIENTO);
        console.log(userPk);
        console.log(promedio);
        response = await modeloEmparejamiento.actualizarCalificacion(PK_EMPAREJAMIENTO, userPk, promedio);
        console.log("Esta es la respuesta");
        console.log(response);
        res.json(response);
    } catch (error) {
        console.error('Error realizando la consulta:', error); // Aquí cambiamos err por error
        res.status(500).send('Error en el servidor al actualizar la calificacion del usuario');
    }
}

// controlEmparejamiento.js
exports.comprobar2Calificaciones = async (req, res) => {
    const { PK_EMPAREJAMIENTO } = req.query;
    try {
        console.log(PK_EMPAREJAMIENTO);

        const response = await modeloEmparejamiento.comprobar2Calificaciones(PK_EMPAREJAMIENTO);
        if (response.length > 0) {
            console.log("Hay valores en CALIFICACION_USUARIO1 y CALIFICACION_USUARIO2 para PK_EMPAREJAMIENTO =", PK_EMPAREJAMIENTO);
            res.json("Completo");
        } else {
            console.log("No hay valores en CALIFICACION_USUARIO1 o CALIFICACION_USUARIO2 para PK_EMPAREJAMIENTO =", PK_EMPAREJAMIENTO);
            res.json("Incompleto");
        }
    } catch (error) {
        console.error('Error realizando la consulta:', error);
        res.status(500).send('Error en el servidor al verificar las calificaciones del emparejamiento');
    }
}

exports.actualizarEstadoEmparejamiento = async (req, res) => {  
    const { PK_EMPAREJAMIENTO } = req.query;
    try {
        const response = await modeloEmparejamiento.actualizarEstadoEmparejamiento(PK_EMPAREJAMIENTO);
        res.json(response);
    } catch (error) {
        console.error('Error realizando la consulta:', error);
        res.status(500).send('Error en el servidor al actualizar el estado del emparejamiento');
    }
}

exports.hacertoken = async (req,res) =>
    {
        const {PK_EMPAREJAMIENTO}=req.body;
        console.log(PK_EMPAREJAMIENTO);
        try {
            const roomID = randomID(5);
            const response = await modeloEmparejamiento.generartokenzg(PK_EMPAREJAMIENTO, roomID);
            res.json({
                message: 'Token generado y comunicación creada exitosamente',
                data: response
            });
        } catch (error) {
            console.error('Error al generar el token:', error);
            res.status(500).json({ message: 'Error al generar el token' });
        }

    };

    exports.obtenerTokenC = async (req, res) => {
        const { PK_EMPAREJAMIENTO } = req.query;
        try {
            const token = await modeloEmparejamiento.obtenerTokenPorEmparejamiento(PK_EMPAREJAMIENTO);
            res.json({ token });
        } catch (error) {
            console.error('Error al obtener el token:', error);
            res.status(500).json({ message: 'Error al obtener el token' });
        }
    };



function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
};

exports.actualizarCalfAlumnoGeneral = async (req, res) => {
    const {userPk } = req.query;
    try {
        console.log(userPk);
        const response = await modeloEmparejamiento.actualizarCalfAlumnoGeneral(userPk);
        console.log("Esta es la respuesta");
        console.log("Total calificación rol 1:", response.total_calificacion_rol_1);
        console.log("Count calificación rol 1:", response.count_calificacion_rol_1);
        console.log("Total calificación rol 2:", response.total_calificacion_rol_2);
        console.log("Count calificación rol 2:", response.count_calificacion_rol_2);

        
        if(count_calificacion_rol_1 == 0){
            const promedio_rol_2 = response.total_calificacion_rol_2 / response.count_calificacion_rol_2;
            const promedio_rol_1 = 0;
            res.json({promedio_rol_1, promedio_rol_2});
        }else if(count_calificacion_rol_2 == 0){
            const promedio_rol_1 = response.total_calificacion_rol_1 / response.count_calificacion_rol_1;
            const promedio_rol_2 = 0;
            res.json({promedio_rol_1, promedio_rol_2});
        }else{
            const promedio_rol_1 = response.total_calificacion_rol_1 / response.count_calificacion_rol_1;
            const promedio_rol_2 = response.total_calificacion_rol_2 / response.count_calificacion_rol_2;
            res.json({ promedio_rol_1, promedio_rol_2 });
        }
        
    } catch (error) {
        console.error('Error realizando la consulta:', error);
        res.status(500).send('Error en el servidor al actualizar la calificacion del usuario');
    }
};

exports.updatearCalificacion = async (req, res) => {
    const {userPk,promedio_rol_1,promedio_rol_2, promedioGeneral} = req.query;
    try {
        const response = await modeloEmparejamiento.updatearCalificacion(userPk,promedio_rol_1,promedio_rol_2, promedioGeneral);
        res.json(response);
    } catch (error) {
        console.error('Error realizando la consulta:', error);
        res.status(500).send('Error en el servidor al actualizar la calificacion del usuario');
    }
};

exports.reportarUsuario = async(req,res) =>
    {
        const {pkEmparejamiento,pkUsuarioQueReporta,mensaje} = req.body;
        try {
            const obtenerPkUsuarioReporte = await modeloEmparejamiento.obtenerUsuarioReportar(pkEmparejamiento,pkUsuarioQueReporta);
            console.log("PK USUARIO AL QUE SE VA A REPORTAR",obtenerPkUsuarioReporte);
            const realizarReporte= await modeloEmparejamiento.mandarReporte(pkEmparejamiento,pkUsuarioQueReporta,obtenerPkUsuarioReporte,mensaje);
            if (realizarReporte.success) {
                res.status(201).send("Reporte realizado con éxito");
            } 
        } catch (error) {
            console.error('Error realizando al reportar usuario:', error);
            res.status(500).send('Error en el servidor al reportar al usuario del emparejamiento',error);
        }
    }