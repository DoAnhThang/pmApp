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

function StaffJoinProject() {
  const [staffJoinProject, setStaffJoinProject] = useState({
    labels: [],
    data: [],
  });

  const getStaffJoinProject = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/report/staff-join-project`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getStaffJoinProject: ", data);
      if (data.success) setStaffJoinProject(data.data);
    } catch (err) {
      console.log("getStaffJoinProject: ", err);
    }
  };
  useEffect(() => {
    getStaffJoinProject();
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
        text: "Số lượng nhân sự tham gia dự án",
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
    labels: staffJoinProject.labels,
    datasets: [
      {
        label: "Số nhân sự",
        data: staffJoinProject.data,
        backgroundColor: "#87e8de",
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

export default StaffJoinProject;
