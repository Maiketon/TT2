import React, { useRef, useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useCarga } from "./ContextoCarga";
import { jsPDF } from "jspdf";
import axios from 'axios';
import { Button, Container,Row } from 'react-bootstrap';

const RadarChart = () => {
    const chartRef = useRef(null);
    const {setEstaCargando} = useCarga();
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Deficiencias',
                data: [],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
            },
            {
                label: 'Fortalezas',
                data: [],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setEstaCargando(true);
                const response = await axios.get('https://201.124.162.192:3001/api/administracion/datosGraficaMaterias');
                const materias = response.data.map(item => item.NOMBRE_MATERIA);
                const deficiencias = response.data.map(item => parseInt(item.Deficiencias));
                const fortalezas = response.data.map(item => parseInt(item.Fortalezas));

                // Update chartData state in a functional update manner
                setChartData(currentData => ({
                    labels: materias,
                    datasets: [
                        { ...currentData.datasets[0], data: deficiencias },
                        { ...currentData.datasets[1], data: fortalezas }
                    ]
                }));
                setEstaCargando(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const downloadPDF = () => {
        const chart = chartRef.current;
        if (chart) {
            const imgData = chart.toBase64Image();
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 15, 40, 180, 160);
            pdf.save('preferenciasMateriasAlumno.pdf');
        }
    };

    return (
        <>
        <Container>
            <Row><Radar ref={chartRef} data={chartData} /></Row>
            <Row><Button onClick={downloadPDF}>Descargar como PDF</Button></Row>
        </Container>
        </>
    );
}

export default RadarChart;

