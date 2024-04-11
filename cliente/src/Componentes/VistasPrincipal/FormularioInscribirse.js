import React,{useState} from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';


const FormularioInscribirse = ({ setVista }) =>
{
  //Estructura que contendra los datos del form Inscribirse//
  const [usuario, setUsuario] = useState({
    carrera: '1',
    semestre: '1',
    nombres: '',
    apellidoP: '',
    apellidoM: '',
    correo: '',
    password: '',
    confirmpassword: ''
});

//
const GuardarDatosHook = (e) => {
  setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
  });
  console.log(usuario);
}


const Guardar = async (e) => {
  e.preventDefault();

  // Validación de contraseñas
  if (usuario.password !== usuario.confirmpassword) {
    alert("Verifica que tus contraseñas coincidan");
    return;
  }

  try {
    // Preparar el cuerpo de la petición, excluyendo la confirmación de contraseña
    const datosUsuario = {
      nombres: usuario.nombres,
      apellidoP: usuario.apellidoP,
      apellidoM: usuario.apellidoM,
      correo: usuario.correo,
      carrera: usuario.carrera,
      semestre: usuario.semestre,
      password: usuario.password
    };

    // Realizar la petición POST al servidor
    const response = await fetch('http://localhost:3001/api/alumnos/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosUsuario)
    });

    // Procesar la respuesta
    if (response.ok) {
      const result = await response.json();
      alert("Usuario registrado con éxito, verifica tu EMAIL");
      // Aquí podrías redirigir al usuario o limpiar el formulario
    } else {
      throw new Error('Algo salió mal con la solicitud al servidor.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al registrar el usuario.');
  }
};

  
    return (
        <>
        <Container className='p-1'>
          <Row className="justify-content-md-center">
            <Col md={7}>
              <Card>
                <Card.Body>
                  <Card.Title>LEARNMATCH</Card.Title>
                  <Card.Text>
                    Forma parte de nuestra comunidad para que aprendas y compartas diversos temas mejorando tus habilidades blandas.
                  </Card.Text>
                  <Form onSubmit={Guardar}>
                    <Form.Group as={Row} className="mb-1" controlId="carrera">
                      <Form.Label className="text-md-right text-start form-label-pe-none">Carrera:</Form.Label>
                       <Form.Select name='carrera' value={usuario.carrera} onChange={GuardarDatosHook} required>
                         <option  value={1}>Ingenieria en Sistemas Computacionales</option>
                       </Form.Select>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-1" controlId="semestre">
                      <Form.Label className="text-md-right text-start form-label-pe-none">Semestre actual:</Form.Label>
                       <Form.Select name='semestre' value={usuario.semestre} onChange={GuardarDatosHook} required>
                         <option  value={1}>Primer semestre</option>
                         <option value={2}>Segundo semestre</option>
                       </Form.Select>
                    </Form.Group>

                  <Form.Group as={Row} className="mb-1" controlId="nombres">
                      <Form.Label className="text-md-right text-start form-label-pe-none">Nombre:</Form.Label>
                      <Form.Control name='nombres' type="text" placeholder="Ingresa tu Nombre/s" value={usuario.nombres} onChange={GuardarDatosHook} required/>
                    </Form.Group>
    
                    <Form.Group as={Row} className="mb-1" controlId="apellidoP">
                      <Form.Label className="text-md-right text-start form-label-pe-none">Apellido Paterno:</Form.Label>
                      <Form.Control name="apellidoP" type="text" placeholder="Ingresa tu Apellido Paterno" value={usuario.apellidoP} onChange={GuardarDatosHook} required/>
                    </Form.Group>
    
                    <Form.Group as={Row} className="mb-1" controlId="apellidoM">
                      <Form.Label className="text-md-right text-start form-label-pe-none">Apellido Materno:</Form.Label>
                      <Form.Control name='apellidoM' type="text" placeholder="Ingresa tu Apellido Materno" value={usuario.apellidoM} onChange={GuardarDatosHook} required/>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-1" controlId="correo">
                      <Form.Label className="text-md-right text-start form-label-pe-none">Correo electronico:</Form.Label>
                      <Form.Control name='correo' type="email" placeholder="Ingresa tu correo electronico" value={usuario.correo} onChange={GuardarDatosHook} required />
                    </Form.Group>
    
                    <Form.Group as={Row} className="mb-1" controlId="password">
                      <Form.Label className="text-md-right text-start form-label-pe-none">Contraseña:</Form.Label>
                      <Form.Control name='password' type="password" placeholder="Ingresa una contraseña que contenga al menos 8 caracteres."
                        value={usuario.password} onChange={GuardarDatosHook}
                        required
                      />
                    </Form.Group>

                    <Form.Group as={Row} className="mb-1" controlId="confirmpassword">
                      <Form.Label className="text-md-right text-start form-label-pe-none">Confirma tu Contraseña:</Form.Label>
                      <Form.Control name='confirmpassword' type="password" placeholder="Repite tu contraseña."
                        value={usuario.confirmpassword} onChange={GuardarDatosHook}
                        required
                       />
                    </Form.Group>
                    <Container>
                    <label style={{
                        justifyContent: "center",
                        textAlign: "center"
                    }}>Si ya tienes una cuenta puedes <strong className='ir-a-login' onClick={() => setVista('login')}>Iniciar Sesion</strong> </label>
l
                      <Col>
                    <Button variant="primary" type="submit" className="ms-2">
                      Registrarse
                    </Button>
                    </Col>   
                    </Container >
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        </>
      );
}

export default FormularioInscribirse;