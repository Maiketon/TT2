const db = require('../../configuracion/dbconfiguracion');
exports.obtenerTodasLasMaterias = (req, res) => {
   
    db.query('SELECT * FROM materia', (err, materias) => {
        if (err) {
            res.status(500).send('Error en el servidor al obtener las materias');
         //   console.error('Error realizando la consulta:', err);
        } else {
           // console.log('Resultados de la consulta:', materias);
            res.status(200).json(materias);
        }
    });
};