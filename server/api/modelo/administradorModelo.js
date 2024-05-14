
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
                totalusuarios6: totalusuarios[0].totalusuariosV
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
    
    async datosGraficaEmparejamientos() {
        try {
            const promesadb = db.promise();
            // Asegúrate de que la consulta SQL esté correctamente formulada
            const [resultado] = await promesadb.query(`
                SELECT 
                
                    COUNT(*) AS registroTotalEmp,
                    SUM(CASE WHEN FK_ESTADOEMPAREJAMIENTO = 1 THEN 1 ELSE 0 END) AS registrosPendientes,
                    SUM(CASE WHEN FK_ESTADOEMPAREJAMIENTO = 2 THEN 1 ELSE 0 END) AS registrosFinalizados,
                    SUM(CASE WHEN FK_ESTADOEMPAREJAMIENTO = 3 THEN 1 ELSE 0 END) AS registrosActivos
                FROM 
                    emparejamiento;
            `);
    
            
            return resultado[0];
        } catch (error) {
            console.error('Error al obtener datos de emparejamientos:', error);
            throw error; // Re-lanzar el error para manejo superior
        }
    }
    async datosGraficaMaterias() {
        try {
            const promesadb = db.promise();
            const [resultado] = await promesadb.query(`
                SELECT 
                    m.PK_MATERIA,
                    m.NOMBRE_MATERIA,
                    COALESCE(SUM(CASE WHEN d.FK_DEFICIENCIA1 = m.PK_MATERIA OR d.FK_DEFICIENCIA2 = m.PK_MATERIA OR d.FK_DEFICIENCIA3 = m.PK_MATERIA THEN 1 ELSE 0 END), 0) AS Deficiencias,
                    COALESCE(SUM(CASE WHEN d.FK_ENSEÑANZA1 = m.PK_MATERIA OR d.FK_ENSEÑANZA2 = m.PK_MATERIA OR d.FK_ENSEÑANZA3 = m.PK_MATERIA THEN 1 ELSE 0 END), 0) AS Fortalezas
                FROM 
                    materia m
                    LEFT JOIN informacionusuario d ON (m.PK_MATERIA IN (d.FK_DEFICIENCIA1, d.FK_DEFICIENCIA2, d.FK_DEFICIENCIA3, d.FK_ENSEÑANZA1, d.FK_ENSEÑANZA2, d.FK_ENSEÑANZA3))
                GROUP BY 
                    m.PK_MATERIA,
                    m.NOMBRE_MATERIA
                ORDER BY 
                    m.PK_MATERIA;
            `);
            return resultado;
        } catch (error) {
            console.error('Error al obtener la suma total de deficiencias y fortalezas de cada materia:', error);
            throw error;
        }
    }


    async datosGraficaCalificaciones()
    {
        try {
            const promesadb=db.promise();
            const[resultado]= await promesadb.query(`SELECT
            SUM(CASE WHEN CALIFICACION >= 0.00 AND CALIFICACION <= 1.00 THEN 1 ELSE 0 END) AS UsuariosCalifGeneral_0_1,
            SUM(CASE WHEN CALIFICACION >= 1.1 AND CALIFICACION <= 2.00 THEN 1 ELSE 0 END) AS UsuariosCalifGeneral_1_2,
            SUM(CASE WHEN CALIFICACION >= 2.1 AND CALIFICACION <= 3.00 THEN 1 ELSE 0 END) AS UsuariosCalifGeneral_2_3,
            SUM(CASE WHEN CALIFICACION >= 3.1 AND CALIFICACION <= 4.00 THEN 1 ELSE 0 END) AS UsuariosCalifGeneral_3_4,
            SUM(CASE WHEN CALIFICACION >= 4.1 AND CALIFICACION <= 5.00 THEN 1 ELSE 0 END) AS UsuariosCalifGeneral_4_5,
            
            SUM(CASE WHEN CALIFICACION_MENTOR >= 0.00 AND CALIFICACION_MENTOR <= 1.00 THEN 1 ELSE 0 END) AS UsuariosCalifMentor_0_1,
            SUM(CASE WHEN CALIFICACION_MENTOR >= 1.1 AND CALIFICACION_MENTOR <= 2.00 THEN 1 ELSE 0 END) AS UsuariosCalifMentor_1_2,
            SUM(CASE WHEN CALIFICACION_MENTOR >= 2.1 AND CALIFICACION_MENTOR <= 3.00 THEN 1 ELSE 0 END) AS UsuariosCalifMentor_2_3,
            SUM(CASE WHEN CALIFICACION_MENTOR >= 3.1 AND CALIFICACION_MENTOR <= 4.00 THEN 1 ELSE 0 END) AS UsuariosCalifMentor_3_4,
            SUM(CASE WHEN CALIFICACION_MENTOR >= 4.1 AND CALIFICACION_MENTOR <= 5.00 THEN 1 ELSE 0 END) AS UsuariosCalifMentor_4_5,
            
            SUM(CASE WHEN CALIFICACION_APRENDIZ >= 0.00 AND CALIFICACION_APRENDIZ <= 1.00 THEN 1 ELSE 0 END) AS UsuariosCalifAprendiz_0_1,
            SUM(CASE WHEN CALIFICACION_APRENDIZ >= 1.1 AND CALIFICACION_APRENDIZ <= 2.00 THEN 1 ELSE 0 END) AS UsuariosCalifAprendiz_1_2,
            SUM(CASE WHEN CALIFICACION_APRENDIZ >= 2.1 AND CALIFICACION_APRENDIZ <= 3.00 THEN 1 ELSE 0 END) AS UsuariosCalifAprendiz_2_3,
            SUM(CASE WHEN CALIFICACION_APRENDIZ >= 3.1 AND CALIFICACION_APRENDIZ <= 4.00 THEN 1 ELSE 0 END) AS UsuariosCalifAprendiz_3_4,
            SUM(CASE WHEN CALIFICACION_APRENDIZ >= 4.1 AND CALIFICACION_APRENDIZ <= 5.00 THEN 1 ELSE 0 END) AS UsuariosCalifAprendiz_4_5  
          FROM
            informacionusuario;`);
            return resultado;
            
        } catch (error) {
            console.error('Error al obtener la suma de calificaciones por rol y general', error);
            throw error;
            
        }
    }

    async datosGraficaLogros()
    {
        try {
            const promesadb= db.promise();
            const [resultado] =await promesadb.query(`SELECT m.NOMBRE_MEDALLA, COUNT(*) AS Cantidad
            FROM controlmedallas c
            JOIN medallas m ON m.PK_MEDALLAS = c.FK_MEDALLA
            WHERE c.ESTADO = 1
            GROUP BY c.FK_MEDALLA, m.NOMBRE_MEDALLA
            ORDER BY c.FK_MEDALLA;`);
            return resultado;
        } catch (error) {
            console.error('Error al obtener la suma de las medallas obtenidas por los alumnos', error);
            throw error;
        }
    }
    
    
}
module.exports = new modeloAdmin();

