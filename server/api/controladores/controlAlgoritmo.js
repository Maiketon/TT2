//IMPORTACIONES DEL MODELO//
const modeloAlgoritmo = require('../modelo/algoritmoModelo');

exports.algoritmoPrincipal = async (req, res) => {
    // Esta función manejará la solicitud para obtener el usuario principal y llamará al algoritmo
    try {
        
        // Suponiendo que recibes pkUsuarioPrincipal en los parámetros de consulta
        const { pkUsuarioPrincipal, banderaRol} = req.query;
        console.log("Esta es la bandera de rol");
        console.log(banderaRol);

        // Traer materias de conocimientos y deficiencias del usuario principal
        const datosusuarioPrincipal = await modeloAlgoritmo.obtenerUsuarioPrincipal({ pkUsuarioPrincipal });
        //console.log(datosusuarioPrincipal);

        //obtener cantidad dinamica

        // Obtener usuarios sin emparejamientos
        const listaUsuarios = await obtenerUsuariosDesdeTabla(pkUsuarioPrincipal);
        console.log("Esta es la combinacion ");
        console.log(listaUsuarios)


        const emparejamientos = await EmparejarUsuarios(datosusuarioPrincipal, listaUsuarios, banderaRol);

        // Para saber qué Rol ya no puede entrar a emparejamiento

        // (Aquí deberías llamar a la función correspondiente)

        res.status(200).json(emparejamientos);
    } catch (error) {
        // Manejar errores
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
    }
};

async function obtenerUsuariosDesdeTabla(pkUsuarioPrincipal) {

    try {
        const usuariosSinEmparejamientos = await modeloAlgoritmo.ObtenerUsuariosSinEmparejamientos({ pkUsuarioPrincipal });
        //console.log("Esta es la lista de usuarios sin emparejamiento ");
       // console.log(usuariosSinEmparejamientos);
        let cantidadActualizada = usuariosSinEmparejamientos.length;
       // console.log(cantidadActualizada);
        
        if (usuariosSinEmparejamientos.length <= 100) {
            console.log("No se encontraron usuarios o el número es menor o igual que 100");
            cantidadActualizada = 100 - cantidadActualizada;
            // Obtener usuarios con emparejamientos
            const usuariosConEmparejamientos = await modeloAlgoritmo.ObtenerUsuariosConEmparejamientos({ pkUsuarioPrincipal, cantidadActualizada });
            //console.log("Esta es la lista de usuarios con emparejamiento ");
            //console.log(usuariosConEmparejamientos);
            // Combinar usuarios con y sin emparejamientos
            const usuariosCombinados = usuariosSinEmparejamientos.concat(usuariosConEmparejamientos);
            return usuariosCombinados;
        } else {
            // Si hay más de 100 usuarios sin emparejamientos, devolver solo esos usuarios
            return usuariosSinEmparejamientos;
        }
        
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener usuarios sin emparejamientos.');
    }
}

async function EmparejarUsuarios(datosusuarioPrincipal, listaUsuarios, banderaRol) {
    try {
        let mejoresEmparejamientos = [];

        for (let i = 0; i < listaUsuarios.length; i++) {
            let candidato = listaUsuarios[i];
            let resultadoPuntuacion = await CalcularPuntuacion(datosusuarioPrincipal[0], candidato,banderaRol);
            let puntuacion = resultadoPuntuacion.puntuacion;
            let maxCoincidencias = resultadoPuntuacion.maxCoincidencias;
            let tipoCoincidencia = resultadoPuntuacion.tipoCoincidencia;

            // Verificar si el candidato tiene alguna coincidencia y maxCoincidencias no es igual a 0
            if (puntuacion > 0 ) {
                let emparejamiento = { candidato, puntuacion, maxCoincidencias, tipoCoincidencia };
                mejoresEmparejamientos.push(emparejamiento);
            }
        }

        // Ordenar por puntuación de forma descendente y luego por número máximo de coincidencias
        mejoresEmparejamientos.sort((a, b) => {
            if (a.puntuacion !== b.puntuacion) {
                return b.puntuacion - a.puntuacion;
            } else {
                return b.maxCoincidencias - a.maxCoincidencias;
            }
        });

        // Devolver los 10 mejores emparejamientos
        console.log("Estos son los 10 mejores emparejamientos");
        console.log(mejoresEmparejamientos.slice(0, 10));
        return mejoresEmparejamientos.slice(0, 10);

    } catch (error) {
        console.error(error);
        throw new Error('Error al emparejar usuarios.');
    }
}



