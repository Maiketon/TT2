import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";

const Configuracion = () => {
    
    // Función para mostrar el SweetAlert de confirmación al eliminar cuenta
    const alertaEliminarCuenta = () => {
        Swal.fire({
            title: "¿Estás seguro de querer eliminar esta cuenta?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar cuenta",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí puedes agregar la lógica para eliminar la cuenta
                Swal.fire("Cuenta eliminada", "", "success");
            }
        });
    };

    const alertaCambiarPassword = () => {
        Swal.fire({
            text: "Cambio de contraseña exitosa",
            icon: "success",
            confirmButtonColor: "#d33",
            confirmButtonText: "Aceptar",
        });
    };

    return (
        <>
        <div>
            <div className="card text-center margen_superior">
                <div className="card-header">
                    Modifica tu contraseña
                </div>
                <div className="card-body">
                    <Container>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Ingresa tu correo electr&oacute;nico</Form.Label>
                                <Form.Control type="email" placeholder="ejemplo:alumno@gmail.com" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ingresa tu nueva contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Ingresa tu contraseña" />
                            </Form.Group>
                            <Button className="btn btn-dark" type="submit" onClick={alertaCambiarPassword}>
                                Cambiar la contraseña
                            </Button>
                        </Form>
                    </Container>
                </div>
                <hr></hr>
                <div className="card-header">
                    Elimina tu cuenta
                </div>
                <div className="card-body">
                    {/* Botón para eliminar cuenta con función onClick */}
                    <Button className="btn btn-danger" onClick={alertaEliminarCuenta}>
                        Eliminar cuenta
                    </Button>
                </div>
            </div>
        </div>
        </>
    );
};

export default Configuracion;
