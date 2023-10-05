import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { SERVER_URL } from "../../data/api";

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

function ProjectTypeChart() {
  const [projectTypeChart, setProjectTypeChart] = useState({
    labels: [],
    data: [],
  });

  const getProjectTypeChart = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/report/project-type-chart`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getProjectTypeChart: ", data);
      if (data.success) setProjectTypeChart(data.data);
    } catch (err) {
      console.log("getProjectTypeChart: ", err);
    }
  };
  useEffect(() => {
    getProjectTypeChart();
  }, []);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Các loại dự án",
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
    labels: projectTypeChart.labels,
    datasets: [
      {
        label: "Số dự án",
        data: projectTypeChart.data,
        backgroundColor: "#95de64",
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

export default ProjectTypeChart;
