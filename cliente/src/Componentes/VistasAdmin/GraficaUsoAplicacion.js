import React, { useRef, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import { Button, Container,Row } from 'react-bootstrap';
import axios from 'axios';

const BarChart = () => {
  const chartRef = useRef(null);

  const [chartData, setChartData] = useState({
    labels: ['Uso de la aplicacion'],
    datasets: [
      {
        label: 'Tiempo total de ZegoCloud',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Emparejamientos Totales',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Usuarios con acceso a emparejamiento y soporte',
        data: [],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      },
      {
        label: 'Usuarios Vetados',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/administracion/datosGraficaUsoBoton')
      .then(response => {
        const { sumatiempozg, totalemparejamiento, totalusuariosAyS, totalusuarios6 } = response.data;
        setChartData(prevData => ({
          ...prevData,
          datasets: [
            { ...prevData.datasets[0], data: [sumatiempozg] },
            { ...prevData.datasets[1], data: [totalemparejamiento] },
            { ...prevData.datasets[2], data: [totalusuariosAyS] },
            { ...prevData.datasets[3], data: [totalusuarios6] }
          ]
        }));
      })
      .catch(error => console.error('Error al obtener los datos del gráfico:', error));
  }, []);

  const options = {
    scales: {
      x: {
        type: 'category'
      },
      y: {
        beginAtZero: true
      }
    }
  };

  const downloadPdf = () => {
    if (chartRef.current) {
      const imgData = chartRef.current.toBase64Image();
      const pdf = new jsPDF({
        orientation: "landscape",
      });
      const imgProps= pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('download.pdf');
    }
  };

  return (
    <>
    <Container>
      <Row>  <Bar ref={chartRef} data={chartData} options={options} /></Row>
      <Row><Button onClick={downloadPdf}>Descargar PDF</Button></Row>
    </Container>
    </>
  );
};

export default BarChart;
