import React, { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import { SERVER_URL } from "../../api/api";
import PageTitle from "../../components/UI/PageTitle";
import StaffStatistic from "../../components/report/StaffStatistic";
import ColumnChart from "../../components/report/ColumnChart";

const initData = { labels: [], data: [] };

function StaffQuantity() {
  const [staffJoinProject, setStaffJoinProject] = useState(initData);
  const [staffTechStack, setStaffTechStack] = useState(initData);

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
    getStaffJoinProject();
    getStaffTechStack();
  }, []);

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

      <ColumnChart
        dataChart={staffJoinProject}
        titleChart="Số lượng nhân sự tham gia dự án"
        labelColumn="Số nhân sự"
        colorColumn="#95de64"
      />

      <ColumnChart
        dataChart={staffTechStack}
        titleChart="Số lượng nhân sự sử dụng mỗi tech stack"
        labelColumn="Số nhân sự"
        colorColumn="#85a5ff"
      />
    </div>
  );
}

export default StaffQuantity;
