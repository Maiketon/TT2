import React, { useEffect, useState, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import Sancion from './SancionComponent';
import axios from 'axios';
import { useCarga } from "./ContextoCarga";
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const Sanciones = () => {
    const [init, setInit] = useState(false);
    const [usuariosReportados, setUsuariosReportados] = useState([]);
    const { setEstaCargando } = useCarga();

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: "#cccccc",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 0.5,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 6,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    useEffect(() => {
        const cargarUsuariosReportados = async () => {
            try {
                setEstaCargando(true);
                const response = await axios.get('https://201.124.152.8:3001/api/administracion/reportesAlum');
                setUsuariosReportados(response.data);
                console.log('Usuarios cargados:', response.data);  // Verificar el contenido del array
                setEstaCargando(false);
            } catch (error) {
                console.error('Error al cargar usuarios reportados', error);
            }
        };

        cargarUsuariosReportados();
    }, []);

    const removeUserFromList = (pkUsuario) => {
        setUsuariosReportados(prevUsuarios => prevUsuarios.filter(usuario => usuario.PK_USUARIO !== pkUsuario));
        console.log('Usuario eliminado:', pkUsuario);
    };

    return (
        <>
            <div className="particles-container">
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={options}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Container style={{ width: '50%', maxWidth: '800px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    {usuariosReportados.map(usuario => (
                        <Sancion key={usuario.PK_USUARIO} usuario={usuario} onRemoveUser={removeUserFromList} />
                    ))}
                </Container>
            </div>
        </>
    );
}

export default Sanciones;
