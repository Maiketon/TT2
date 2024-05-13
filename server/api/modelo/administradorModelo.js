
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
            
            // Consulta para obtener la suma de TIEMPO_TOTAL_CHAT
            const [sumatiempozg] = await promesadb.query(
                'SELECT SUM(TIEMPO_TOTAL_CHAT) AS sumatiempozg FROM comunicacionzg;'
            );
            
            // Consulta para obtener el total de emparejamientos
            const [totalemparejamiento] = await promesadb.query(
                'SELECT COUNT(*) AS totalemparejamiento FROM emparejamiento;'
            );
            
            // Consulta para obtener la suma de usuarios con FK_ESTATUS 4 y 5, y también aquellos con 6
            const [totalusuarios] = await promesadb.query(
                `SELECT
                    SUM(CASE WHEN FK_ESTATUSUSUARIO IN (4, 5) THEN 1 ELSE 0 END) AS totalusuariosAyS,
                    SUM(CASE WHEN FK_ESTATUSUSUARIO = 6 THEN 1 ELSE 0 END) AS totalusuariosV
                 FROM informacionusuario;`
            );
    
            // Retornar un objeto con todos los resultados
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
    
}
module.exports = new modeloAdmin();

