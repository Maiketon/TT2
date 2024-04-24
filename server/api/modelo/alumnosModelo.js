const db = require('../../configuracion/dbconfiguracion'); //IMPORTAMOS LA CONEXION A LA BASE DE DATOS //

class modeloAlumnos {
  //CATALOGO//
    async obtenerTodasLasMaterias() {
      try {
        const promesadb= db.promise();
        const [materias] = await promesadb.query('SELECT * FROM materia');
        return materias;
      } catch (err) {
        throw err;
      }
    }
    
    // Aquí  agregar mas metodos si necesitamos otras operaciones en la tabla de 'materia'
      async guardarNuevoAlumno({ carrera, semestre, nombres, apellidoP, apellidoM, correo, password }) {
        const sql = 
      'INSERT INTO informacionusuario (FK_ESTATUSUSUARIO, FECHA_CREACION, NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, EMAIL, PSW, CARRERA, SEMETRE) VALUES (1, NOW(), ?, ?, ?, ?, ?, ?, ?)';
        try {
            const promesadb = db.promise();
            const [resultado] = await promesadb.query(sql, [nombres, apellidoP, apellidoM, correo, password, carrera, semestre]);
            return resultado.insertId;
        } catch (err) {
            throw err;
        }
    }

      async actualizarEstatusUsuario(correo,usuarioId) {
          const sql = 'UPDATE informacionusuario SET FK_ESTATUSUSUARIO = 2 WHERE EMAIL = ? AND PK_USUARIO= ?';
          try {
              const promesadb = db.promise();
              const [resultado] = await promesadb.query(sql, [correo,usuarioId]);
              return resultado.affectedRows;
          } catch (err) {
              throw err;
          }
      }

      //Recuperar Contraseña //
      async verificarRegistroCorreo (correo)
      {
          const sql= 'SELECT PK_USUARIO, NOMBRE FROM informacionusuario WHERE EMAIL = ?';
          try {
            const promesadb = db.promise();
            const [resultadopk] = await promesadb.query(sql,[correo]);
            if (resultadopk.length===0)
            {
              return {existe:false,pk:0}
            }
            else{
              return {existe:true,pk:resultadopk[0].PK_USUARIO,nombres:resultadopk[0].NOMBRE};  
            }
          } catch (err) {
            throw err;
          }
      }

      async escribirNuevaPass (passNueva,pkUsuario)
      {
        const sql = 'UPDATE informacionusuario SET PSW = ? WHERE PK_USUARIO= ?';
        try {
          const promesadb = db.promise();
          const [resultado] = await promesadb.query(sql, [passNueva,pkUsuario]);
          return resultado.affectedRows;
        } catch (err) {
          throw err;
        }
      }
      

      async guardarPreferenciasAcademicas (pkUsuario,selecciones)
      {
        const sql = `
        UPDATE informacionusuario 
        SET 
          FK_DEFICIENCIA1 = ?, 
          FK_DEFICIENCIA2 = ?, 
          FK_DEFICIENCIA3 = ?, 
          FK_ENSEÑANZA1 = ?, 
          FK_ENSEÑANZA2 = ?, 
          FK_ENSEÑANZA3 = ? ,
          CALIFICACION = 5,
          FK_ESTATUSUSUARIO = 4
        WHERE PK_USUARIO = ?
      `;
      try {
        const promesadb = db.promise();  // Asumiendo que `db` es tu conexión a la base de datos configurada con mysql2
        const [resultado] = await promesadb.query(sql, [
          selecciones.seleccion1,  // Mapea a FK_DEFICIENCIA1
          selecciones.seleccion2,  // Mapea a FK_DEFICIENCIA2
          selecciones.seleccion3,  // Mapea a FK_DEFICIENCIA3
          selecciones.seleccion4,  // Mapea a FK_ENSEÑANZA1
          selecciones.seleccion5,  // Mapea a FK_ENSEÑANZA2
          selecciones.seleccion6,  // Mapea a FK_ENSEÑANZA3
          pkUsuario                // PK del usuario para la cláusula WHERE
        ]);
        return resultado.affectedRows; // Retorna el número de filas afectadas
      } catch (err) {
        throw err; // Propaga cualquier error que ocurra
      }
      }

      



      
  }

  module.exports = new modeloAlumnos();
