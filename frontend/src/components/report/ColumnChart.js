import React from "react";
import { Card, Col, Row } from "antd";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ColumnChart({ dataChart, titleChart, labelColumn, colorColumn }) {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: titleChart,
        font: {
          size: 16,
          family: "Roboto",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grace: 1,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const data = {
    labels: dataChart.labels,
    datasets: [
      {
        label: labelColumn,
        data: dataChart.data,
        backgroundColor: colorColumn,
        barThickness: 20,
      },
    ],
  };

  return (
    <Row>
      <Col span={24}>
        <Card size="small" className="shadow-sm mb-3">
          <Bar options={options} data={data} style={{ height: "300px" }} />
        </Card>
      </Col>
    </Row>
  );
}

export default ColumnChart;
