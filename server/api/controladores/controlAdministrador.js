
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

exports.obtenerNombreMaterias = async (req,res) => 
    {
        try {
            const nombreMaterias = await modeloAdmin.obtenerPkNombreMaterias();
            console.log(nombreMaterias);
            res.status(200).json(nombreMaterias);
        } catch (error) {
            console.error('Error al obtener el catalogo de materias');
            res.status(500).send('Error al obtener las materias en componente dinamico infouser', error);
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



        exports.obtenerUsuariosFiltrados = async (req, res) => {
            try {
                console.log(req.body);
                const { estatus, pkusuario, carrera, semestre, calf, medallaEs } = req.body;
                const resultado = await modeloAdmin.obtenerUsuariosFiltrados({ estatus, pkusuario, carrera, semestre, calf, medallaEs });
                res.json({
                    success: true,
                    data: resultado
                });
                console.log(resultado);
            } catch (error) {
                console.error('Error en el controlador al obtener usuarios filtrados', error);
                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor'
                });
            }
        };

        exports.reportesUsuarios  = async (req, res) =>
        {
            try {
                const resultado = await modeloAdmin.obtenerUsuariosReportes();
                console.log(resultado); // Imprime los datos en la consola del servidor
                res.status(200).json(resultado);
            } catch (error) {
                console.error('Error al obtener los datos para el componente de usuarios reportados');
                 res.status(500).send('Error al obtener los datos de usuarios reportados', error);
                
            }
        };


        exports.sancionAlumno = async (req,res) =>
            {
                const {pkReporte,pkusuario} = req.body;
                try {
                    const resultado = await modeloAdmin.sancionAlumno({pkReporte,pkusuario});
                    res.status(201).send('Usuario sancionado correctamente');
                } catch (error) {
                    console.error('Error al sancionar al alumno',error);
                    res.status(500).send('Error al enviar la peticion de sancion');
                }
            };

        exports.omitirReporte = async (req,res)=>
            {
                const {pkReporte} = req.body;
                try {
                    const resultado = await modeloAdmin.omitirR({pkReporte});
                    res.status(201).send('Reporte omitido Correctamente');
                } catch (error) {
                    console.error('Error al omitir el reporte',error);
                    res.status(500).send('Error al enviar la peticion de omitir');
                }
            };
        
    
        exports.vetarAlumnoPk= async (req,res)=> 
            {
                const {pkReporte,pkusuario}= req.body
                try {
                    const resultado = await modeloAdmin.vetar({pkReporte,pkusuario});
                    res.status(201).send('Usuario Eliminado correctamente');
                } catch (error) {
                    console.error('Error al vetar al alumno',error);
                    res.status(500).send('Error al enviar la peticion de vetado');
                }
            };