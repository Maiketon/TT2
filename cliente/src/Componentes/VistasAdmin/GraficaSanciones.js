import React, { useRef, useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { Container, Row ,Button} from 'react-bootstrap';

const PieChart = () => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        labels: ['0 Sanciones', '1 Sancion', '2 Sanciones', '3 Sanciones'],
        datasets: [{
            label: 'Distribución de Sanciones',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    });

    useEffect(() => {
        axios.get('http://localhost:3001/api/administracion/datosSanciones')
            .then(response => {
                const data = [
                    response.data.sanciones0,
                    response.data.sanciones1,
                    response.data.sanciones2,
                    response.data.sanciones3
                ];
                setChartData(prevData => ({
                    ...prevData,
                    datasets: [{
                        ...prevData.datasets[0],
                        data: data
                    }]
                }));
            })
            .catch(error => console.error('Error al obtener los datos del gráfico:', error));
    }, []);

    const downloadPdf = () => {
        const imgData = chartRef.current.toBase64Image();
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: 'px',
            format: 'a4'
        });
    
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
    
        // Calcular el factor de escala para mantener la proporción de la imagen dentro del PDF
        const scaleFactor = Math.min(
            pdfWidth / imgProps.width,   // Escala basada en el ancho
            pdfHeight / imgProps.height  // Escala basada en la altura
        );
    
        const scaledWidth = imgProps.width * scaleFactor;
        const scaledHeight = imgProps.height * scaleFactor;
    
        // Centrar la imagen en la página
        const xPosition = (pdfWidth - scaledWidth) / 2;
        const yPosition = (pdfHeight - scaledHeight) / 2;
    
        pdf.addImage(imgData, 'PNG', xPosition, yPosition, scaledWidth, scaledHeight);
        pdf.save('graficaSanciones.pdf');
    };
    

    return (
        <>
        <Container>
            <Row><Pie ref={chartRef} data={chartData} /></Row>
            <Row> <Button onClick={downloadPdf}>Descargar PDF</Button></Row>
        </Container>
        </>
    );
}

export default PieChart;
