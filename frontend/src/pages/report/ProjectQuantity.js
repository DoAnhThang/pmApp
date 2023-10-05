import React from "react";
import { Card, Typography } from "antd";
import PageTitle from "../../components/UI/PageTitle";
import ProjectStatistic from "../../components/report/ProjectStatistic";
import ProjectTypeChart from "../../components/report/ProjectTypeChart";
import ProjectTechStack from "../../components/report/ProjectTechStack";

function ProjectQuantity() {
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

      <ProjectTypeChart />

      <ProjectTechStack />
    </div>
  );
}

export default ProjectQuantity;
