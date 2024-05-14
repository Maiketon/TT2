import React, { useRef, useEffect, useState } from 'react';
import { PolarArea } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';

const PolarAreaChart = () => {
    const chartRef = useRef(null);
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

    return <PolarArea ref={chartRef} data={chartData} />;
}

export default PolarAreaChart;
