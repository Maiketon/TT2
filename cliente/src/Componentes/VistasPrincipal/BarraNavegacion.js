import React, {useState} from 'react';
import Logo from './Utils/LearnMatchCaraHumana.png';
import './Css/Botones.css';
import './Css/BarraNavegacion.css';
import './Css/Modales.css';
import { Navbar, NavDropdown ,Nav, Container, Button, Modal } from 'react-bootstrap';
const BarraNavegacion = ({ setVista }) => 
{
    const pdfFiles = {
        "UA C\u00E1lculo": "calculo_ISC2020.pdf",
        "UA An\u00E1lisis Vectorial": "analisisVectorial_ISC2020.pdf",
        "UA Matem\u00E1ticas Discretas" : "matematicasDiscretas_ISC2020.pdf",
        "UA Comunicaci\u00F3n Oral y Escrita": "comunicacionOralEscrita_ISC2020.pdf",
        "UA Fundamentos de Programaci\u00F3n": "fundamentosProgramacion_ISC2020.pdf",
        "UA \u00C1lgebra Lineal": "algebraLineal_ISC2020.pdf",
        "UA C\u00E1lculo Aplicado": "calculoAplicado_ISC2020.pdf",
        "UA Mec\u00E1nica y Electromagnetismo": "mecanicaElectromagnetismo_ISC2020.pdf",
        "UA Ingenier\u00EDa, \u00C9tica y Sociedad": "ingenieriaEticaSociedad_ISC2020.pdf",
        "UA Fundamentos Econ\u00F3micos": "fundamentosEconomicos_ISC2020.pdf",
        "UA Algoritmos y Estructura de Datos": "algoritmosEstructurasDatos_ISC2020.pdf"
        // ...continúa con los nombres de todos tus archivos
      };
      const uaContents = {
        "UA C\u00E1lculo": {
            "Programa Sintético": "calculo_ISC2020.pdf",
            "Videos": "https://www.youtube.com/embed/pXTbMcBI4aQ?si=A8LPNquU8bUF9cEP",
            "Presentaciones": "PRESENTACION PRUEBA.pdf"    
        },
        "UA An\u00E1lisis Vectorial": {
            "Programa Sintético": "analisisVectorial_ISC2020.pdf",
            "Videos": "https://www.youtube.com/embed/FZgu4It4ELM?si=gUZSIiZ__8CeTeNo",
            "Presentaciones": "PRESENTACION PRUEBA.pdf"    
        },
        "UA Matem\u00E1ticas Discretas": {
            "Programa Sintético": "matematicasDiscretas_ISC2020.pdf",
            "Videos": "https://www.youtube.com/embed/nIYj4urE82g?si=X84sFhq-ttO6XnvQ",
            "Presentaciones": "PRESENTACION PRUEBA.pdf"    
        },
        "UA Comunicaci\u00F3n Oral y Escrita": {
            "Programa Sintético": "comunicacionOralEscrita_ISC2020.pdf",
            "Videos": "https://www.youtube.com/embed/e34lx-uXXuI?si=6Xf4pKDTrvLJMx43",
            "Presentaciones": "PRESENTACION PRUEBA.pdf"    
        },
        "UA Fundamentos de Programaci\u00F3n": {
            "Programa Sintético": "fundamentosProgramacion_ISC2020.pdf",
            "Videos": "https://www.youtube.com/embed/oR_0QuYo6hU?si=p98vLB4CPjD6YxlP",
            "Presentaciones": "PRESENTACION PRUEBA.pdf"    
        }
        , "UA \u00C1lgebra Lineal": {
            "Programa Sintético": "algebraLineal_ISC2020.pdf",
            "Videos": "https://www.youtube.com/embed/6hNWBE1YQL0?si=iU4uLc45tyoFBFZ2",
            "Presentaciones": "PRESENTACION PRUEBA.pdf"    
        }
        , "UA C\u00E1lculo Aplicado": {
            "Programa Sintético": "calculoAplicado_ISC2020.pdf",
            "Videos": "https://www.youtube.com/embed/w-1fh2H-yf0?si=noJ62X2TmiHLc1PF",
            "Presentaciones": "PRESENTACION PRUEBA.pdf"    
        }
        , "UA Mec\u00E1nica y Electromagnetismo": {
            "Programa Sintético": "mecanicaElectromagnetismo_ISC2020.pdf",
            "Videos": "https://www.youtube.com/embed/PHcdNqtvvWo?si=4I2veCNwrNdcvaav",
            "Presentaciones": "PRESENTACION PRUEBA.pdf"    
        }
        , "UA Ingenier\u00EDa, \u00C9tica y Sociedad": {
            "Programa Sintético": "ingenieriaEticaSociedad_ISC2020.pdf",
            "Videos": "https://www.youtube.com/embed/8wMrJ5StrhE?si=4CUXm7QADczcWajJ",
            "Presentaciones": "PRESENTACION PRUEBA.pdf"    
        }
        , "UA Fundamentos Econ\u00F3micos": {
            "Programa Sintético": "fundamentosEconomicos_ISC2020.pdf",
            "Videos": "https://www.youtube.com/embed/UCj4hYBOVy0?si=F-K8OQLHFT_A5Pk2",
            "Presentaciones": "PRESENTACION PRUEBA.pdf"    
        }
        , "UA Algoritmos y Estructura de Datos": {
            "Programa Sintético": "algoritmosEstructurasDatos_ISC2020.pdf",
            "Videos": "https://www.youtube.com/embed/ss-iNeOItW4?si=tngi9_TREMV5CSC2",
            "Presentaciones": "PRESENTACION PRUEBA.pdf"    
        }
        // Continúa hasta UA 11
    };
    const descargarProgramSinteticoUA = (nombreMaterial, event)=> 
    {
        event.preventDefault();
        
        const link = document.createElement('a');
        link.href= `${window.location.origin}/ProgramasSinteticosUAs/${nombreMaterial}`;
        link.setAttribute('download',nombreMaterial);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

    }
    //Logica para los submenus//
    //Logica para invocar la modal //
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ type: '', url: '' });
    const [activeUA, setActiveUA] = useState('');

    const handleOpenModal = (content) => {
        const url = content.type === 'Videos' ?
        content.url : `${window.location.origin}/ProgramasSinteticosUAs/${content.url}`;
    setModalContent({ type: content.type, url: url });
    setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return(
        <>
    <Navbar expand="lg" className='navbar'>
        <Container>
            <Navbar.Brand className='texto-navbar' onClick={() => setVista('inicio')} style={{ cursor: 'pointer' }}>
            <img
            src= {Logo} // Ruta del Logo
            width="30"   // Establece el ancho del logo
            height="30"  // Establece la altura del logo
            className="d-inline-block align-top mx-3" // Añade margen a la derecha si es necesario
            alt="LearnMatch logo"
            onClick={() => setVista('inicio')}
            style={{ cursor: 'pointer' }}
          />
                LearnMatch
            </Navbar.Brand>
            <Nav className='me-auto texto-navbar'>
            <NavDropdown  title="Material de apoyo" id="materialesAprendizaje1" className='mx-2 ua-dropdown-toggle' >
            {Object.entries(uaContents).map(([uaName, options]) => (
                <NavDropdown
                    title={uaName}
                    key={uaName}
                    id={`${uaName.toLowerCase().replace(/\s+/g, '-')}-dropdown`}
                    onMouseEnter={() => setActiveUA(uaName)}
                    onMouseLeave={() => setActiveUA('')}
                    show={activeUA === uaName}
                    className='ua-dropdown-toggle'
                >
                    {Object.entries(options).map(([optionName, url]) => (
                        <NavDropdown.Item key={optionName} onClick={() => handleOpenModal({ type: optionName, url })}>
                            {optionName}
                        </NavDropdown.Item>
                    ))}
                </NavDropdown>
            ))}

            </NavDropdown>
            <Nav.Link  onClick={() => setVista('sobreNosotros')} className="mx-2 texto-navbar" style={{ cursor: 'pointer' }}>Sobre nosotros</Nav.Link>
            </Nav>
            <Nav>
            <Button variant="primary"  onClick={() => setVista('inscribirse')} className="mx-1 btn-inscribete">Inscríbete</Button>
        <Button variant="outline-primary" onClick={() => setVista('login')} className="mx-1 btn-iniciar-sesion">Iniciar Sesión</Button>
            </Nav>
        </Container>
    </Navbar>

                                   
    <Modal  show={showModal} onHide={handleCloseModal} size="xl">
                <Modal.Header    className='fondo-header' closeButton>
                    <Modal.Title>Visualización de {modalContent.type}</Modal.Title>
                </Modal.Header>
                <Modal.Body   className='fondo-modal'>
                {modalContent.type === 'Videos' ? (
        <iframe
            src={modalContent.url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '500px' }}
            title="Video Preview"
        ></iframe>
    ) : (
        <iframe
            src={modalContent.url}
            style={{ width: '100%', height: '500px' }}
            title="Document Preview"
        ></iframe>
    )}
                </Modal.Body>
                <Modal.Footer  className='fondo-footer'>
                    <Button className='btn-modal' variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
                    {modalContent.type !== 'Videos' && (
                        <Button variant="primary" href={modalContent.url} target="_blank" download>Descargar</Button>
                    )}
                </Modal.Footer>
            </Modal>
    </>
    );
}
export default BarraNavegacion;