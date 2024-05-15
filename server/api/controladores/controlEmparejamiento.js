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

exports.obtenerPKaValidar = async(req,res) => {
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
        console.log("Esta es la bandera y PK_EMPAREJAMIENTO:");
        console.log(pkvalidar);
        // Enviar el resultado junto con el PK_EMPAREJAMIENTO en formato JSON
        res.json(pkvalidar);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener el Pk que hará la validación');
    }
}

