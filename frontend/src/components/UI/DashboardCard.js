import React from "react";
import { Card, Space, Statistic } from "antd";

function DashboardCard({ title, value, icon }) {
  return (
    <Card size="small">
      <Space direction="horizontal" size="large">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

export default DashboardCard;
