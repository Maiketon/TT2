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
            FK_ESTATUSUSUARIO IN (4, 5)
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

    async obtenerRolEmparejamiento(userPk) {
        const sql1 = `
            SELECT 
                SUM(CASE WHEN (FK_USUARIO1 = ? AND ROL_USUARIO1 = 1) THEN 1 ELSE 0 END +
                    CASE WHEN (FK_USUARIO2 = ? AND ROL_USUARIO2 = 1) THEN 1 ELSE 0 END) AS total_enseñante,
                SUM(CASE WHEN (FK_USUARIO1 = ? AND ROL_USUARIO1 = 2) THEN 1 ELSE 0 END +
                    CASE WHEN (FK_USUARIO2 = ? AND ROL_USUARIO2 = 2) THEN 1 ELSE 0 END) AS total_aprendiz
            FROM emparejamiento
            WHERE (FK_USUARIO1 = ? AND FK_ESTADOEMPAREJAMIENTO IN (1, 3))
                OR (FK_USUARIO2 = ? AND FK_ESTADOEMPAREJAMIENTO IN (1, 3))
        `;
    
        try {
            const promesadb = db.promise();
            let bandera = 0; // Cambié const por let para poder cambiar el valor de bandera
    
            // Realizar la consulta para obtener todos los registros asociados al usuario
            const [resultado1] = await promesadb.query(sql1, [userPk, userPk, userPk, userPk, userPk, userPk]);
            
            // Obtener los totales de enseñantes y aprendices del resultado de la consulta
            const totalEnseñante = parseInt(resultado1[0].total_enseñante);
            const totalAprendiz = parseInt(resultado1[0].total_aprendiz);
    
            // Comprobar si el usuario es APRENDIZ o ENSEÑANTE según los totales obtenidos
            if (totalEnseñante === 2 && totalAprendiz === 2) {
                
                console.log("CUATRO EMPAREJAMIENTOS COMPLETOS");
                bandera = 3;
            } else if (totalEnseñante === 2) {
                console.log("ENSEÑANTE");
                bandera = 2;
            }else if (totalAprendiz === 2 ) {
                console.log("APRENDIZ");
                bandera = 1;
            }else if ((totalEnseñante === 0 && totalAprendiz === 0) || (totalEnseñante === 0 && totalAprendiz === 1) || (totalEnseñante === 1 && totalAprendiz === 0) || (totalEnseñante === 1 && totalAprendiz === 1)) {
                console.log("AUN PUEDE EMPAREJAR");
                bandera = 0;
            }else {
                console.log("VARIABLE NO RECONOCIDA");
            
            }
            return bandera;
        } catch (err) {
            throw err;
        }
    }
    



}


module.exports = new modeloEmparejamiento();