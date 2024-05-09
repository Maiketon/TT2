import React from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

const DetalleEmparejamiento = ({ datos }) => {
    return (
        <div className="detalle-emparejamiento">
            <div className="perfil-y-datos">
                <img src={datos.iconoPerfil} alt="Perfil" className="icono-perfil" />
                <div>
                    <div className="nombre-usuario">{datos.nombreUsuario}</div>
                    <div className="caducidad">Caduca: {datos.caducidad}</div>
                </div>
                <img src={datos.iconoEstado} alt="Estado" className="icono-estado" />
            </div>
            <InputGroup className="input-token">
                <FormControl defaultValue={datos.token} readOnly />
                <InputGroup.Append>
                    <Button variant="outline-secondary">Copiar</Button>
                </InputGroup.Append>
            </InputGroup>
            <Button variant="danger" className="btn-finalizar">Finalizar</Button>
        </div>
    );
};

export default DetalleEmparejamiento;
