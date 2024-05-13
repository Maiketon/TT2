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

