const db = require('../../configuracion/dbconfiguracion'); //IMPORTAMOS LA CONEXION A LA BASE DE DATOS //

class modeloEmparejamiento{
    async obtenerNombresFortalezasDeficiencias(userPk){
        const sql = `
        SELECT
            CONCAT(NOMBRE, " ", APELLIDO_PATERNO, " ", APELLIDO_MATERNO) AS nombreCompleto,
            m1.NOMBRE_MATERIA AS NOMBRE_DEFICIENCIA1,
            m2.NOMBRE_MATERIA AS NOMBRE_DEFICIENCIA2,
            m3.NOMBRE_MATERIA AS NOMBRE_DEFICIENCIA3,
            m4.NOMBRE_MATERIA AS NOMBRE_FORTALEZA1,
            m5.NOMBRE_MATERIA AS NOMBRE_FORTALEZA2,
            m6.NOMBRE_MATERIA AS NOMBRE_FORTALEZA3  
        FROM informacionusuario inf
        LEFT JOIN learnmatch.materia m1 ON inf.FK_DEFICIENCIA1 = m1.PK_MATERIA
        LEFT JOIN learnmatch.materia m2 ON inf.FK_DEFICIENCIA2 = m2.PK_MATERIA
        LEFT JOIN learnmatch.materia m3 ON inf.FK_DEFICIENCIA3 = m3.PK_MATERIA
        LEFT JOIN learnmatch.materia m4 ON inf.FK_ENSEÑANZA1 = m4.PK_MATERIA
        LEFT JOIN learnmatch.materia m5 ON inf.FK_ENSEÑANZA2 = m5.PK_MATERIA
        LEFT JOIN learnmatch.materia m6 ON inf.FK_ENSEÑANZA3 = m6.PK_MATERIA
        WHERE 
            FK_ESTATUSUSUARIO = 4
        AND
            PK_USUARIO != ?
        `;

        try {
            const promesadb = db.promise();
            const [result] = await promesadb.query(sql, [userPk]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async obtenerStrikes(userPk){
        const sql = `
            SELECT
	            COALESCE(REPORTADO, 0) AS REPORTADO
            FROM
	            informacionusuario
            WHERE
	            PK_USUARIO = ?;
        `;
        try {
            const promesadb= db.promise();
            const [strikes] = await promesadb.query(sql,[userPk]);
            return strikes;
        } catch (error) {
            
        }
    }



}


module.exports = new modeloEmparejamiento();