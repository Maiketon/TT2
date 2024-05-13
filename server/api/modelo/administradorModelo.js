
const db = require('../../configuracion/dbconfiguracion');
class  modeloAdmin
{
    async obtenerEstatusUsuarios() {
        try {
          const promesadb= db.promise();
          const [estatusAlumno] = await promesadb.query('SELECT * FROM estatus WHERE PK_ESTATUS <> 8 AND PK_ESTATUS <> 3');
          return estatusAlumno;
        } catch (err) {
          throw err;
        }
      }


    async obtenerMedallasAlumnos () 
    {
        try {
            const promesadb= db.promise();
            const [medallasAlumno] = await promesadb.query('SELECT * FROM medallas');
            return medallasAlumno;
        } catch (error) {
            throw error;
        }
    }


    async obtenerRegistrosUsuarios() {
        try {
            const promesaDb = db.promise();
            const [informacionusuario] = await promesaDb.query('SELECT * FROM informacionusuario');
            return informacionusuario;
        } catch (err) {
            throw err;
        }
    }

    async datosGraficaUsoAplicacion() {
        try {
            const promesadb = db.promise();
            const [sumatiempozg] = await promesadb.query(
                'SELECT SUM(TIEMPO_TOTAL_CHAT) AS sumatiempozg FROM comunicacionzg;'
            );
            const [totalemparejamiento] = await promesadb.query(
                'SELECT COUNT(*) AS totalemparejamiento FROM emparejamiento;'
            );
            const [totalusuarios] = await promesadb.query(
                `SELECT
                    SUM(CASE WHEN FK_ESTATUSUSUARIO IN (4, 5) THEN 1 ELSE 0 END) AS totalusuariosAyS,
                    SUM(CASE WHEN FK_ESTATUSUSUARIO = 6 THEN 1 ELSE 0 END) AS totalusuariosV
                 FROM informacionusuario;`
            );
            return {
                sumatiempozg: sumatiempozg[0].sumatiempozg,
                totalemparejamiento: totalemparejamiento[0].totalemparejamiento,
                totalusuariosAyS: totalusuarios[0].totalusuariosAyS,
                totalusuarios6: totalusuarios[0].totalusuarios6
            };
        } catch (error) {
            throw error;
        }
    }

    async datosGraficaSanciones() {
        try {
            const promesadb = db.promise();
            const [result] = await promesadb.query(`
            SELECT 
            CASE 
                WHEN SANCIONES = 3 THEN 'sanciones3'
                WHEN SANCIONES = 2 THEN 'sanciones2'
                WHEN SANCIONES = 1 THEN 'sanciones1'
                ELSE 'sanciones0'
            END AS CategoriaSanciones,
            COUNT(*) AS total
        FROM informacionusuario
        GROUP BY CategoriaSanciones
        ORDER BY CategoriaSanciones;
        
            `);
    
            // Formatea el resultado si es necesario
            const formattedResult = result.reduce((acc, cur) => {
                acc[cur.CategoriaSanciones] = cur.total; // Asegúrate de usar el nombre correcto de la columna
                return acc;
            }, {});
    
            return formattedResult;  // Devuelve un objeto con las categorías de sanciones como claves y los totales como valores
        } catch (error) {
            console.error('Error al obtener datos de sanciones:', error);
            throw error;  // Re-lanzar el error para manejo superior
        }
    }
    
    
    
    
}
module.exports = new modeloAdmin();

