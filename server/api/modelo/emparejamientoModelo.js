const db = require('../../configuracion/dbconfiguracion'); //IMPORTAMOS LA CONEXION A LA BASE DE DATOS //
const { use } = require('../../configuracion/emailConfig');

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
            WHERE (FK_USUARIO1 = ? AND FK_ESTADOEMPAREJAMIENTO IN (1, 3, 5))
                OR (FK_USUARIO2 = ? AND FK_ESTADOEMPAREJAMIENTO IN (1, 3, 5))
        `;
    
        try {
            const promesadb = db.promise();
            let bandera = 0; // Cambié const por let para poder cambiar el valor de bandera
            let totalEmparejamientos = 0;
    
            // Realizar la consulta para obtener todos los registros asociados al usuario
            const [resultado1] = await promesadb.query(sql1, [userPk, userPk, userPk, userPk, userPk, userPk]);
            
            // Obtener los totales de enseñantes y aprendices del resultado de la consulta
            const totalEnseñante = parseInt(resultado1[0].total_enseñante);
            const totalAprendiz = parseInt(resultado1[0].total_aprendiz);
            totalEmparejamientos = totalEnseñante + totalAprendiz;
    
            // Comprobar el rol según los totales obtenidos
            if (totalEnseñante === 2 && totalAprendiz === 2) {
                console.log("CUATRO EMPAREJAMIENTOS COMPLETOS");
                bandera = 3;
            } else if (totalEnseñante === 2) {
                console.log("ENSEÑANTE");
                bandera = 2;
            } else if (totalAprendiz === 2) {
                console.log("APRENDIZ");
                bandera = 1;
            } else if (
                (totalEnseñante === 0 && totalAprendiz === 0) ||
                (totalEnseñante === 0 && totalAprendiz === 1) ||
                (totalEnseñante === 1 && totalAprendiz === 0) ||
                (totalEnseñante === 1 && totalAprendiz === 1)
            ) {
                console.log("AUN PUEDE EMPAREJAR");
                bandera = 0;
            } else {
                console.log("VARIABLE NO RECONOCIDA");
            }
            console.log("totalEns: ", totalEnseñante, "totalApr: ", totalAprendiz);
            console.log("bandera: ", bandera);
            return { bandera, totalEmparejamientos, totalEnseñante, totalAprendiz };
        } catch (err) {
            throw err;
        }
    }


    async obtenerMentorActivo(userPk){
        const sql = `
        SELECT 
    CONCAT(inf.NOMBRE, " ", inf.APELLIDO_PATERNO, " ", inf.APELLIDO_MATERNO) AS nombreCompleto,
    emp.FK_ESTADOEMPAREJAMIENTO AS estado,
    emp.PK_EMPAREJAMIENTO,
    emp.FK_USUARIO1 AS PK_USERPAIRED,
    emp.ROL_USUARIO1 AS rol
FROM
    emparejamiento emp
INNER JOIN informacionusuario inf ON (emp.FK_USUARIO1 = inf.PK_USUARIO)
WHERE
    emp.ROL_USUARIO1 = 1
    AND emp.ROL_USUARIO2 = 2
    AND emp.FK_USUARIO2 = ?
    AND emp.FK_ESTADOEMPAREJAMIENTO != 2
        AND emp.FK_ESTADOEMPAREJAMIENTO != 4 -- Aquí se excluyen los registros con FK_ESTADOEMPAREJAMIENTO igual a 3
UNION
SELECT
    CONCAT(inf.NOMBRE, " ", inf.APELLIDO_PATERNO, " ", inf.APELLIDO_MATERNO) AS nombreCompleto,
    emp.FK_ESTADOEMPAREJAMIENTO AS estado,
    emp.PK_EMPAREJAMIENTO,
    emp.FK_USUARIO2 AS PK_USERPAIRED,
    emp.ROL_USUARIO2 AS rol
FROM
    emparejamiento emp
