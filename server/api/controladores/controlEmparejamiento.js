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

