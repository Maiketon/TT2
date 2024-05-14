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

exports.obtenerPKaValidar = async(req,res) => {
    const {PK_USERPAIRED,PK_EMPAREJAMIENTO} = req.query;
    try {
        const pkvalidar = await modeloEmparejamiento.obtenerPkaValidar(PK_USERPAIRED,PK_EMPAREJAMIENTO);
        console.log("Esta es la bandera");
        console.log(pkvalidar);
        res.json(pkvalidar);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener el Pk que hará la validación');
    }
}