INNER JOIN informacionusuario inf ON (emp.FK_USUARIO2 = inf.PK_USUARIO)
WHERE
    emp.ROL_USUARIO2 = 1
    AND emp.ROL_USUARIO1 = 2
    AND emp.FK_USUARIO1 = ?
    AND emp.FK_ESTADOEMPAREJAMIENTO != 2
        AND emp.FK_ESTADOEMPAREJAMIENTO != 4;
        `;

        try {
            const promesadb = db.promise();
            const [result] = await promesadb.query(sql, [userPk,userPk]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async obtenerAprendizActivo(userPk){
        const sql = `
        SELECT 
        CONCAT(inf.NOMBRE, " ", inf.APELLIDO_PATERNO, " ", inf.APELLIDO_MATERNO) AS nombreCompleto,
        emp.FK_ESTADOEMPAREJAMIENTO AS estado,
        emp.PK_EMPAREJAMIENTO,
        emp.FK_USUARIO2 AS PK_USERPAIRED,
        emp.ROL_USUARIO2 AS rol
    FROM
        emparejamiento emp
    INNER JOIN informacionusuario inf ON (emp.FK_USUARIO2 = inf.PK_USUARIO)
    WHERE
        emp.ROL_USUARIO1 = 1
        AND emp.FK_USUARIO1 = ?
        AND emp.FK_ESTADOEMPAREJAMIENTO != 2
        AND emp.FK_ESTADOEMPAREJAMIENTO != 4 -- Aquí se excluyen los registros con FK_ESTADOEMPAREJAMIENTO igual a 3
    UNION
    SELECT
        CONCAT(inf.NOMBRE, " ", inf.APELLIDO_PATERNO, " ", inf.APELLIDO_MATERNO) AS nombreCompleto,
        emp.FK_ESTADOEMPAREJAMIENTO AS estado,
        emp.PK_EMPAREJAMIENTO,
        emp.FK_USUARIO1 AS PK_USERPAIRED,
        emp.ROL_USUARIO1 AS rol
    FROM
        emparejamiento emp
    INNER JOIN informacionusuario inf ON (emp.FK_USUARIO1 = inf.PK_USUARIO)
    WHERE
        emp.ROL_USUARIO2 = 1
        AND emp.FK_USUARIO2 = ?
        AND emp.FK_ESTADOEMPAREJAMIENTO != 2
        AND emp.FK_ESTADOEMPAREJAMIENTO != 4;
        `;

        try {
            const promesadb = db.promise();
            const [result] = await promesadb.query(sql, [userPk,userPk]);
            return result;
        } catch (err) {
            throw err;
        }
    }
    

    async ObtenerRechazos(usuarioPrincipalPK){
        const sql = `
        SELECT RECHAZOS FROM learnmatch.informacionusuario WHERE PK_USUARIO=?
        `;

        try {
            const promesadb = db.promise();
            const [result] = await promesadb.query(sql, [usuarioPrincipalPK]);
            return result;
        } catch (err) {
            throw err;
        }
    }


    async actualizarRechazos(numRechazos,usuarioPrincipalPK){
        const sql = `
        UPDATE learnmatch.informacionusuario SET RECHAZOS = ? WHERE (PK_USUARIO = ?)
        `;

        try {
            const promesadb = db.promise();
            const [result] = await promesadb.query(sql, [numRechazos,usuarioPrincipalPK]);
            return result;
        } catch (err) {
            throw err;
        }
    }
    
    async insertarRegistros(usuarioPrincipalPK,rolUsuarioPrincipal,usuarioCandidatoPK,rolUsuarioCandidato){
        const sql = `
        INSERT INTO learnmatch.emparejamiento 
        (FK_ESTADOEMPAREJAMIENTO, FK_USUARIO1, ROL_USUARIO1, FK_USUARIO2, ROL_USUARIO2) 
        VALUES ( 1, ?, ?, ?, ?);
        `;
    
        try {
            const promesadb = db.promise();
            const [result] = await promesadb.query(sql, [usuarioPrincipalPK,rolUsuarioPrincipal,usuarioCandidatoPK,rolUsuarioCandidato]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async obtenerPkaValidar(pkuserPaired,pkemparejamiento){
  
        const sql = `
        SELECT 
            CASE 
                WHEN EXISTS (
                    SELECT 1
                    FROM emparejamiento
                    WHERE FK_ESTADOEMPAREJAMIENTO = 1
                    AND PK_EMPAREJAMIENTO = ?
                    AND FK_USUARIO1 = ?
                ) THEN 1
                ELSE 0
            END AS bandera;
        `;

        try {
            const promesadb = db.promise();
            const result = await promesadb.query(sql, [pkemparejamiento,pkuserPaired]);
            const bandera = result[0][0].bandera;     
            return bandera;
        } catch (err) {
            throw err;
        }
    }

    async updateEmparejamiento(pkemparejamiento){
        const sql = `
        UPDATE learnmatch.emparejamiento SET FK_ESTADOEMPAREJAMIENTO = 3 WHERE PK_EMPAREJAMIENTO = ?;
        `;

        try {
            const promesadb = db.promise();
            const [result] = await promesadb.query(sql, [pkemparejamiento]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async saberEstado(pkemparejamiento){
        const sql = `
        SELECT FK_ESTADOEMPAREJAMIENTO FROM learnmatch.emparejamiento WHERE PK_EMPAREJAMIENTO = ?;
        `;

        try {
            const promesadb = db.promise();
            const [result] = await promesadb.query(sql, [pkemparejamiento]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async rechazarEmparejamiento(pkemparejamiento){
        //aQUI QUE HAGA UN DELETE
        const sql = `
        UPDATE learnmatch.emparejamiento SET FK_ESTADOEMPAREJAMIENTO = 4 WHERE PK_EMPAREJAMIENTO = ?;
        `;

        try {
            const promesadb = db.promise();
            const [result] = await promesadb.query(sql, [pkemparejamiento]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async preFinalizarEmparejamiento(pkemparejamiento){
        const sql = `
        UPDATE learnmatch.emparejamiento SET FK_ESTADOEMPAREJAMIENTO = 5 WHERE PK_EMPAREJAMIENTO = ?;
        `;

        try {
            const promesadb = db.promise();
            const [result] = await promesadb.query(sql, [pkemparejamiento]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async actualizarCalificacion(pkemparejamiento,userPk,promedio){
        const sql = `
            UPDATE emparejamiento
            SET 
                CALIFICACION_USUARIO1 = CASE WHEN FK_USUARIO1 = ? THEN ? ELSE CALIFICACION_USUARIO1 END,
                CALIFICACION_USUARIO2 = CASE WHEN FK_USUARIO2 = ? THEN ? ELSE CALIFICACION_USUARIO2 END
            WHERE 
                PK_EMPAREJAMIENTO = ?
            
        `;
        try {
            const promesadb = db.promise();
            const [result] = await promesadb.query(sql, [userPk,promedio,userPk,promedio,pkemparejamiento]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async obtenerCondicionEvaluacion(pkuserPaired,pkemparejamiento){
  
        const sql = `
        SELECT 
        CASE 
            WHEN FK_USUARIO1 = ? THEN
                CASE 
                    WHEN CALIFICACION_USUARIO2 IS NOT NULL THEN 4
                    ELSE 5
                END
            WHEN FK_USUARIO2 = ? THEN
                CASE 
                    WHEN CALIFICACION_USUARIO1 IS NOT NULL THEN 4
                    ELSE 5
                END
            ELSE 5
        END AS bandera
    FROM emparejamiento
    WHERE PK_EMPAREJAMIENTO = ? AND FK_ESTADOEMPAREJAMIENTO = 5;
        `;

        try {
            const promesadb = db.promise();
            const result = await promesadb.query(sql, [pkuserPaired, pkuserPaired, pkemparejamiento]);
            console.log("esta es desde el backend ",result);

            const bandera = result[0][0].bandera;     
            return bandera;
        } catch (err) {
            throw err;
        }
    }

}



module.exports = new modeloEmparejamiento();