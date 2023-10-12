import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { SERVER_URL } from "../../api/api";

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

function StaffTechStack() {
  const [staffTechStack, setStaffTechStack] = useState({
    labels: [],
    data: [],
  });

  const getStaffTechStack = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/report/staff-tech-stack`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getStaffTechStack: ", data);
      if (data.success) setStaffTechStack(data.data);
    } catch (err) {
      console.log("getStaffTechStack: ", err);
    }
  };
  useEffect(() => {
    getStaffTechStack();
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
        text: "Số lượng nhân sự sử dụng mỗi tech stack",
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
    labels: staffTechStack.labels,
    datasets: [
      {
        label: "Số nhân sự",
        data: staffTechStack.data,
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

export default StaffTechStack;
