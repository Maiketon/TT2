import React, {useState, useEffect} from "react";
import { Container,Form} from "react-bootstrap";
import axios from "axios";
import EstadoFeliz from "../VistasPrincipal/Utils/Sonrisa.png";
import EstadoTriste from "../VistasPrincipal/Utils/Triste.png";
import './Css/FormularioPreferencias.css'

const PreferenciasAcademicas = () => {
    //Logica para los checkbox de la modal de materias
    const [materias, setMaterias] = useState([]);
    const [seleccionIzquierda, setSeleccionIzquierda] = useState([]);
    const [seleccionDerecha, setSeleccionDerecha] = useState([]);
    const [deshabilitado, setDeshabilitado] = useState([]);
    // Obtener materias del backend
  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/alumnos/materias');
        setMaterias(response.data);
        // Inicializar los estados basados en los datos recibidos
        setSeleccionIzquierda(new Array(response.data.length).fill(false));
        setSeleccionDerecha(new Array(response.data.length).fill(false));
        setDeshabilitado(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error('Error al obtener las materias', error);
      }
    };

    fetchMaterias();
  }, []);
    const ActualizarEstado = (indice, columna) => {
        // Actualiza las selecciones y la deshabilitación basada en la columna y el índice
        if (columna === "izquierda") {
            const seleccionados = seleccionIzquierda.filter(seleccion => seleccion).length; //VERIFICO CUANTOS CHECKBOX HAN SIDO SELECCIONADOS//
            if (!seleccionIzquierda[indice] && seleccionados>=3)
            {
                return; //Si se pasa no permito que siga seleccionando mas
            }

            const nuevaSeleccionIzquierda = [...seleccionIzquierda];
            nuevaSeleccionIzquierda[indice] = !nuevaSeleccionIzquierda[indice];
            setSeleccionIzquierda(nuevaSeleccionIzquierda);

            // Cambia la deshabilitación solo si se está marcando el checkbox
            setDeshabilitado(deshabilitado.map((item, i) => i === indice ? nuevaSeleccionIzquierda[indice] : item));
        } else {
            //MISMA LOGICA LA COLUMNA DERECHA //
            const seleccionados = seleccionDerecha.filter(seleccion => seleccion).length;
        if (!seleccionDerecha[indice] && seleccionados >= 3) {
            return;   //Si se pasa no permito que siga seleccionando mas
        }
            const nuevaSeleccionDerecha = [...seleccionDerecha];
            nuevaSeleccionDerecha[indice] = !nuevaSeleccionDerecha[indice];
            setSeleccionDerecha(nuevaSeleccionDerecha);

            // Cambia la deshabilitación solo si se está marcando el checkbox
            setDeshabilitado(deshabilitado.map((item, i) => i === indice ? nuevaSeleccionDerecha[indice] : item));
        }
    };

    const crearCheckboxes = (seleccion, columna) => {
        return materias.map((materia, indice) => (
          <Form.Check
            type="checkbox"
            label={materia.NOMBRE_MATERIA}
            key={`${columna}-${materia.PK_MATERIA}`}
            id={`checkbox-${columna}-${materia.PK_MATERIA}`}
            checked={seleccion[indice]}
            onChange={() => ActualizarEstado(indice, columna)}
            disabled={deshabilitado[indice] && !seleccion[indice]}
          />
        ));
      };
     return (
        <>
    <div>
                <div className="card text-center margen_superior">
                    <div className="card-header">
                        Selecciona tus &aacute;reas acad&eacute;micas
                    </div>
                    <div className="card-body">
                        <Container>
                            <Form>
                                <p>Con base a tu criterio, selecciona 3 &aacute;reas acad&eacute;micas en las que consideres que tienes
                                    deficiencias y 3 opciones acad&eacute;micas en las que posees un dominio que te gustar&iacute;a
                                    compartir con los dem&aacute;s.
                                </p>
                                <div className="formulario_preferencias">
                                    <section  className="columna">
                                        <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
                                            <strong>DEFICIENCIAS</strong>
                                            <img
                                                src={EstadoTriste}
                                                width={100}
                                                height={100}
                                            
                                                style ={{borderRadius: "50%"}}
                                                alt="Deficiencia"
                                                />
                                        </div>
                                        <div>
                                            {crearCheckboxes(seleccionIzquierda, 'izquierda')}
                                        </div>
                                    </section>
                                    <section className="columna">
                                        <div style={{ width: '1px', height: '100%', backgroundColor: 'lightgrey' }} />
                                    </section>
                                    <section className="columna">
                                        <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
                                            <strong>FORTALEZAS</strong>
                                            <img
                                                src={EstadoFeliz}
                                                width={100}
                                                height={100}
                                                
                                                style ={{borderRadius: "50%"}}
                                                alt="Fortaleza"
                                                />
                                        </div>
                                        <div>
                                        {crearCheckboxes(seleccionDerecha, 'derecha')}
                                        </div>
                                    </section>
                                </div>
                            </Form>
                        </Container>
                    </div>
                </div>
            </div>
        </>
     );
}

export default PreferenciasAcademicas;