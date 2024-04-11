const db = require('../../configuracion/dbconfiguracion'); //IMPORTAMOS LA CONEXION A LA BASE DE DATOS //
const tranportadorEmail = require ('../../configuracion/emailConfig'); //Obtenemos el acceso al correo electronico//

class modeloAlumnos {
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
        const sql = 'INSERT INTO informacionusuario (FK_ESTATUSUSUARIO, NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO, EMAIL, PSW, CARRERA, SEMETRE) VALUES (1, ?, ?, ?, ?, ?, ?, ?)';
        try {
            const promesadb = db.promise();
            const [resultado] = await promesadb.query(sql, [nombres, apellidoP, apellidoM, correo, password, carrera, semestre]);
            return resultado.insertId;
        } catch (err) {
            throw err;
        }
    }

      async actualizarEstatusUsuario(correo) {
          const sql = 'UPDATE informacionusuario SET FK_ESTATUSUSUARIO = 2 WHERE EMAIL = ?';
          try {
              const promesadb = db.promise();
              const [resultado] = await promesadb.query(sql, [correo]);
              return resultado.affectedRows;
          } catch (err) {
              throw err;
          }
      }
  }

  module.exports = new modeloAlumnos();