async function CalcularPuntuacion(usuarioPrincipal, candidato, banderaRol) {
    try {
        let puntuacionAprendiz = 0;
        let puntuacionMentor = 0;
        let maxCoincidenciasAprendiz = 0;
        let maxCoincidenciasMentor = 0;
        let tipoCoincidencia = "";
        let puntuacion = 0;
        let puntuacionTotalAprendiz=0;
        let puntuacionTotalMentor=0;

        // Comparar las materias de deficiencia del usuario principal con las materias de enseñanza del candidato (Aprendiz)
        puntuacionAprendiz += [candidato.FK_ENSEÑANZA1, candidato.FK_ENSEÑANZA2, candidato.FK_ENSEÑANZA3].filter(
            enseñanzaCandidato => [usuarioPrincipal.MATERIADEF1, usuarioPrincipal.MATERIADEF2, usuarioPrincipal.MATERIADEF3].includes(enseñanzaCandidato)
        ).length;

        maxCoincidenciasAprendiz += [candidato.FK_ENSEÑANZA1, candidato.FK_ENSEÑANZA2, candidato.FK_ENSEÑANZA3].filter(
            enseñanzaCandidato => [usuarioPrincipal.MATERIADEF1, usuarioPrincipal.MATERIADEF2, usuarioPrincipal.MATERIADEF3].includes(enseñanzaCandidato)
        ).length;

        // Comparar las materias de enseñanza del usuario principal con las materias de deficiencia del candidato (Mentor)
        puntuacionMentor += [candidato.FK_DEFICIENCIA1, candidato.FK_DEFICIENCIA2, candidato.FK_DEFICIENCIA3].filter(
            deficienciaCandidato => [usuarioPrincipal.MATERIAENS1, usuarioPrincipal.MATERIAENS2, usuarioPrincipal.MATERIAENS3].includes(deficienciaCandidato)
        ).length;

        maxCoincidenciasMentor += [candidato.FK_DEFICIENCIA1, candidato.FK_DEFICIENCIA2, candidato.FK_DEFICIENCIA3].filter(
            deficienciaCandidato => [usuarioPrincipal.MATERIAENS1, usuarioPrincipal.MATERIAENS2, usuarioPrincipal.MATERIAENS3].includes(deficienciaCandidato)
        ).length;

        puntuacionTotalAprendiz=puntuacionAprendiz + candidato.CALIFICACION_MENTOR;
        puntuacionTotalMentor=puntuacionMentor + candidato.CALIFICACION_APRENDIZ;

        // Si no hay coincidencias en ninguna categoría, la puntuación es 0
        if (maxCoincidenciasAprendiz === 0 && maxCoincidenciasMentor === 0) {
            puntuacion = 0;
        } else {
            
            // Determinar el tipo de coincidencia
            if (candidato.ROL === 2) {
                tipoCoincidencia = "Aprendiz";
                if (maxCoincidenciasMentor === 0) {
                    puntuacion = 0;
                } else {
                    puntuacion = parseFloat(candidato.CALIFICACION_MENTOR) + puntuacionAprendiz;
                }
            } else if (candidato.ROL === 1) {
                tipoCoincidencia = "Mentor";
                if (maxCoincidenciasAprendiz === 0) {
                    puntuacion = 0;
                } else {
                    puntuacion = parseFloat(candidato.CALIFICACION_APRENDIZ) + puntuacionMentor;
                }
            } else {
            // Determinar el tipo de coincidencia
            if (puntuacionTotalAprendiz > puntuacionTotalMentor) {
                tipoCoincidencia = "Aprendiz";
                puntuacion = parseFloat(candidato.CALIFICACION_MENTOR) + puntuacionAprendiz;
            } else if (puntuacionTotalMentor > puntuacionTotalAprendiz) {
                tipoCoincidencia = "Mentor";
                puntuacion = parseFloat(candidato.CALIFICACION_APRENDIZ) + puntuacionMentor;
            } else {
                // Si hay igual número de coincidencias para Aprendiz y Mentor, asignar el tipo basado en la calificación
                if (parseFloat(candidato.CALIFICACION_APRENDIZ) > parseFloat(candidato.CALIFICACION_MENTOR) && candidato.ROL != 2) {
                    tipoCoincidencia = "Aprendiz";
                    puntuacion = parseFloat(candidato.CALIFICACION_MENTOR) + puntuacionAprendiz;
                } else {
                    tipoCoincidencia = "Mentor";
                    puntuacion = parseFloat(candidato.CALIFICACION_APRENDIZ) + puntuacionMentor;
                }
            }
        }
     }
     
     console.log("Este es el tipo de coincidencia");
        console.log(tipoCoincidencia);
        // Ajustar puntuación según la banderaRol
        if (banderaRol == 1 && tipoCoincidencia === "Aprendiz") {
            puntuacion = 0;

        } else if (banderaRol == 2 && tipoCoincidencia === "Mentor") {
            console.log("Entrou aqui al if de mentor");
            puntuacion = 0;
        }

        

        // Devolver puntuación, el número máximo de coincidencias y el tipo de coincidencia
        return { puntuacion, 
            maxCoincidencias: maxCoincidenciasAprendiz + maxCoincidenciasMentor, 
            tipoCoincidencia };
        
    } catch (error) {
        console.error(error);
        throw new Error('Error al calcular la puntuación.');
    }
}