import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Image , Container} from 'react-bootstrap';
import { BsStarFill, BsStar } from 'react-icons/bs';
import Avatar1 from "./Utils/Avatar1Login.jpg"; // Asegúrate de tener la imagen en tu proyecto
import axios from 'axios';
import './Css/PrincipalAdm.css';

const UsuarioComponent = ({ usuarios }) => {
    const [materias, setMaterias] = useState([]);

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await axios.get('https://201.124.162.192:3001/api/administracion/materiasRegistroU');
                console.log("Respuesta del API:", response.data);
                setMaterias(response.data);


            } catch (error) {
                console.error('Error al cargar las materias', error);
            }
        };
    
        fetchMaterias();
    }, []);
    
    const getMateriaNombre = (fk) => {
        if (!Array.isArray(materias)) {
            console.error("Error: Materias is not an array", materias);
            return 'Cargando...';
        }
        const fkAsNumber = Number(fk); // Convierte fk a número, asumiendo que los PK_MATERIA son números
        const materia = materias.find(mat => mat.PK_MATERIA === fkAsNumber);
        console.log("FK buscada:", fkAsNumber);
console.log("Materias disponibles:", materias.map(mat => mat.PK_MATERIA));
        return materia ? materia.NOMBRE_MATERIA : 'Desconocido';
    };
    
     // Función para obtener el número de estrellas basado en la calificación
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
             {usuarios.map((usuario, index) => (
                <Card className="user-info-card" key={index}>
                    <Card.Header>
                        <h2>Nombre de usuario: {usuario.NOMBRE} {usuario.APELLIDO_PATERNO} {usuario.APELLIDO_MATERNO} Identificador: {usuario.PK_USUARIO}</h2>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={4} className="text-center">
                                <Image src={Avatar1} alt="Logo usuario" width={100} height={100} roundedCircle />
                                <Container className="ratings mt-3">
                                    {[...Array(5)].map((star, i) => (
                                        <span key={i} title={`Calificación: ${usuario.CALIFICACION || '0'}`}>
                                            {i < getStarCount(usuario.CALIFICACION) ? <BsStarFill /> : <BsStar />}
                                        </span>
                                    ))}
                                    
                                </Container>
                                <Container>
                                    <Row className="mt-2">
                                        <Col><strong>Calificación aprendiz:</strong> {usuario.CALIFICACION_APRENDIZ}</Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col><strong>Reportes:</strong> {usuario.NUMERO_REPORTES}</Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col><strong>Calificación mentor:</strong> {usuario.CALIFICACION_MENTOR}</Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col><strong>Sanciones:</strong> {usuario.SANCIONES}</Col>
                                    </Row>
                                    {usuario.FECHA_BORRADO && (
                                        <Row className="mt-2">
                                            <Col><strong>Fecha de Borrado:</strong> {new Date(usuario.FECHA_BORRADO).toLocaleDateString()}</Col>
                                        </Row>
                                    )}
                                </Container>
                            </Col>
                            <Col>
                                <Container>
                                    <Row>
                                        <Col>
                                            <h4>Información de contacto</h4>
                                            <p>Email: {usuario.EMAIL}</p>
                                            <p>Carrera: {usuario.CARRERA}</p>
                                            <p>Semestre: {usuario.SEMESTRE}</p>
                                            <p>Contraseña: {usuario.PSW}</p>
                                            <p>Fecha de Inicio: {new Date(usuario.FECHA_CREACION).toLocaleDateString()}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <h4>Deficiencias:</h4>
                                            <ul>
                                                {usuario.FK_DEFICIENCIA1 && <li>{getMateriaNombre(usuario.FK_DEFICIENCIA1)}</li>}
                                                {usuario.FK_DEFICIENCIA2 && <li>{getMateriaNombre(usuario.FK_DEFICIENCIA2)}</li>}
                                                {usuario.FK_DEFICIENCIA3 && <li>{getMateriaNombre(usuario.FK_DEFICIENCIA3)}</li>}
                                            </ul>
                                        </Col>
                                        <Col md={6}>
                                            <h4>Fortalezas:</h4>
                                            <ul>
                                                {usuario.FK_ENSEÑANZA1 && <li>{getMateriaNombre(usuario.FK_ENSEÑANZA1)}</li>}
                                                {usuario.FK_ENSEÑANZA2 && <li>{getMateriaNombre(usuario.FK_ENSEÑANZA2)}</li>}
                                                {usuario.FK_ENSEÑANZA3 && <li>{getMateriaNombre(usuario.FK_ENSEÑANZA3)}</li>}
                                            </ul>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default UsuarioComponent;
