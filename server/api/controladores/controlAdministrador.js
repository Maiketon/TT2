
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
            
            res.status(500).send(`Error al obtener los datos para el llenado de la grafica sanciones: ${error.message}`);
        }
    };

    exports.datosGraficaEmparejamiento = async (req, res) => 
    {
        try {
            const graficaBotonEmparejamientos = await modeloAdmin.datosGraficaEmparejamientos();
            console.log(graficaBotonEmparejamientos);
            res.status(200).json(graficaBotonEmparejamientos);
        } catch (error) {
            console.error('Error al obtener los datos para la grafica del boton Emparejamiento', error);
            res.status(500).send(`Error al obtener los datos para el llenado de la grafica Total emparejamiento: ${error.message}`);
        }
    };


    exports.datosGraficaMaterias = async (req,res)=>
        {
            try 
            {
                const graficaBotonMaterias = await modeloAdmin.datosGraficaMaterias();
                console.log(graficaBotonMaterias);
                res.status(200).json(graficaBotonMaterias);
            } catch (error) 
            {
                console.error('Error al obtener los datos para la grafica del boton materias');
                res.status(500).send('Error al obtener los datos para el llenado de la grafica radial de materias',error);
            }
        };
    

    exports.datosGraficaCalificaciones = async (req,res) => 
            {
                try {
                    const graficaBotonCalif = await modeloAdmin.datosGraficaCalificaciones();
                    console.log(graficaBotonCalif);
                    res.status(200).json(graficaBotonCalif);
                } catch (error) 
                {
                 console.error('Error al obtener los datos para la grafica del boton de calificaciones');
                 res.status(500).send('Error al obtener los datos para el llenado de la grafica pastel compuesta', error);
                }
            };
    exports.datosGraficaLogros= async (req,res)=>
        {
            try {
                const graficaBotonLogros = await modeloAdmin.datosGraficaLogros();
                console.log(graficaBotonLogros);
                res.status(200).json(graficaBotonLogros);
            } catch (error) {
                console.error('Error al obtener los datos para la grafica del boton de Logros/Medallas');
                 res.status(500).send('Error al obtener los datos para el llenado de la grafica de dona para medallas', error);
                
            }
        };