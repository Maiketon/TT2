import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const AdminPanel = () => {
  return (
    <Container className="mt-4">
      <Alert variant="info">
        Este es el panel de administrador
      </Alert>
    </Container>
  );
}

export default AdminPanel;