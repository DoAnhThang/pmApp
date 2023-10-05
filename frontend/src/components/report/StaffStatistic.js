import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import DashboardCard from "../UI/DashboardCard";
import { SERVER_URL } from "../../data/api";

function StaffStatistic() {
  const [staffStatistic, setStaffStatistic] = useState({
    totalStaffs: 0,
    seniorStaffs: 0,
    middleStaffs: 0,
    juniorStaffs: 0,
    fresherStaffs: 0,
  });

  const getStaffStatistic = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/report/staff-statistic`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getStaffStatistic: ", data);
      if (data.success) setStaffStatistic(data.data);
    } catch (err) {
      console.error("getStaffStatistic: ", err);
    }
  };

  useEffect(() => {
    getStaffStatistic();
  }, []);

  return (
    <Row gutter={[12, 12]} justify="center" className="mb-3">
      <Col className="gutter-row" xs={24} sm={{ span: 6, order: 1 }} xl={4}>
        <DashboardCard
          icon={
            <i
              className="fa-solid fa-user-group rounded-circle fs-4 p-2"
              style={{
                color: "blue",
                backgroundColor: "#91caff",
              }}
            />
          }
          title={"Tổng"}
          value={staffStatistic.totalStaffs}
        />
      </Col>
      <Col className="gutter-row" xs={24} sm={6} xl={4}>
        <DashboardCard
          icon={
            <i
              className="fa-solid fa-user-secret rounded-circle fs-4 p-2"
              style={{
                color: "green",
                backgroundColor: "#b7eb8f",
              }}
            />
          }
          title={"Senior"}
          value={staffStatistic.seniorStaffs}
        />
      </Col>
      <Col className="gutter-row" xs={24} sm={6} xl={4}>
        <DashboardCard
          icon={
            <i
              className="fa-solid fa-user-tie rounded-circle fs-4 p-2"
              style={{
                color: "#08979c",
                backgroundColor: "#87e8de",
              }}
            />
          }
          title={"Middle"}
          value={staffStatistic.middleStaffs}
        />
      </Col>
      <Col className="gutter-row" xs={24} sm={6} xl={4}>
        <DashboardCard
          icon={
            <i
              className="fa-solid fa-user rounded-circle fs-4 p-2"
              style={{
                color: "orange",
                backgroundColor: "#ffd591",
              }}
            />
          }
          title={"Junior"}
          value={staffStatistic.juniorStaffs}
        />
      </Col>
      <Col className="gutter-row" xs={24} sm={6} xl={4}>
        <DashboardCard
          icon={
            <i
              className="fa-regular fa-user rounded-circle fs-4 p-2"
              style={{
                color: "#fadb14",
                backgroundColor: "#fffb8f",
              }}
            />
          }
          title={"Fresher"}
          value={staffStatistic.fresherStaffs}
        />
      </Col>
    </Row>
  );
}

export default StaffStatistic;
