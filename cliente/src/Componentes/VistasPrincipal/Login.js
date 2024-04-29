//HOOKS Y COMPONENTES DE BOOTSTRAP//
import React, { useState, useEffect } from "react";
import { useCarga } from "../ContextoCarga";
import {Container, Row, Col, Form, Card, Button, Modal} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
// IMAGENESSECCION PRINCIPAL//
import Avatar1 from "./Utils/Avatar1Login.jpg";
import Avatar2 from "./Utils/Avatar2Login.jpg";
//IMAGENES- ICONOS MODALES//
import EstadoFeliz from "./Utils/Sonrisa.png";
import EstadoTriste from "./Utils/Triste.png";
//HOJAS DE ESTILO//
import "./Css/Botones.css";
import "./Css/Modales.css";

import axios from "axios";


const FormLogin = ()=>
{   

    //LOGICA PARA EL SPINNER//
    const {setEstaCargando} = useCarga();
    // useEffect(() => {
    //     setEstaCargando(true);
    //     // Simula la carga de datos
    //     setTimeout(() => {
    //       setEstaCargando(false);
    //     }, 3000); // Ajusta el tiempo según tus necesidades
    //   }, [setEstaCargando]);
    const handleClick = async () => {
        setEstaCargando(true);
        // Simula una operación asíncrona como una petición de red
        await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
        setEstaCargando(false);
      };
//////////////////////////////////////////////////////////////////////////////


    //VARIABLES QUE ALMACENAN DE MOMENTO EN EL FRONT EL CORREO Y EL PASSWORD PARA HACER Y DEBUGGEAR LAS VISTAS MODALES //
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const GuardarDatosHook = (e) => {
      const { name, value } = e.target;
      switch (name) {
          case 'email':
              setCorreo(value.toLowerCase().slice(0, 55));
              break;
          case 'password':
              setPassword(value.slice(0, 8));
              break;
          default:
              console.log('Nombre de campo desconocido:', name);
      }
  };

    //Variables y funciones para manejar el estado de las vistas modales //
    const [modalIncorrecto, setModalIncorrecto] = useState(false);
    const [modalMaterias, setModalMaterias] = useState(false);
    const [modalRecuperar, setModalRecuperacion] = useState(false);
    const [modalRecuperarSuccess, setModalRC] = useState(false);

    const navigate = useNavigate(); // Utiliza useNavigate para redireccionar en React Router v6
    // Variables y funciones para manejar el modal de bienvenida al administrador
    const [modalAdmin, setModalAdmin] = useState(false);
    const [modalAlumno, setModalAlumno] = useState(false);
    const [modalParaverificar, setModalVerificacion] = useState(false);
    const [modalVerificado, setModalVerificado] = useState(false);
    const [datosUsuario, setDatos] = useState({username: '',password: ''})

    const inputChange = ({ target }) => {
      const { name, value } = target

      setDatos({
        ...datosUsuario,
        [name]: value
      })
    }
    const enviarValores = () => {
      setEstaCargando(true);
      axios.post('http://localhost:3001/api/login/login', datosUsuario)
        .then(async (response) => {
          const data = response.data;
          console.log(data);
          if (data.error) {
            alert(data.error);
            setEstaCargando(false);
          } else {
            console.log("Else de enviar valores");
            console.log(data.rol)
            console.log(data.pk);
            
            sessionStorage.setItem('userPk', data.pk);
            sessionStorage.setItem('userRole', data.rol);
    
            switch (data.rol) {
              case 1:
                console.log("SOLICIUTD");
                setModalVerificacion(true);
                sessionStorage.clear();
                break;
              case 2:
                console.log("VERIFICADO, CAMBIANDO A SELECCION");
                console.log("Entra en el case 2");
                console.log(data.pk);
                
                actualizarEstatusUsuario(data.pk);
                setModalMaterias(true);
                

                break;
              case 3:
                console.log("SELECCION");
                setModalMaterias(true);
                break;
              case 4:
                navigate("/VistasAlumno/PrincipalAlumno");
                break;
              case 8:
                
                 navigate("/VistasAdmin/PrincipalAdmin");
                break;
              default:
                
                alert('Rol de usuario no reconocido');
            }
          }
          setEstaCargando(false);
        })
        .catch((error) => {
          console.log(error.response.data);
          setEstaCargando(false);
          alert(error.response.data);
        });
    };

    function actualizarEstatusUsuario(pkUsuario) {
      console.log("Entra en la funcion actualizarEstatusUsuario" + pkUsuario);
      axios.post('http://localhost:3001/api/login/actualizarVerificacion', { pkUsuario })
          .then(({ data }) => {
              if (data.error) {
                  alert(data.error);
              } else {
                  console.log("Entra en else");
                  // Haz lo que necesites con la respuesta
              }
          })
          .catch(({ response }) => {
              alert(response.data);
          });
  }
    
    const handleCloseModalAdmin = () => {
       setModalAdmin(false);
       navigate("/VistasAdmin/PrincipalAdmin"); // Utiliza navigate para redireccionar en React Router v6
     };

     const handleCloseModalAlumno = () => {
      setModalAlumno(false);
      navigate("/VistasAlumno/PrincipalAlumno"); // Utiliza navigate para redireccionar en React Router v6
      };  

    const handleRecuperacion = () => 
    {
        setModalRecuperacion(true)
    }

    //Logica para los checkbox de la modal de materias//
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
        // setSeleccionIzquierda(new Array(response.data.length).fill(false));
        // setSeleccionDerecha(new Array(response.data.length).fill(false));
        setSeleccionIzquierda(response.data.map(materia => ({ seleccionado: false, pk: materia.PK_MATERIA })));
        setSeleccionDerecha(response.data.map(materia => ({ seleccionado: false, pk: materia.PK_MATERIA })));
        setDeshabilitado(new Array(response.data.length).fill(false));
        // setDeshabilitado(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error('Error al obtener las materias', error);
      }
    };

    fetchMaterias();
  }, []);
    const ActualizarEstado = (indice, columna) => {
        // Actualiza las selecciones y la deshabilitación basada en la columna y el índice
        // if (columna === "izquierda") {
        //     const seleccionados = seleccionIzquierda.filter(seleccion => seleccion).length; //VERIFICO CUANTOS CHECKBOX HAN SIDO SELECCIONADOS//
        //     if (!seleccionIzquierda[indice] && seleccionados>=3)
        //     {
        //         return; //Si se pasa no permito que siga seleccionando mas
        //     }

        //     const nuevaSeleccionIzquierda = [...seleccionIzquierda];
        //     nuevaSeleccionIzquierda[indice] = !nuevaSeleccionIzquierda[indice];
        //     setSeleccionIzquierda(nuevaSeleccionIzquierda);

        //     // Cambia la deshabilitación solo si se está marcando el checkbox
        //     setDeshabilitado(deshabilitado.map((item, i) => i === indice ? nuevaSeleccionIzquierda[indice] : item));
        // } else {
        //     //MISMA LOGICA LA COLUMNA DERECHA //
        //     const seleccionados = seleccionDerecha.filter(seleccion => seleccion).length;
        // if (!seleccionDerecha[indice] && seleccionados >= 3) {
        //     return;   //Si se pasa no permito que siga seleccionando mas
        // }
        //     const nuevaSeleccionDerecha = [...seleccionDerecha];
        //     nuevaSeleccionDerecha[indice] = !nuevaSeleccionDerecha[indice];
        //     setSeleccionDerecha(nuevaSeleccionDerecha);

        //     // Cambia la deshabilitación solo si se está marcando el checkbox
        //     setDeshabilitado(deshabilitado.map((item, i) => i === indice ? nuevaSeleccionDerecha[indice] : item));
        // }
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
        // return materias.map((materia, indice) => (
        //   <Form.Check
        //     type="checkbox"
        //     label={materia.NOMBRE_MATERIA}
        //     key={`${columna}-${materia.PK_MATERIA}`}
        //     id={`checkbox-${columna}-${materia.PK_MATERIA}`}
        //     checked={seleccion[indice]}
        //     onChange={() => ActualizarEstado(indice, columna)}
        //     disabled={deshabilitado[indice] && !seleccion[indice]}
        //   />
        // ));
        return materias.map((materia, indice) => (
          <Form.Check
            type="checkbox"
            label={materia.NOMBRE_MATERIA}
            key={`${columna}-${materia.PK_MATERIA}`}
            id={`checkbox-${columna}-${materia.PK_MATERIA}`}
            checked={seleccion[indice].seleccionado}
            onChange={() => ActualizarEstado(indice, columna)}
            disabled={deshabilitado[indice] && !seleccion[indice].seleccionado}
          />
        ));
      };
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
        const response = await axios.post('http://localhost:3001/api/alumnos/enviarPreferencias', cargaUtil);
        console.log('Respuesta del servidor:', response.data);
        if(response.status===200)
        {
          console.log('Respuesta del servidor:', response.data);
      navigate("/VistasAlumno/PrincipalAlumno");
        }
        else {
          console.error('Respuesta del servidor no fue exitosa:', response.status);
          // Manejar respuestas no exitosas aquí, como mostrar un mensaje de error
        }
        } catch (error) {
          console.error('Error enviando datos al servidor o leyendo desde sessionStorage:', error);
        }

      }
