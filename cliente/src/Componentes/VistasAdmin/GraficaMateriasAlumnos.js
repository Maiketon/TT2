import React, { useRef, useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { useCarga } from "./ContextoCarga";
import { jsPDF } from "jspdf";
import axios from 'axios';
import { Button, Container, Row } from 'react-bootstrap';

const RadarChart = () => {
  const chartRef = useRef(null);
  const { setEstaCargando } = useCarga();
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

  const [options, setOptions] = useState({
    scales: {
      r: {
        ticks: {
          callback: (value) => value.toString(),
        },
        pointLabels: {
          callback: function (value) {
            return value.split('\n');
          }
        }
      }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setEstaCargando(true);
        const response = await axios.get('https://201.124.183.3:3001/api/administracion/datosGraficaMaterias');

        const labels = response.data.map(item => {
          const deficiencias = item.Deficiencias ?? 0;
          const fortalezas = item.Fortalezas ?? 0;
          return `${item.NOMBRE_MATERIA}\n(D: ${deficiencias}, F: ${fortalezas})`;
        });

        const deficiencias = response.data.map(item => item.Deficiencias ?? 0);
        const fortalezas = response.data.map(item => item.Fortalezas ?? 0);

        setChartData(currentData => ({
          labels: labels,
          datasets: [
            { ...currentData.datasets[0], data: deficiencias },
            { ...currentData.datasets[1], data: fortalezas }
          ]
        }));
        setEstaCargando(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setEstaCargando(false);
      }
    };

    fetchData();
  }, [setEstaCargando]);

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
    <Container>
      <Row><Radar ref={chartRef} data={chartData} options={options} /></Row>
      <Row><Button onClick={downloadPDF}>Descargar como PDF</Button></Row>
    </Container>
  );
}

export default RadarChart;
