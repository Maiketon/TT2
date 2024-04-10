import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'; // Importa el componente Dropdown de react-bootstrap
import { Container, Row, Col } from 'react-bootstrap'; // Importa Container, Row y Col de react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import './Css/Dropdown.css'; // Asegúrate de tener un archivo CSS para los estilos personalizados
import Materias from '../VistasAdmin/Materias'

function DropdownComponent() {
    const [selectedOption, setSelectedOption] = useState(null); // Estado para la opción seleccionada
    const [displayText, setDisplayText] = useState(''); // Estado para el texto a mostrar en el contenedor
  
    // Función para manejar el cambio de opción
    const handleOptionChange = (option) => {
      setSelectedOption(option); // Actualiza la opción seleccionada
  
      // Asigna el texto correspondiente a la opción seleccionada
      switch (option) {
        case 'Opción 1':
          setDisplayText('');
          break;
        case 'Opción 2':
          setDisplayText('Aquí está el contenido para la Opción 2');
          break;
        case 'Opción 3':
          setDisplayText('Contenido personalizado para la Opción 3');
          break;
        case 'Opción 4':
          setDisplayText('Contenido personalizado para la Opción 4');
          break;
        case 'Opción 5':
          setDisplayText('Contenido personalizado para la Opción 5');
          break;
        default:
          setDisplayText('');
      }
    };
  
    return (
        <Container fluid>
          <Row>
            <Col>
              <div style={{ marginTop: '20px' }}>
                {/* Componente Dropdown de react-bootstrap */}
                <Dropdown>
                  <Dropdown.Toggle variant="secondary">
                    {selectedOption || 'Seleccionar opción'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {/* Opciones del Dropdown */}
                    <Dropdown.Item onClick={() => handleOptionChange('Opción 1')}>Materias</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleOptionChange('Opción 2')}>Opcion 2</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleOptionChange('Opción 3')}>Opcion 3</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleOptionChange('Opción 4')}>Numero de sanciones</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleOptionChange('Opción 5')}>Calificaciones</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
            <Col md={7}> {/* Ancho de la segunda columna */}
                <div style={{ marginTop: '100px' }}>
                {/* Contenedor de texto */}
                {selectedOption === 'Opción 1' && <Materias />}
                {displayText && <p className="mt-2">{displayText}</p>}
                 </div>
            </Col>
          </Row>
        </Container>
      );
    }
  
  export default DropdownComponent;