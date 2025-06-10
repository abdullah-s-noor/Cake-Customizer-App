import { Card, CardContent, Typography } from '@mui/material';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
// import LoadingChart from '../generalcomponent/LoadingChart ';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

function ProjectStatusChart({ data, loading, title, chartType = 'doughnut' }) {
  const chartRef = useRef(null);

  const calculateStep = (maxValue) => Math.max(1, Math.ceil(maxValue / 10));

  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    if (chartRef.current && data) {
      const maxDataValue = Math.max(...data.datasets[0].data);
      const maxValue = maxDataValue > 10 ? maxDataValue : 10;

      const stepSize = calculateStep(maxValue);

      let chartOptions = {
        responsive: true,
        plugins: {
          tooltip: { enabled: true },
          legend: { position: 'top' },
        },
      };

      if (chartType === 'bar') {
        chartOptions = {
          ...chartOptions,
          scales: {
            y: {
              beginAtZero: true, 
              ticks: {
                stepSize: stepSize, 
                precision: 0, 
                min: 0, 
                max: maxValue, 
              },
            },
          },
        };
      }

      chartRef.current.chart = new Chart(chartRef.current, {
        type: chartType,
        data: data,
        options: chartOptions,
      });
    }

    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, [data, loading, chartType]);

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          {title}
        </Typography>
        {loading ? (
          <LoadingChart />
        ) : (
          <canvas ref={chartRef} />
        )}
      </CardContent>
    </Card>
  );
}

export default ProjectStatusChart;