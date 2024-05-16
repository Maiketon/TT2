import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Sancion from './SancionComponent';
import axios from 'axios';

const Sanciones = () => {
    const [usuariosReportados, setUsuariosReportados] = useState([]);

    useEffect(() => {
        const cargarUsuariosReportados = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/administracion/reportesAlum');
                setUsuariosReportados(response.data);
                console.log('Usuarios cargados:', response.data);  // Verificar el contenido del array
            } catch (error) {
                console.error('Error al cargar usuarios reportados', error);
            }
        };

        cargarUsuariosReportados();
    }, []);

    const removeUserFromList = (pkUsuario) => {
        setUsuariosReportados(prevUsuarios => prevUsuarios.filter(usuario => usuario.PK_USUARIO !== pkUsuario));
        console.log('Usuario eliminado:', pkUsuario);  // Debugging para ver qué PK se está intentando eliminar
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <Container style={{ width: '50%', maxWidth: '800px', border: '1px solid #ccc', borderRadius: '5px' }}>
                {usuariosReportados.map(usuario => (
                    <Sancion key={usuario.PK_USUARIO} usuario={usuario} onRemoveUser={removeUserFromList} />
                ))}
            </Container>
        </div>
    );
}

export default Sanciones;
