import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

const DoughnutGraph = (props) => {
  const chartRef = useRef();

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending'],
        datasets: [{
          label: 'My First Dataset',
          data: [props.completed, props.pending],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }, [props.completed, props.pending]);

  return (
    <div>
      <canvas
        id="myChart"
        ref={chartRef}
      />
    </div>
  );
};

export default DoughnutGraph;
