import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const DoughnutGraph = (props) => {
  const chartRef = useRef();

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending'],
        datasets: [{
          label: 'Projects',
          data: [props.completed, props.pending],
          backgroundColor: [
            'rgb(225, 18, 153)' ,
            'rgb(245, 198, 236)',
          ],
          borderColor: [
            'rgb(154, 32, 140)',
            'rgb(154, 32, 140)',
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
