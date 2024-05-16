import React, { useState } from 'react';
import { Row, Col, Button, Image, Modal } from 'react-bootstrap';
import { BsStarFill, BsStar } from 'react-icons/bs';
import Avatar1 from "./Utils/Avatar1Login.jpg"; // Asegúrate de tener la imagen en tu proyecto
import axios from 'axios';
import Swal from 'sweetalert2';

const Sancion = ({ usuario, onRemoveUser }) => {
   const omitirReporte = async () => {
    try {
        const response = await axios.post('http://localhost:3001/api/administracion/omitirReportAlumno', {
            pkReporte: usuario.PK_REPORTE
        });
        if (response.status === 201) {
            Swal.fire(
                'Omitido',
                'El reporte ha sido omitido.',
                'success'
            ).then(()=>{onRemoveUser(usuario.PK_REPORTE)});
        }
    } catch (error) {
        console.error('Error al omitir el reporte del usuario', error);
        Swal.fire(
            'Error',
            'No se pudo omitir el reporte.',
            'error'
        ).then(()=>{onRemoveUser(usuario.PK_REPORTE)});
    }
};
const sancionar = async () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Estás a punto de sancionar a este usuario.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, sancionar!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.post('http://localhost:3001/api/administracion/sancionarUser', {
                pkReporte: usuario.PK_REPORTE,
                pkusuario: usuario.PK_USUARIO
            })
            .then(response => {
                Swal.fire(
                    '¡Sancionado!',
                    'El usuario ha sido sancionado correctamente.',
                    'success'
                ).then(() => {
                    onRemoveUser(usuario.PK_USUARIO);
                });
            })
            .catch(error => {
                console.error('Error al sancionar al usuario', error);
                Swal.fire(
                    'Error',
                    'No se pudo sancionar al usuario.',
                    'error'
                );
            });
        }
    });
};

const vetarAlumno = async () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Estás a punto de vetar a este usuario del sistema permanentemente.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.post('http://localhost:3001/api/administracion/vetarAlumno', {
                pkReporte: usuario.PK_REPORTE,
                pkusuario: usuario.PK_USUARIO
            })
            .then(response => {
                Swal.fire(
                    'Usuario Eliminado',
                    'El usuario ha sido eliminado del sistema.',
                    'success'
                ).then(() => {
                    onRemoveUser(usuario.PK_USUARIO);
                });
            })
            .catch(error => {
                console.error('Error al vetar al usuario', error);
                Swal.fire(
                    'Error',
                    'No se pudo eliminar al usuario.',
                    'error'
                );
            });
        }
    });
};



const getStarCount = (calificacion) => {
    if (calificacion === null) return 0;  // Devuelve 0 si la calificación es null

    const calif = parseFloat(calificacion);
    if (calif >= 0.00 && calif <= 1.00) return 1;
    if (calif > 1.00 && calif <= 2.00) return 2;
    if (calif > 2.00 && calif <= 3.00) return 3;
    if (calif > 3.00 && calif <= 4.00) return 4;
    if (calif > 4.00 && calif <= 5.00) return 5;
    return 0; // En caso de un valor no esperado
};
    return (
        <>
            <Row>
                <Col className="border">Nombre de usuario: {usuario.NOMBRE} {usuario.APELLIDO_PATERNO} {usuario.APELLIDO_MATERNO}</Col>
            </Row>
            <Row className="border">
                <Col>
                    <Row>
                    <div className="usuario-info">
                        <div className="usuario-icon">
                            <Image src={Avatar1} alt="Logo usuario" width={100} height={100} roundedCircle style={{ borderRadius: "50%" }} />
                        </div>
                        <div className="usuario-rating">
                        {[...Array(5)].map((star, i) => (
                                        <span key={i} title={`Calificación: ${usuario.CALIFICACION || '0'}`}>
                                            {i < getStarCount(usuario.CALIFICACION) ? <BsStarFill /> : <BsStar />}
                                        </span>
                                    ))}
                        </div>
                    </div>
                    </Row>
                    <Row>
                    <p>ID del reporte: {usuario.PK_REPORTE}</p>
                    <p>Reportado por el usuario: {usuario.FK_USUARIO_REPORTA}</p>
                    </Row>
                </Col>
                <Col>
                    <Row>
                    
                        <p>Correo del usuario: {usuario.EMAIL}</p>
                        <p>Sanciones del Usuario: {usuario.SANCIONES}</p>
                        <p>Calificaion general: {usuario.CALIFICACION}</p>
                    </Row>
                    <Row>
                        <div className="usuario-description">
                        <p>{usuario.DESCRIPCION}</p>
                    </div>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginBottom: '10px', marginTop: '10px' }}>
                <Col>
                    <Button variant="primary" style={{ marginRight: '10px', padding: '10px' }} onClick={sancionar}>Sancionar</Button>
                    <Button variant="warning" style={{ padding: '10px' } } onClick={omitirReporte}>Omitir</Button>
                    <Button variant="danger" style={{ padding: '10px' }} onClick={vetarAlumno}>Vetar Usuario</Button>
                </Col>
            </Row>

        </>
    );
};

export default Sancion;
