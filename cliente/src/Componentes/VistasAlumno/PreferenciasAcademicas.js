import React, {useState, useEffect,useCallback } from "react";
import { Container,Form, Button,Modal} from "react-bootstrap";
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
        const response = await axios.get('https://201.124.154.2:3001/api/alumnos/materias');
        setMaterias(response.data);
        // Inicializar los estados basados en los datos recibidos
        setSeleccionIzquierda(response.data.map(materia => ({ seleccionado: false, pk: materia.PK_MATERIA })));
        setSeleccionDerecha(response.data.map(materia => ({ seleccionado: false, pk: materia.PK_MATERIA })));
        setDeshabilitado(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error('Error al obtener las materias', error);
      }
    };

    fetchMaterias();
  }, []);
    const ActualizarEstado = (indice, columna) => {
        const seleccionActual = columna === "izquierda" ? seleccionIzquierda : seleccionDerecha;
  const setSeleccion = columna === "izquierda" ? setSeleccionIzquierda : setSeleccionDerecha;

  // Contar cuántos checkboxes han sido seleccionados
  const seleccionados = seleccionActual.filter(seleccion => seleccion.seleccionado).length;
  if (!seleccionActual[indice].seleccionado && seleccionados >= 3) {
    return; // Si se excede el límite no permito que siga seleccionando más
  }

  // Actualizar el estado de selección del índice específico
  const nuevaSeleccion = seleccionActual.map((item, i) =>
    i === indice ? { ...item, seleccionado: !item.seleccionado } : item
  );

  // Actualizar el estado correspondiente
  setSeleccion(nuevaSeleccion);

  // Cambia la deshabilitación solo si se está marcando el checkbox
  setDeshabilitado(deshabilitado.map((item, i) => i === indice ? nuevaSeleccion[indice].seleccionado : item));
    };

    const crearCheckboxes = (seleccion, columna) => {
        if (!seleccion.length || !materias.length) {
            return <div>Cargando...</div>; // O maneja este estado adecuadamente
          }
        return materias.map((materia, indice) => (
          <Form.Check
          type="checkbox"
          label={materia.NOMBRE_MATERIA}
          key={`${columna}-${materia.PK_MATERIA}`}
          id={`checkbox-${columna}-${materia.PK_MATERIA}`}
          checked={seleccion[indice]?.seleccionado} // Uso seguro con optional chaining
          onChange={() => ActualizarEstado(indice, columna)}
          disabled={deshabilitado[indice] && !seleccion[indice]?.seleccionado} // Uso seguro con optional chaining
          />
        ));
      };
      //PONER LOS DATOS QUE EXISTEN EN BASE DE DATOS HASTA EL MOMENTO //
      const procesarPreferencias = useCallback((datosPreferencias) => {
        console.log('Datos de preferencias en procesarPreferencias:', datosPreferencias);
        console.log("Deficiencia 1", datosPreferencias.data.FK_DEFICIENCIA1);
        // Extrae los identificadores de las materias de las preferencias
        const seleccionesIzquierda = [
          datosPreferencias.data.FK_DEFICIENCIA1,
          datosPreferencias.data.FK_DEFICIENCIA2,
          datosPreferencias.data.FK_DEFICIENCIA3
        ];
      
        const seleccionesDerecha = [
          datosPreferencias.data.FK_ENSEÑANZA1,
          datosPreferencias.data.FK_ENSEÑANZA2,
          datosPreferencias.data.FK_ENSEÑANZA3
        ];
        console.log(seleccionesIzquierda);
        console.log(seleccionesDerecha);
        // No es necesario comprobar si son arrays ya que los estamos creando nosotros
        // a partir de los valores del objeto de preferencias.
      
        const setIzquierda = new Set(seleccionesIzquierda.map(String));
        const setDerecha = new Set(seleccionesDerecha.map(String));
      
        setSeleccionIzquierda(materias.map(materia => ({
          seleccionado: setIzquierda.has(String(materia.PK_MATERIA)),
          pk: materia.PK_MATERIA
        })));
      
        setSeleccionDerecha(materias.map(materia => ({
          seleccionado: setDerecha.has(String(materia.PK_MATERIA)),
          pk: materia.PK_MATERIA
        })));

        const nuevasDeshabilitado = materias.map(materia => {
            const pkMateriaString = String(materia.PK_MATERIA);
            return setIzquierda.has(pkMateriaString) || setDerecha.has(pkMateriaString);
          });
        
          setDeshabilitado(nuevasDeshabilitado);
      }, [materias]);
      
      // En el useEffect de cargar preferencias, puedes pasar directamente la data
      useEffect(() => {
        if (materias.length === 0) return;
      
        const cargarPreferencias = async () => {
          try {
            const userPk = sessionStorage.getItem('userPk');
            const resPreferencias = await axios.get(`https://201.124.154.2:3001/api/alumnos/obtenerPreferencias?pkUsuario=${userPk}`);
            console.log('Preferencias recibidas del backend:', resPreferencias.data);

            if (resPreferencias.data.success) {
              procesarPreferencias(resPreferencias.data);
            } else {
              console.error('La respuesta del backend no fue exitosa:', resPreferencias.data);
            }
          } catch (error) {
            console.error('Error al cargar preferencias:', error);  
          }
        };
      
        cargarPreferencias();
      }, [materias, procesarPreferencias]); 
      const guardarPreferencias = async (e) =>
      {

        try {
          
        const userPk = sessionStorage.getItem('userPk');
        console.log(userPk);
        if (!userPk) {
          console.error('No se encontró el userPk en sessionStorage');
        }
        //Formateo ambos arreglos y el valor del pk del usuario //
        const cargaUtil = {
          pkUsuario: userPk,
          seleccionesIzquierda: seleccionIzquierda.filter(seleccion => seleccion.seleccionado).map(seleccion => seleccion.pk),
          seleccionesDerecha: seleccionDerecha.filter(seleccion => seleccion.seleccionado).map(seleccion => seleccion.pk),
        };
        const response = await axios.post('https://201.124.154.2:3001/api/alumnos/enviarPreferencias', cargaUtil);
        console.log('Respuesta del servidor:', response.data);
        if(response.status===200)
        {
          console.log('Respuesta del servidor:', response.data);
          console.log("Respuestas guardadaaas!!!");
          handleShow();
        }
        else {
          console.error('Respuesta del servidor no fue exitosa:', response.status);
          // Manejar respuestas no exitosas aquí, como mostrar un mensaje de error
        }
        } catch (error) {
          console.error('Error enviando datos al servidor o leyendo desde sessionStorage:', error);
        }

      }
      const evitarRefresh = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica que debe ejecutarse cuando se envía el formulario
        console.log('Formulario enviado sin recargar la página');
      };

      //Variables Modales//

        const [showModal, setShowModal] = useState(false);
        const handleShow = () => setShowModal(true);
        const handleClose = () => setShowModal(false);

     return (
        <>
        <Modal className='modal-registro-satisfactorio' show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Preferencias Académicas guardadas</Modal.Title>
                </Modal.Header>
                <Modal.Body>Las nuevas preferencias académicas han sido guardadas con éxito</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
        </Modal>
    <div>
                <div className="card text-center margen_superior">
                    <div className="card-header">
                        Selecciona tus &aacute;reas acad&eacute;micas
                    </div>
                    <div className="card-body">
                        <Container>
                            <Form onSubmit={evitarRefresh}>
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
                                
               
                                <footer className="footer mt-auto py-3 bg-light">
                                    <Container>
                                    <Button type="submit" variant="primary" onClick={guardarPreferencias}>
                                    Guardar
                                    </Button>
                                    </Container>
                                </footer>
                                
                            </Form>
                         
                        </Container>
                    </div>
                </div>
            </div>
        </>
     );
}

export default PreferenciasAcademicas;