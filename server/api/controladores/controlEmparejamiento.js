//IMPORTACIONES DEL MODELO//
const modeloEmparejamiento = require('../modelo/emparejamientoModelo');

exports.obtenerNombreUsuarios = async (req, res) => {
    const { userPk } = req.query;

    try {
        const nombres = await modeloEmparejamiento.obtenerNombres(userPk);
        res.json(nombres);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener los nombres');
    }
};

exports.obtenerDeficienciasAlumnos = async (req,res) => {
    const { userPk } = req.query;
    try {
        const deficiencias = await modeloEmparejamiento.obtenerDeficiencias(userPk);
        res.json(deficiencias);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener las deficiencias');
    }
};

exports.obtenerFortalezasAlumnos = async (req,res) => {
    const { userPk } = req.query;
    try {
        const fortalezas = await modeloEmparejamiento.obtenerFortalezas(userPk);
        res.json(fortalezas);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener las fortalezas');
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