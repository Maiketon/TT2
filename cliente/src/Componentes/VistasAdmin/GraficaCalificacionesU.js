import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { useCarga } from "./ContextoCarga";
import Chart from 'chart.js/auto';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { Button, Container, Row } from 'react-bootstrap'; // Asumiendo que estás usando React Bootstrap

const MyBarChart = () => {
  const {setEstaCargando} = useCarga();
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: ["0.0-1", "1.1-2", "2.1-3", "3.1-4", "4.1-5"], // Rangos de calificación
    datasets: [
      {
        label: 'Calificación General',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Rol-Aprendiz',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Rol-Enseñante',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ]
  });

  useEffect(() => {
    setEstaCargando(true);
    axios.get('https://201.124.154.2:3001/api/administracion/datosGraficaCalf')
      .then(response => {
        const data = response.data[0];
        setChartData({
          labels: chartData.labels,
          datasets: [
            {
              label: 'Calificación General',
              data: [
                data.UsuariosCalifGeneral_0_1,
                data.UsuariosCalifGeneral_1_2,
                data.UsuariosCalifGeneral_2_3,
                data.UsuariosCalifGeneral_3_4,
                data.UsuariosCalifGeneral_4_5
              ],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Rol-Aprendiz',
              data: [
                data.UsuariosCalifAprendiz_0_1,
                data.UsuariosCalifAprendiz_1_2,
                data.UsuariosCalifAprendiz_2_3,
                data.UsuariosCalifAprendiz_3_4,
                data.UsuariosCalifAprendiz_4_5
              ],
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
              label: 'Rol-Enseñante',
              data: [
                data.UsuariosCalifMentor_0_1,
                data.UsuariosCalifMentor_1_2,
                data.UsuariosCalifMentor_2_3,
                data.UsuariosCalifMentor_3_4,
                data.UsuariosCalifMentor_4_5
              ],
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }
          ]
        });
        setEstaCargando(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const downloadPDF = () => {
    if (chartRef && chartRef.current) {
      const canvas = chartRef.current.canvas;
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 95);
      pdf.save('calificacionesReporte.pdf');
    }
  };

  return (
    <>
    <Container>
        <Row><Bar ref={chartRef} data={chartData} /></Row>
        <Row><Button onClick={downloadPDF} style={{ marginTop: '10px' }}>Descargar como PDF</Button></Row>
    </Container>
      
      
    </>
  );
};

export default MyBarChart;
