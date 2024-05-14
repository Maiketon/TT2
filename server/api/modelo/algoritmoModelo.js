const db = require('../../configuracion/dbconfiguracion'); //IMPORTAMOS LA CONEXION A LA BASE DE DATOS //

class modeloAlgoritmo {
     // Se obtienen las materias de conocimientos y deficienciias del usuario principal
     async obtenerUsuarioPrincipal({ pkUsuarioPrincipal}) {
        const promesadb = db.promise();
        const sql1 = 'SELECT FK_DEFICIENCIA1 AS MATERIADEF1, FK_DEFICIENCIA2 AS MATERIADEF2, FK_DEFICIENCIA3 AS MATERIADEF3, FK_ENSEÑANZA1 AS MATERIAENS1, FK_ENSEÑANZA2 AS MATERIAENS2, FK_ENSEÑANZA3 AS MATERIAENS3 FROM informacionusuario WHERE PK_USUARIO = ?';
        try {
            // Realizar la consulta para obtener todos los registros asociados al correo
            const [resultado1] = await promesadb.query(sql1, [pkUsuarioPrincipal]);
            return resultado1;
            
        } catch (err) {
            throw err;
        }
    }
//Funcion que obtiene cuantos emparejamientos tiene el usuario principal para usar como filtro mas adelante
async  ObtenerUsuariosSinEmparejamientos({ pkUsuarioPrincipal }) {
    const promesadb = db.promise();
    const sql = `
        SELECT 
            CONCAT(NOMBRE, " ", APELLIDO_PATERNO, " ", APELLIDO_MATERNO) AS nombreCompleto,
            PK_USUARIO,
            FK_DEFICIENCIA1,
            FK_DEFICIENCIA2,
            FK_DEFICIENCIA3,
            FK_ENSEÑANZA1,
            FK_ENSEÑANZA2,
            FK_ENSEÑANZA3,
            m1.NOMBRE_MATERIA AS NOMBRE_DEFICIENCIA1,
            m2.NOMBRE_MATERIA AS NOMBRE_DEFICIENCIA2,
            m3.NOMBRE_MATERIA AS NOMBRE_DEFICIENCIA3,
            m4.NOMBRE_MATERIA AS NOMBRE_ENSEÑANZA1,
            m5.NOMBRE_MATERIA AS NOMBRE_ENSEÑANZA2,
            m6.NOMBRE_MATERIA AS NOMBRE_ENSEÑANZA3,
            CALIFICACION,
            CALIFICACION_MENTOR,
            CALIFICACION_APRENDIZ,
            FK_ESTATUSUSUARIO,
            0 AS ROL
        FROM 
            informacionusuario AS iu
            LEFT JOIN materia AS m1 ON iu.FK_DEFICIENCIA1 = m1.PK_MATERIA
            LEFT JOIN materia AS m2 ON iu.FK_DEFICIENCIA2 = m2.PK_MATERIA
            LEFT JOIN materia AS m3 ON iu.FK_DEFICIENCIA3 = m3.PK_MATERIA
            LEFT JOIN materia AS m4 ON iu.FK_ENSEÑANZA1 = m4.PK_MATERIA
            LEFT JOIN materia AS m5 ON iu.FK_ENSEÑANZA2 = m5.PK_MATERIA
            LEFT JOIN materia AS m6 ON iu.FK_ENSEÑANZA3 = m6.PK_MATERIA
        WHERE 
            (FK_ESTATUSUSUARIO = 4)
            AND PK_USUARIO != ?
            AND NOT EXISTS (
                SELECT 1 
                FROM emparejamiento AS e 
                WHERE e.FK_USUARIO1 = iu.PK_USUARIO OR e.FK_USUARIO2 = iu.PK_USUARIO
            )
    `;
    try {
        // Realizar la consulta para obtener todos los registros asociados al correo
        const [resultado1] = await promesadb.query(sql, [pkUsuarioPrincipal]);
        return resultado1;
    } catch (err) {
        throw err;
    }
}


