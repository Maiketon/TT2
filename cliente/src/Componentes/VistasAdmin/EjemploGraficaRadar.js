import React, { useRef, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { jsPDF } from "jspdf";

import { Button} from 'react-bootstrap';

const RadarChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }, []);

    const data = {
        labels: ['Calculo', 'Aplicado', 'Web', 'Diseño', 'Programar'],
        datasets: [{
            label: 'Mi primer dataset',
            data: [65, 59, 90, 81, 56],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
        }, {
            label: 'Mi segundo dataset',
            data: [28, 48, 40, 19, 96],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
        }]
    };

    const downloadImage = () => {
        const chart = chartRef.current;
        if (chart) {
            const base64Image = chart.toBase64Image();
            const link = document.createElement('a');
            link.href = base64Image;
            link.download = 'radar-chart.png'; // Nombre del archivo a descargar
            link.click();
        }
    };

    const downloadPDF = () => {
        const chart = chartRef.current;
        if (chart) {
            const imgData = chart.toBase64Image();
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 15, 40, 180, 160); // Ajusta los valores según sea necesario
            pdf.save('radar-chart.pdf');
        }
    };

    return (
        <>
            <Radar ref={chartRef} data={data} />
            <Button onClick={downloadImage}>Descargar como imagen</Button>
            <Button onClick={downloadPDF}>Descargar como PDF</Button>
        </>
    );
}

export default RadarChart;
