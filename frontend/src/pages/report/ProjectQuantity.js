import React, { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import { SERVER_URL } from "../../api/api";
import PageTitle from "../../components/UI/PageTitle";
import ProjectStatistic from "../../components/report/ProjectStatistic";
import ColumnChart from "../../components/report/ColumnChart";

const initData = { labels: [], data: [] };

function ProjectQuantity() {
  const [projectTypeChart, setProjectTypeChart] = useState(initData);
  const [projectTechStack, setProjectTechStack] = useState(initData);

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
    getProjectTypeChart();
    getProjectTechStack();
  }, []);

  return (
    <div className="container-fluid py-2">
      <PageTitle
        pageTitle={"Số lượng dự án"}
        pageIcon={"fa-solid fa-cubes"}
        isShowButton={false}
      />

      <Card size="small" className="shadow-sm mb-3">
        <Typography.Title level={5} className="text-center">
          Trạng thái dự án
        </Typography.Title>
        <ProjectStatistic />
      </Card>

      <ColumnChart
        dataChart={projectTypeChart}
        titleChart="Các loại dự án"
        labelColumn="Số dự án"
        colorColumn="#95de64"
      />

      <ColumnChart
        dataChart={projectTechStack}
        titleChart="Số lượng dự án sử dụng mỗi tech stack"
        labelColumn="Số dự án"
        colorColumn="#85a5ff"
      />
    </div>
  );
}

export default ProjectQuantity;
