import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Image , Container} from 'react-bootstrap';
import { BsStarFill, BsStar } from 'react-icons/bs';
import Avatar1 from "./Utils/Avatar1Login.jpg"; // Asegúrate de tener la imagen en tu proyecto
import axios from 'axios';
import './Css/PrincipalAdm.css';

const UsuarioComponent = ({ usuarios }) => {
    const [materias, setMaterias] = useState([]);

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/administracion/materiasRegistroU');
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
                <Container className='principal' key={index}>
                    <Row >
                        <Col className="border">Nombre de usuario: {usuario.NOMBRE} {usuario.APELLIDO_PATERNO} {usuario.APELLIDO_MATERNO} Identificador: {usuario.PK_USUARIO}</Col>
                    </Row>
                    <Row className="border">
                        <Col>
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
                                    <p>Calificación aprendiz; {usuario.CALIFICACION_APRENDIZ} Reportes:{usuario.NUMERO_REPORTES}</p>
                                <p>Calificación mentor; {usuario.CALIFICACION_MENTOR}         Sanciones;{usuario.SANCIONES}</p>
                                {usuario.FECHA_BORRADO && <p>Fecha de Borrado: {new Date(usuario.FECHA_BORRADO).toLocaleDateString()}</p>}
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <Container className="usuario-description">
                                <p>Email: {usuario.EMAIL}</p>
                                <p>Carrera: {usuario.CARRERA}</p>
                                <p>Semestre: {usuario.SEMESTRE}</p>
                                <p>Contraseña; {usuario.PSW}</p>
                                <p>Fecha de Inicio: {new Date(usuario.FECHA_CREACION).toLocaleDateString()}</p>
                               
                            </Container>
                        </Col>
                        <Row>
                        <Col>
                        <h4>Deficiencias:</h4>
                                <ul>
                                    {usuario.FK_DEFICIENCIA1 && <li>{getMateriaNombre(usuario.FK_DEFICIENCIA1)}</li>}
                                    {usuario.FK_DEFICIENCIA2 && <li>{getMateriaNombre(usuario.FK_DEFICIENCIA2)}</li>}
                                    {usuario.FK_DEFICIENCIA3 && <li>{getMateriaNombre(usuario.FK_DEFICIENCIA3)}</li>}
                                </ul>
                             
                        </Col>
                        <Col>
                        <h4>Fortalezas:</h4>
                                <ul>
                                    {usuario.FK_ENSEÑANZA1 && <li>{getMateriaNombre(usuario.FK_ENSEÑANZA1)}</li>}
                                    {usuario.FK_ENSEÑANZA2 && <li>{getMateriaNombre(usuario.FK_ENSEÑANZA2)}</li>}
                                    {usuario.FK_ENSEÑANZA3 && <li>{getMateriaNombre(usuario.FK_ENSEÑANZA3)}</li>}
                                </ul>
                        </Col>
                    </Row>
                    </Row>
                </Container>
            ))}
        </>
    );
};

export default UsuarioComponent;
