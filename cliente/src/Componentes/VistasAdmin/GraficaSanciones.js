import React, { useRef, useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { useCarga } from "./ContextoCarga";
import { Container, Row, Button } from 'react-bootstrap';

const PieChart = () => {
  const chartRef = useRef(null);
  const { setEstaCargando } = useCarga();
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
    setEstaCargando(true);
    axios.get('https://201.124.187.222:3001/api/administracion/datosSanciones')
      .then(response => {
        const sanciones0 = response.data.sanciones0 ?? 0;
        const sanciones1 = response.data.sanciones1 ?? 0;
        const sanciones2 = response.data.sanciones2 ?? 0;
        const sanciones3 = response.data.sanciones3 ?? 0;

        const data = [sanciones0, sanciones1, sanciones2, sanciones3];
        const labels = [
          `0 Sanciones (${sanciones0})`,
          `1 Sanción (${sanciones1})`,
          `2 Sanciones (${sanciones2})`,
          `3 Sanciones (${sanciones3})`
        ];

        setChartData(prevData => ({
          ...prevData,
          labels: labels,
          datasets: [{
            ...prevData.datasets[0],
            data: data
          }]
        }));
        setEstaCargando(false);
      })
      .catch(error => {
        console.error('Error al obtener los datos del gráfico:', error);
        setEstaCargando(false);
      });
  }, [setEstaCargando]);

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

    const scaleFactor = Math.min(
      pdfWidth / imgProps.width,
      pdfHeight / imgProps.height
    );

    const scaledWidth = imgProps.width * scaleFactor;
    const scaledHeight = imgProps.height * scaleFactor;

    const xPosition = (pdfWidth - scaledWidth) / 2;
    const yPosition = (pdfHeight - scaledHeight) / 2;

    pdf.addImage(imgData, 'PNG', xPosition, yPosition, scaledWidth, scaledHeight);
    pdf.save('reporteSanciones.pdf');
  };

  return (
    <Container>
      <Row><Pie ref={chartRef} data={chartData} /></Row>
      <Row><Button onClick={downloadPdf}>Descargar PDF</Button></Row>
    </Container>
  );
}

export default PieChart;
