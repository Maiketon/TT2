const db = require('../../configuracion/dbconfiguracion'); //IMPORTAMOS LA CONEXION A LA BASE DE DATOS //
const tranportadorEmail = require ('../../configuracion/emailConfig'); //Obtenemos el acceso al correo electronico//

class modeloLogin {
     // Aquí  agregar mas metodos si necesitamos otras operaciones en la tabla de 'materia'
     async login({ username, password }) {
        const sql1 = 'SELECT PK_USUARIO FROM informacionusuario WHERE EMAIL = ?';
        const promesadb = db.promise();
    
        try {
            // Realizar la primera consulta para obtener el PK_USUARIO
            const [resultado1] = await promesadb.query(sql1, [username]);
    
            // Si se encontró un registro con el correo proporcionado
            if (resultado1.length > 0) {
                const pkUsuario = resultado1[0].PK_USUARIO;
    
                // Consulta para obtener el rol del usuario
                const sql2 = 'SELECT FK_ESTATUSUSUARIO, PK_USUARIO FROM informacionusuario WHERE EMAIL = ? AND PSW = ? AND PK_USUARIO = ?';
                const [resultado2] = await promesadb.query(sql2, [username, password, pkUsuario]);
                
                // Si la contraseña coincide con el correo proporcionado
                if (resultado2.length > 0) {
                    //const rol = resultado2[0].FK_ESTATUSUSUARIO;
                    //console.log(rol);
                    //console.log("No paso al catch");
                    return resultado2;
                    //return rol; // Devolver el rol del usuario
                } else {
                    return "Contraseña incorrecta";
                }
            } else {
                return "No existe ese correo";
            }
        } catch (err) {
            throw err;
        }
    }


    async actualizarVerificacion({pkUsuario}) {
        console.log("este es el pkUsuario: "+pkUsuario);
        const sql1 = 'UPDATE informacionusuario SET FK_ESTATUSUSUARIO = 3  WHERE PK_USUARIO = ?';
        const promesadb = db.promise();
        
        try {
            // Realizar la primera consulta para obtener el PK_USUARIO
            const [resultado] = await promesadb.query(sql1, [pkUsuario]);
    
            if (resultado.affectedRows > 0) {
                // La actualización fue exitosa
                return "Ahora tu usario esta verificado";
            } else {
                // No se encontró el usuario para actualizar
                return "No se encontró el usuario";
            }
        } catch (err) {
            throw err;
        }
    }
    
    
  }

  module.exports = new modeloLogin();