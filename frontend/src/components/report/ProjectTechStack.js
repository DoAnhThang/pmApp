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

function ProjectTechStack() {
  const [projectTechStack, setProjectTechStack] = useState({
    labels: [],
    data: [],
  });

  const getProjectTechStack = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/report/project-tech-stack`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getProjectTechStack: ", data);
      if (data.success) setProjectTechStack(data.data);
    } catch (err) {
      console.log("getProjectTechStack: ", err);
    }
  };
  useEffect(() => {
    getProjectTechStack();
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
        text: "Số lượng dự án sử dụng mỗi tech stack",
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
    labels: projectTechStack.labels,
    datasets: [
      {
        label: "Số dự án",
        data: projectTechStack.data,
        backgroundColor: "#85a5ff",
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

export default ProjectTechStack;
