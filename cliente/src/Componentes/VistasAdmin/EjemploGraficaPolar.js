import React, { useRef, useEffect } from 'react';
import { PolarArea } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PolarAreaChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }, []);

    const data = {
        labels: ['Rojo', 'Azul', 'Amarillo', 'Verde', 'Morado'],
        datasets: [{
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ]
        }]
    };

    return <PolarArea ref={chartRef} data={data} />;
}

export default PolarAreaChart;
