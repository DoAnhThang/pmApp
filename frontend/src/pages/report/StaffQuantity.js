import React from "react";

import PageTitle from "../../components/UI/PageTitle";
import { Card, Typography } from "antd";
import StaffStatistic from "../../components/report/StaffStatistic";
import StaffTechStack from "../../components/report/StaffTechStack";
import StaffJoinProject from "../../components/report/StaffJoinProject";

function StaffQuantity() {
  return (
    <div className="container-fluid py-2">
      <PageTitle
        pageTitle={"Số lượng nhân sự"}
        pageIcon={"fa-solid fa-users"}
        isShowButton={false}
      />

      <Card size="small" className="shadow-sm mb-3">
        <Typography.Title level={5} className="text-center">
          Thống kê theo kinh nghiệm
        </Typography.Title>
        <StaffStatistic />
      </Card>

      <StaffTechStack />

      <StaffJoinProject />
    </div>
  );
}

export default StaffQuantity;
