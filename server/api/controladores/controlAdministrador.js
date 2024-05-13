
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


exports.datosGraficaUsoAplicacion = async (req,res)=> 
    {
        try {
            const graficaBotonUsoAp = await modeloAdmin.datosGraficaUsoAplicacion();
            console.log(graficaBotonUsoAp);
            res.status(200).json(graficaBotonUsoAp);
        } catch (error) {
            console.error('Error al obtener los datos para la grafica del boton usuario');
            res.status(500).send('Error al obtener los datos para el llenado de la grafica',error);
        }
    };

    exports.datosGraficaSanciones = async (req, res) => {
        try {
            const graficaBotonSanciones = await modeloAdmin.datosGraficaSanciones();
            console.log(graficaBotonSanciones);
            res.status(200).json(graficaBotonSanciones);
        } catch (error) {
            console.error('Error al obtener los datos para la grafica del boton sanciones', error);
            // Combina el mensaje de error y detalles del error en una sola respuesta
            res.status(500).send(`Error al obtener los datos para el llenado de la grafica sanciones: ${error.message}`);
        }
    };
    