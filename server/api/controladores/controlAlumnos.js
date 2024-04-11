//IMPORTACIONES DEL MODELO//
const MateriasModelo = require('../modelo/alumnosModelo');

//IMPORTACION DE LIBRERIAS PARA CONTROL//
const crypto = require('crypto'); //IMPORTAMOS LA LIBRERIA DE NO PARA ENCRIPTAR//
const nodemailer = require('nodemailer');

//CATALOGOS//
exports.obtenerTodasLasMaterias = async (req, res) => {
    try {
        const materias = await MateriasModelo.obtenerTodasLasMaterias();
        res.status(200).json(materias);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener las materias');
    }
};


