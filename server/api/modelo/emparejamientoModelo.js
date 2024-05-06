const db = require('../../configuracion/dbconfiguracion'); //IMPORTAMOS LA CONEXION A LA BASE DE DATOS //

class modeloEmparejamiento{
    async obtenerNombres(userPk) {
        const sql = `
        SELECT
        CONCAT(NOMBRE, " ", APELLIDO_PATERNO, " ", APELLIDO_MATERNO)
        AS nombreCompleto 
        FROM informacionusuario
        WHERE PK_USUARIO != ?
        `;

        try {
          const promesadb= db.promise();
          const [nombres] = await promesadb.query(sql,[userPk]);
          return nombres;
        } catch (err) {
          throw err;
        }
    }


    async obtenerDeficiencias(userPk){
        const sql = `
        SELECT
            m1.NOMBRE_MATERIA AS NOMBRE_DEFICIENCIA1,
            m2.NOMBRE_MATERIA AS NOMBRE_DEFICIENCIA2,
            m3.NOMBRE_MATERIA AS NOMBRE_DEFICIENCIA3
        FROM 
            learnmatch.informacionusuario inf
        LEFT JOIN learnmatch.materia m1 ON inf.FK_DEFICIENCIA1 = m1.PK_MATERIA
        LEFT JOIN learnmatch.materia m2 ON inf.FK_DEFICIENCIA2 = m2.PK_MATERIA
        LEFT JOIN learnmatch.materia m3 ON inf.FK_DEFICIENCIA3 = m3.PK_MATERIA 
        WHERE 
            PK_USUARIO != ?
        `;

        try {
          const promesadb= db.promise();
          const [deficiencias] = await promesadb.query(sql,[userPk]);
          return deficiencias;
        } catch (err) {
          throw err;
        }
    }
    
    async obtenerFortalezas(userPk){
        const sql = `
        SELECT
            m1.NOMBRE_MATERIA AS NOMBRE_FORTALEZA1,
            m2.NOMBRE_MATERIA AS NOMBRE_FORTALEZA2,
            m3.NOMBRE_MATERIA AS NOMBRE_FORTALEZA3
        FROM 
            learnmatch.informacionusuario inf
        LEFT JOIN learnmatch.materia m1 ON inf.FK_ENSEÑANZA1 = m1.PK_MATERIA
        LEFT JOIN learnmatch.materia m2 ON inf.FK_ENSEÑANZA2 = m2.PK_MATERIA
        LEFT JOIN learnmatch.materia m3 ON inf.FK_ENSEÑANZA3 = m3.PK_MATERIA
        WHERE 
            PK_USUARIO != ?
        `;

        try {
          const promesadb= db.promise();
          const [fortalezas] = await promesadb.query(sql,[userPk]);
          return fortalezas;
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