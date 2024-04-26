import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const Configuracion = () => {
    const [correo, setCorreo] = useState("");
    const [pswdactual, setPswActual] = useState("");
    const [pswdnuevo, setNewPswd] = useState("");
    const userPk = sessionStorage.getItem("userPk");

    // Función para mostrar el SweetAlert de confirmación al eliminar cuenta
    const alertaEliminarCuenta = () => {
        Swal.fire({
            title: "¿Estás seguro de querer eliminar esta cuenta?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            position: "center",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar cuenta",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí puedes agregar la lógica para eliminar la cuenta
                Swal.fire("Cuenta eliminada con éxito.", "", "success");
            }
        });
    };

    // Alerta que se despliega al presionar el botón cambiar contraseña
    const alertaCambiarPassword = () => {
        Swal.fire({
            title: "¿Estás seguro de querer cambiar tu contraseña?",
            text: "Se te mandará a tu correo electrónico una liga de confirmación.",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            icon: "question",
            position: "center",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("http://localhost:3001/api/alumnos/cambiarPswd", {
                        userPk: userPk,
                        correo: correo,
                        pswdactual: pswdactual,
                        pswdnuevo: pswdnuevo,
                    })
                    .then((response) => {
                        if (response.data.message === "Contraseña cambiada exitosamente") {
                            Swal.fire("Tu contraseña ha sido cambiada con éxito.", "", "success");
                        } else {
                            Swal.fire("Error al cambiar la contraseña.", "La contraseña actual es incorrecta.", "error");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire("Error al cambiar la contraseña.", "Inténtalo de nuevo más tarde.", "error");
                    });
            }
        });
    };

    // Popover para el campo de contraseña
    const popoverPassword = (
        <Popover id="popovernewpswd">
            <Popover.Header as="h3">Nueva contraseña</Popover.Header>
            <Popover.Body>Ingresa tu nueva contraseña para tu cuenta de Learnmatch.</Popover.Body>
        </Popover>
    );

    // Popover para el campo de correo electrónico
    const popoverEmail = (
        <Popover id="popovercorreo">
            <Popover.Header as="h3">Correo electrónico</Popover.Header>
            <Popover.Body>Ingresa el correo electrónico asociado a tu cuenta de Learnmatch.</Popover.Body>
        </Popover>
    );

    const popoverPswdActual = (
        <Popover id="popoverpswdactual">
            <Popover.Header as="h3">Contraseña actual</Popover.Header>
            <Popover.Body>Ingresa tu contraseña actual que utilizas para acceder a tu cuenta.</Popover.Body>
        </Popover>
    );

    return (
        <>
            <div>
                <div className="card text-center margen_superior">
                    <div className="card-header">Modifica tu contraseña</div>
                    <div className="card-body">
                        <Container>
                            <Form>
                                <Form.Group className="mb-3" controlId="correo">
                                    <Form.Label>Ingresa tu correo electrónico</Form.Label>
                                    <OverlayTrigger trigger={["hover", "focus"]} overlay={popoverEmail}>
                                        <Form.Control
                                            onChange={(event) => {
                                                setCorreo(event.target.value);
                                            }}
                                            type="email"
                                            placeholder="ejemplo: alumno@gmail.com"
                                        />
                                    </OverlayTrigger>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="pswdactual">
                                    <Form.Label>Ingresa tu contraseña actual</Form.Label>
                                    <OverlayTrigger trigger={["hover", "focus"]} overlay={popoverPswdActual}>
                                        <Form.Control
                                            onChange={(event) => {
                                                setPswActual(event.target.value);
                                            }}
                                            type="password"
                                            placeholder="Ingresa tu contraseña actual"
                                        />
                                    </OverlayTrigger>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="nuevopswd">
                                    <Form.Label>Ingresa tu nueva contraseña</Form.Label>
                                    <OverlayTrigger trigger={["hover", "focus"]} overlay={popoverPassword}>
                                        <Form.Control
                                            onChange={(event) => {
                                                setNewPswd(event.target.value);
                                            }}
                                            type="password"
                                            placeholder="Ingresa tu nueva contraseña"
                                        />
                                    </OverlayTrigger>
                                </Form.Group>
                                <Button className="btn btn-dark" onClick={alertaCambiarPassword}>
                                    Cambiar la contraseña
                                </Button>
                            </Form>
                        </Container>
                    </div>
                    <hr />
                    <div className="card-header">Elimina tu cuenta</div>
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