///////////////////////////////////////////////////////////////////////////      
      const recuperarContra = async(e)=>
      {
        e.preventDefault();
    console.log("Enviando correo a:", correo);  // Asegúrate de que correo está definido y es el correcto

    const response = await fetch('http://localhost:3001/api/alumnos/recuperacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo })  // Envía el correo como un objeto
    });

    if (response.ok) {
        console.log('Solicitud enviada con éxito y respuesta recibida.');
        setModalRecuperacion(false);
        setCorreo();
        setModalRC(true);
        
    } else {
        console.error('Error en la respuesta del servidor', response.status);
    }
    
      };
   
    return (
        <>
        <Container className='pt-3 pb-3' style={{ width: '40%', display:"flex", flexDirection:"column"}}> 
      
      <Modal show={modalMaterias} className="modal-materias" centered size="lg" onHide={() => setModalMaterias(false)}>
        <Modal.Header className="modal-materias-header">
          <Modal.Title className="modal-materias-titulo">Bienvenido: Selecciona tus Áreas Académicas</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-materias-body">
            <p>Con base a tu criterio, selecciona 3 areas academicas en las que consideres que tienes deficiencias y 3 opciones academicas en las que posees un dominio que te gustaria compartir con los demás. </p>
        <Row>
        <Col sm={5} >
        <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
        <strong>DEFICIENCIAS</strong>
        <img
            src={EstadoTriste}
            width={100}
            height={100}
            roundedCircle
            style ={{borderRadius: "50%"}}
             alt="Avatar"
            />
        </div>
        </Col>
        <Col sm={2} className="d-flex align-items-center justify-content-center">
        <div style={{ width: '1px', height: '100%', backgroundColor: 'lightgrey' }} />
        </Col>
        <Col sm={5}>
        <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
        <strong>ENSEÑANZA</strong>
        <img
            src={EstadoFeliz}
            width={100}
            height={100}
            roundedCircle
            style ={{borderRadius: "50%"}}
             alt="Avatar"
            />
        </div>
            
        </Col>

        </Row>
        <Row className="pt-3">
            <Col sm={5}>
                {crearCheckboxes(seleccionIzquierda, 'izquierda')}
            </Col>

            <Col sm={2} className="d-flex align-items-center justify-content-center">
            <div style={{ width: '1px', height: '100%', backgroundColor: 'lightgrey' }} />
            </Col>

            <Col sm={5}>
                {crearCheckboxes(seleccionDerecha, 'derecha')}
            </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer className="modal-materias-footer">
          <Button variant="primary" onClick={guardarPreferencias}>
            Se ve bien.
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalIncorrecto}  onHide={() => setModalIncorrecto(false)}>
        <Modal.Header >
          <Modal.Title >Error</Modal.Title>
        </Modal.Header>
        <Modal.Body >Usuario o clave incorrecta.</Modal.Body>
        <Modal.Footer >
          <Button variant="secondary" onClick={() => setModalIncorrecto(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalParaverificar} onHide={() => setModalVerificacion(false)}>
        <Modal.Header >
          <Modal.Title >Verificacion</Modal.Title>
        </Modal.Header>
        <Modal.Body >Falta verificacion</Modal.Body>
        <Modal.Footer >
          <Button variant="secondary" onClick={() => setModalVerificacion(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalVerificado} onHide={() => setModalVerificado(false)}>
        <Modal.Header >
          <Modal.Title >Verificacion</Modal.Title>
        </Modal.Header>
        <Modal.Body >Tu usuario esta verificado</Modal.Body>
        <Modal.Footer >
          <Button variant="secondary" onClick={() => setModalVerificado(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalRecuperarSuccess}  onHide={() => setModalRC(false)}>
        <Modal.Header >
          <Modal.Title >Solicitud de nueva contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body >Correo con nueva contraseña enviado al correo electronico registrado.</Modal.Body>
        <Modal.Footer >
          <Button variant="secondary" onClick={() => setModalRC(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal  className="modal-materias justify-content-md-center align-items-center" centered size="lg"  show={modalRecuperar}  onHide={() => setModalRecuperacion(false)}>
        <Modal.Header className="modal-materias-header" >
          <Modal.Title className="modal-materias-titulo" > ¿Deseas recuperar tu contraseña ?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-materias-body">Si olvidaste tu contraseña, por favor ingresa tu correo electronico con el que registraste tu cuenta y en breve
            te llegara un correo electronico con una contraseña temporal.
            <Form onSubmit={recuperarContra}>
            <Form.Group as={Row} className="mb-3" controlId="email">
                                <Form.Label className="text-md-right text-start form-label-pe-none">Correo electronico:</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Ingresa tu correo electronico" value={correo} onChange={GuardarDatosHook} />
            </Form.Group>
            <Modal.Footer modal-materias-footer >
        <Button variant="primary" type="submit" className="btn-recuperar">
            Aceptar
          </Button>
          <Button variant="secondary" onClick={() => setModalRecuperacion(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
            </Form>
        </Modal.Body>
       
      </Modal>



            <Row className="justify-content-md-center"> 
                <Col>
                    <Card className="d-flex flex-column" style={{ minHeight: '60vh',flex:1}}>
                        <Card.Body className="d-flex flex-column justify-content-between">
                            <Row>
                                <Col>
                                <img
                                src={Avatar1}
                                width={100}
                                height={100}
                                roundedCircle
                                style ={{borderRadius: "50%"}}
                                alt="Avatar"
                                />
                                </Col>

                                <Col>
                                <Card.Title>Bienvenido a LearnMatch</Card.Title>
                                <Card.Text>
                              Para Iniciar Sesi&oacute;n en nuestro sistema, por favor accede con tu correo electr&oacute;nico y tu contraseña.
                            </Card.Text>
                                </Col>
                                
                                <Col>
                                <img
                                src={Avatar2}
                                width={100}
                                height={100}
                                roundedCircle
                                style ={{borderRadius: "50%"}}
                                alt="Avatar"
                                />
                                </Col>
                            </Row>
                            
                            <Form>

                            <Form.Group as={Row} className="mb-3" controlId="email">
                                <Form.Label className="text-md-right text-start form-label-pe-none">Correo electronico:</Form.Label>
                                <Form.Control type="email" placeholder="Ingresa tu correo electronico" value ={datosUsuario.username} onChange={inputChange} name='username'/>
                            
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="password">
                                <Form.Label className="text-md-right text-start form-label-pe-none">Contraseña:</Form.Label>
                                <Form.Control type="password" placeholder="Ingresa tu contraseña." value ={datosUsuario.password} onChange={inputChange} name='password' />
                            </Form.Group>
                            </Form> 
                            <Container>
                                <Col>
                                    <Button variant="outline-primary" type="submit" className="ms-2 btn-iniciar-sesion" onClick={enviarValores}>
                                    Iniciar Sesion
                                    </Button>
                                    </Col>
                            </Container>
                            <Container>
                                <Col>
                                <p>Si olvidaste tu contraseña. No te preocupes haz clic aqu&iacute;!!</p>
                                    <Button  onClick={handleRecuperacion} variant="outline-primary" type="submit" className="ms-2 btn-iniciar-sesion">
                                    <strong>Recuperar Contraseña </strong>
                                    </Button>
                                    </Col>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column" style={{ minHeight: '21vh',flex:1}}> <br/></Row> 
        </Container>
        </>
    );

}

export default FormLogin;