  async ObtenerUsuariosConEmparejamientos({pkUsuarioPrincipal, cantidadActualizada}) {
    const promesadb = db.promise();
    const sql = `SELECT 
    CONCAT(iu.NOMBRE, " ", iu.APELLIDO_PATERNO, " ", iu.APELLIDO_MATERNO) AS nombreCompleto,
    iu.PK_USUARIO,
    iu.FK_DEFICIENCIA1,
    iu.FK_DEFICIENCIA2,
    iu.FK_DEFICIENCIA3,
    iu.FK_ENSEÑANZA1,
    iu.FK_ENSEÑANZA2,
    iu.FK_ENSEÑANZA3,
    m1.NOMBRE_MATERIA AS NOMBRE_DEFICIENCIA1,
    m2.NOMBRE_MATERIA AS NOMBRE_DEFICIENCIA2,
    m3.NOMBRE_MATERIA AS NOMBRE_DEFICIENCIA3,
    m4.NOMBRE_MATERIA AS NOMBRE_ENSEÑANZA1,
    m5.NOMBRE_MATERIA AS NOMBRE_ENSEÑANZA2,
    m6.NOMBRE_MATERIA AS NOMBRE_ENSEÑANZA3,
    iu.CALIFICACION,
    iu.CALIFICACION_MENTOR,
    iu.CALIFICACION_APRENDIZ,
    iu.FK_ESTATUSUSUARIO,
    (CASE 
        WHEN (SUM(CASE WHEN (e.FK_USUARIO1 = iu.PK_USUARIO AND e.ROL_USUARIO1 = 1) THEN 1 ELSE 0 END) + 
              SUM(CASE WHEN (e.FK_USUARIO2 = iu.PK_USUARIO AND e.ROL_USUARIO2 = 1) THEN 1 ELSE 0 END)) = 2 THEN 1
        WHEN (SUM(CASE WHEN (e.FK_USUARIO1 = iu.PK_USUARIO AND e.ROL_USUARIO1 = 2) THEN 1 ELSE 0 END) + 
              SUM(CASE WHEN (e.FK_USUARIO2 = iu.PK_USUARIO AND e.ROL_USUARIO2 = 2) THEN 1 ELSE 0 END)) = 2 THEN 2
        ELSE 0
    END) AS ROL
FROM 
    informacionusuario AS iu
JOIN 
    emparejamiento AS e ON iu.PK_USUARIO = e.FK_USUARIO1 OR iu.PK_USUARIO = e.FK_USUARIO2
    LEFT JOIN 
    materia AS m1 ON iu.FK_DEFICIENCIA1 = m1.PK_MATERIA
LEFT JOIN 
    materia AS m2 ON iu.FK_DEFICIENCIA2 = m2.PK_MATERIA
LEFT JOIN 
    materia AS m3 ON iu.FK_DEFICIENCIA3 = m3.PK_MATERIA
LEFT JOIN 
    materia AS m4 ON iu.FK_ENSEÑANZA1 = m4.PK_MATERIA
LEFT JOIN 
    materia AS m5 ON iu.FK_ENSEÑANZA2 = m5.PK_MATERIA
LEFT JOIN 
    materia AS m6 ON iu.FK_ENSEÑANZA3 = m6.PK_MATERIA
WHERE 
    (iu.FK_ESTATUSUSUARIO = 4)
    AND iu.PK_USUARIO != ?
    AND e.FK_ESTADOEMPAREJAMIENTO IN (1, 3)
GROUP BY 
    iu.PK_USUARIO
HAVING 
    ((SUM(CASE WHEN (e.FK_USUARIO1 = iu.PK_USUARIO AND e.ROL_USUARIO1 = 1) THEN 1 ELSE 0 END) + 
      SUM(CASE WHEN (e.FK_USUARIO2 = iu.PK_USUARIO AND e.ROL_USUARIO2 = 1) THEN 1 ELSE 0 END)) <> 2 
    OR 
    (SUM(CASE WHEN (e.FK_USUARIO1 = iu.PK_USUARIO AND e.ROL_USUARIO1 = 2) THEN 1 ELSE 0 END) + 
     SUM(CASE WHEN (e.FK_USUARIO2 = iu.PK_USUARIO AND e.ROL_USUARIO2 = 2) THEN 1 ELSE 0 END)) <> 2)
    AND
    NOT EXISTS (
        SELECT 1
        FROM emparejamiento AS e2
        WHERE (e2.FK_USUARIO1 = iu.PK_USUARIO OR e2.FK_USUARIO2 = iu.PK_USUARIO)
            AND e2.FK_ESTADOEMPAREJAMIENTO IN (1, 3)
            AND (e2.FK_USUARIO1 = ? OR e2.FK_USUARIO2 = ?)
    )
LIMIT ?
`;
    try {
        // Realizar la consulta para obtener todos los registros asociados al correo
        const [resultado1] = await promesadb.query(sql, [pkUsuarioPrincipal, pkUsuarioPrincipal, pkUsuarioPrincipal, cantidadActualizada]);
        return resultado1;
        
    } catch (err) {
        throw err;
    }
}
}
  module.exports = new modeloAlgoritmo();