import React, { useRef, useEffect, useState } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { useCarga } from "./ContextoCarga";
import Chart from 'chart.js/auto';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { Button, Container,Row } from 'react-bootstrap';  // Asumiendo que estás usando React-Bootstrap

const PolarAreaChart = () => {
    
    const chartRef = useRef(null);
    const { setEstaCargando } = useCarga();
    const [chartData, setChartData] = useState({
        labels: ['Totales','Pendientes', 'Finalizados', 'Activos'],
        datasets: [{
            data: [], 
            backgroundColor: [
                'rgba(234, 211, 86, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ]
        }]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setEstaCargando(true);
                const response = await axios.get('http://localhost:3001/api/administracion/datosEmparejameintosT');
                setChartData(prevData => ({
                    ...prevData,
                    datasets: [{
                        ...prevData.datasets[0],
                        data: [
                            response.data.registroTotalEmp,
                            response.data.registrosPendientes,
                            response.data.registrosFinalizados,
                            response.data.registrosActivos
                        ]
                    }]
                }));
                setEstaCargando(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            if (chartRef.current) {
              chartRef.current.destroy();
            }
        };
    }, []);

    const downloadPDF = () => {
        if (chartRef.current) {
            const canvas = chartRef.current.canvas;
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);  // Ajusta los márgenes y dimensiones según sea necesario
            pdf.save('emparejamientosTotalesReporte.pdf');
        }
    };

    return (
        <>
        <Container>
            <Row><PolarArea ref={chartRef} data={chartData} /></Row>
            <Row><Button onClick={downloadPDF} style={{ marginTop: '10px' }}>Descargar como PDF</Button></Row>
        </Container>
            
            
        </>
    );
}

export default PolarAreaChart;
