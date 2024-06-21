import React, { useRef, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { jsPDF } from 'jspdf'; // si también quieres incluir la funcionalidad de descarga PDF
import { Button, Container, Row } from 'react-bootstrap'; // Asumiendo el uso de Bootstrap para los botones

const DoughnutChart = () => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        labels: [], // Labels se llenarán dinámicamente con los nombres de las medallas
        datasets: [{
            data: [], // Los datos numéricos también se llenarán dinámicamente
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(233, 30, 99, 0.5)'  // Añade más colores si es necesario
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(233, 30, 99, 1)'  // Añade más colores si es necesario
            ],
            borderWidth: 1
        }]
    });

    useEffect(() => {
        axios.get('https://201.124.152.8:3001/api/administracion/datosGraficaLogros')
            .then(response => {
                const labels = response.data.map(item => `${item.NOMBRE_MEDALLA} (${item.Cantidad})`);
                const data = response.data.map(item => item.Cantidad);
                setChartData(prevData => ({
                    ...prevData,
                    labels: labels,
                    datasets: [{
                        ...prevData.datasets[0],
                        data: data
                    }]
                }));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
        <Container>
          <Row><Doughnut ref={chartRef} data={chartData} /></Row>
          <Row><Button onClick={() => downloadPDF(chartRef)}>Descargar como PDF</Button></Row>
        </Container>
        </>
    );
}

// Función para manejar la descarga de PDF
function downloadPDF(chartRef) {
    if (chartRef.current) {
        const canvas = chartRef.current.canvas;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 180, 160); // Ajusta los valores según necesidad
        pdf.save('medallasReporte.pdf');
    }
}

export default DoughnutChart;
