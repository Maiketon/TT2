
const modeloAdmin = require('../modelo/administradorModelo'); // Asegúrate de que la ruta al modelo es correcta

exports.obtenerEstatusAlumno = async (req, res) => {
    try {
        const estatus = await modeloAdmin.obtenerEstatusUsuarios();
        res.status(200).json(estatus);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener los estatus de usuario');
    }
};

exports.obtenerMedallasAlumnos = async (req,res) => 
{
    try {
        const medallas = await modeloAdmin.obtenerMedallasAlumnos();
        res.status(200).json(medallas);
    } catch (error) {
        console.error('Error realizando consulta medallas', error);
        res.status(500).send('Error en el servidor al obtener las medallas de los usuarios');
    }
};


exports.obtenerRegistrosUsuarios = async (req, res) => {
    try {
        const usuarios = await modeloAdmin.obtenerRegistrosUsuarios();
        console.log(usuarios); // Imprime los datos en la consola del servidor
        res.status(200).json(usuarios);
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(500).send('Error en el servidor al obtener los datos de los usuarios');
    }
};
