import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import {
  CarryOutOutlined,
  FieldTimeOutlined,
  FileSearchOutlined,
  FundOutlined,
  ProjectOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import DashboardCard from "../UI/DashboardCard";
import { SERVER_URL } from "../../api/api";

function ProjectStatistic() {
  const [projectStatistic, setProjectStatistic] = useState({
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
    waitingProjects: 0,
    pendingProjects: 0,
    problematicProjects: 0,
  });

  const getProjectStatistic = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/report/project-statistic`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getProjectStatistic: ", data);
      if (data.success) setProjectStatistic(data.data);
    } catch (err) {
      console.error("getProjectStatistic: ", err);
    }
  };

  useEffect(() => {
    getProjectStatistic();
  }, []);

  return (
    <Row gutter={[12, 12]} justify="space-between" className="mb-3">
      <Col className="gutter-row" xs={24} sm={12} lg={8} xxl={4}>
        <DashboardCard
          icon={
            <ProjectOutlined
              className="rounded-circle fs-4 p-2"
              style={{
                color: "blue",
                backgroundColor: "#91caff",
              }}
            />
          }
          title={"Tổng số dự án"}
          value={projectStatistic.totalProjects}
        />
      </Col>
      <Col className="gutter-row" xs={24} sm={12} lg={8} xxl={4}>
        <DashboardCard
          icon={
            <CarryOutOutlined
              className="rounded-circle fs-4 p-2"
              style={{
                color: "green",
                backgroundColor: "#b7eb8f",
              }}
            />
          }
          title={"Đã hoàn thành"}
          value={projectStatistic.completedProjects}
        />
      </Col>
      <Col className="gutter-row" xs={24} sm={12} lg={8} xxl={4}>
        <DashboardCard
          icon={
            <FieldTimeOutlined
              className="rounded-circle fs-4 p-2"
              style={{
                color: "#08979c",
                backgroundColor: "#87e8de",
              }}
            />
          }
          title={"Đang tiến hành"}
          value={projectStatistic.inProgressProjects}
        />
      </Col>
      <Col className="gutter-row" xs={24} sm={12} lg={8} xxl={4}>
        <DashboardCard
          icon={
            <FundOutlined
              className="rounded-circle fs-4 p-2"
              style={{
                color: "orange",
                backgroundColor: "#ffd591",
              }}
            />
          }
          title={"Chưa bắt đầu"}
          value={projectStatistic.waitingProjects}
        />
      </Col>
      <Col className="gutter-row" xs={24} sm={12} lg={8} xxl={4}>
        <DashboardCard
          icon={
            <FileSearchOutlined
              className="rounded-circle fs-4 p-2"
              style={{
                color: "magenta",
                backgroundColor: "#ffadd2",
              }}
            />
          }
          title={"Đang chờ duyệt"}
          value={projectStatistic.pendingProjects}
        />
      </Col>
      <Col className="gutter-row" xs={24} sm={12} lg={8} xxl={4}>
        <DashboardCard
          icon={
            <WarningOutlined
              className="rounded-circle fs-4 p-2"
              style={{
                color: "red",
                backgroundColor: "#ffa39e",
              }}
            />
          }
          title={"Gặp vấn đề"}
          value={projectStatistic.problematicProjects}
        />
      </Col>
    </Row>
  );
}

export default ProjectStatistic;
