//HOOKS Y COMPONENTES DE BOOTSTRAP//
import React, { useState, useEffect } from "react";
import { usarCarga } from "../ContextoCarga";
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
    const {setEstaCargando} = usarCarga();
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
    const [correo, setCorreo] = useState ();
    const [password, setPassword] = useState();

    //Variables y funciones para manejar el estado de las vistas modales //
    const [modalIncorrecto, setModalIncorrecto] = useState(false);
    const [modalMaterias, setModalMaterias] = useState(false);
    const [modalRecuperar, setModalRecuperacion] = useState(false);

    const navigate = useNavigate(); // Utiliza useNavigate para redireccionar en React Router v6
    // Variables y funciones para manejar el modal de bienvenida al administrador
    const [modalAdmin, setModalAdmin] = useState(false);
    const [modalAlumno, setModalAlumno] = useState(false);
    const handleCloseModalAdmin = () => {
       setModalAdmin(false);
       navigate("/VistasAdmin/PrincipalAdmin"); // Utiliza navigate para redireccionar en React Router v6
     };

     const handleCloseModalAlumno = () => {
        setModalAlumno(false);
        navigate("/VistasAlumno/PrincipalAlumno"); // Utiliza navigate para redireccionar en React Router v6
      };

     

    //Funcion que va manipula la logica del inicio de sesion AQUI IRIA EL BACK HASTA CIERTO PUNTO //

    const handleLogin = async (event) => {
    //     if (correo === "miky_lee24@hotmail.com" && password === "dashita")
    // {
    //     handleClick()
    //     setModalMaterias(true);
    // }
    // else
    // {
    //     setModalIncorrecto(true);
    // }
    event.preventDefault();
    setEstaCargando(true); // Activa el spinner

    // Espera 2 segundos antes de continuar con la lógica
    setTimeout(() => {
        // Ahora que han pasado 2 segundos, continúa con la lógica de login
        if (correo === "miky_lee24@hotmail.com" && password === "dashita") {
            handleClick(); // Asumiendo que esta función hace algo relevante antes de continuar
            setModalMaterias(true);
        } else if (correo === "admin@gmail.com" && password === "admin")
        
        {
            handleCloseModalAdmin();
            setModalAdmin(true); // Muestra el modal de bienvenida al administrador
        } else if (correo === "alumno@gmail.com" && password === "alumno")
        {
            handleCloseModalAlumno(); // Asumiendo que esta función hace algo relevante antes de continuar
            setModalAlumno(true); // Muestra el modal de bienvenida al administrador
        }   
        else
        {
            setModalIncorrecto(true);
        }
        setEstaCargando(false); // Desactiva el spinner independientemente del resultado
    }, 2000);

    }

    const handleRecuperacion = () => 
    {
        setModalRecuperacion(true)
    }

    //Logica para los checkbox de la modal de materias
    // const [checkboxesHabilitadas, setCheckboxesHabilitadas] = useState (new Array(11).fill(true)); //Arreglo utilizado para saber si se debe o no habilitar el checkbox
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
          <Button variant="primary" onClick={() => setModalMaterias(false)}>
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


      <Modal  className="modal-materias justify-content-md-center align-items-center" centered size="lg"  show={modalRecuperar}  onHide={() => setModalRecuperacion(false)}>
        <Modal.Header className="modal-materias-header" >
          <Modal.Title className="modal-materias-titulo" > ¿Deseas recuperar tu contraseña ?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-materias-body">Si olvidaste tu contraseña, por favor ingresa tu correo electronico con el que registraste tu cuenta y en breve
            te llegara un correo electronico con una contraseña temporal.
            <Form.Group as={Row} className="mb-3" controlId="email">
                                <Form.Label className="text-md-right text-start form-label-pe-none">Correo electronico:</Form.Label>
                                <Form.Control type="email" placeholder="Ingresa tu correo electronico" onChange={(e) => setCorreo(e.target.value)} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer modal-materias-footer >
        <Button variant="primary" className="btn-recuperar" onClick={() => setModalRecuperacion(false)}>
            Aceptar
          </Button>
          <Button variant="secondary" onClick={() => setModalRecuperacion(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
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
                              Para Iniciar Sesion en nuestro sistema, por favor accede con tu correo electrónico y tu contraseña.
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
                                <Form.Control type="email" placeholder="Ingresa tu correo electronico" onChange={(e) => setCorreo(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="password">
                                <Form.Label className="text-md-right text-start form-label-pe-none">Contraseña:</Form.Label>
                                <Form.Control type="password" placeholder="Ingresa tu contraseña." onChange={(e)=>setPassword(e.target.value)} />
                            </Form.Group>
                            </Form> 
                            <Container>
                                <Col>
                                    <Button variant="outline-primary" type="submit" className="ms-2 btn-iniciar-sesion" onClick={handleLogin}>
                                    Iniciar Sesion
                                    </Button>
                                    </Col>
                            </Container>
                            <Container>
                                <Col>
                                <p>Si olvidaste tu contraseña. No te preocupes haz clic aqui!!</p>
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