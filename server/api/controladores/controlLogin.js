//IMPORTACIONES DEL MODELO//
const modeloLogin = require('../modelo/loginModelo');

//CATALOGOS//
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const respuesta = await modeloLogin.login({ username, password });
        
        if (respuesta === "No existe ese correo") {
            res.status(404).send('El usuario no existe');
        } else if (respuesta === "Contraseña incorrecta") {
            const datos = {rol: 10};
            res.status(200).json(datos);
        } else if (respuesta === 7) {
            console.log("entro al 7");
           const datos = {rol: 7};
            res.status(200).json(datos);
        }
         else if (respuesta.length > 0 && respuesta[0].FK_ESTATUSUSUARIO > 0) {
            // Si la respuesta es un rol de usuario válido, enviar el código 200
            const datos = {
                rol: respuesta[0].FK_ESTATUSUSUARIO,
                pk: respuesta[0].PK_USUARIO
            };
            console.log(datos);
            res.status(200).json(datos);
        } else {
            // Si no se pudo determinar el rol del usuario, enviar el código 500
            res.status(500).send('Error en el servidor al obtener el usuario');
        }
    } catch (err) {
        console.error('Error realizando la consulta:', err);
        res.status(501).send('Error interno del servidor');
    }
};

exports.actualizarVerificacion = async (req, res) => {
    const { pkUsuario } = req.body;
    try {
        const respuesta = await modeloLogin.actualizarVerificacion({ pkUsuario });
        console.log(respuesta);
        
        if (respuesta === "No se encontro el usuario") {
            res.status(404).send('El usuario no existe');
        } else if (respuesta === "Ahora tu usario esta verificado") {
            // Si la actualización fue exitosa, enviar el código 200
            res.status(200).send('Actualización exitosa');
        } else {
            // Si no se pudo realizar la actualización, enviar el código 500
            res.status(500).send('Error en el servidor al actualizar el usuario');
        }
    } catch (err) {
        console.error('Error realizando la actualización:', err);
        res.status(501).send('Error interno del servidor');
    }
};