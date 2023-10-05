import React from "react";
import { Descriptions, Modal } from "antd";
import TagDisplay from "../UI/TagDisplay";

function ProjectDetail({ showDetail, setShowDetail, recordDetail }) {
  const labels = {
    name: "Tên",
    startTime: "Ngày bắt đầu",
    endTime: "Ngày kết thúc",
    project_type: "Loại dự án",
    project_status: "Trạng thái dự án",
    customer_group: "Nhóm khách hàng",
    tech_stacks: "Các teck stack",
    departments: "Bộ phận tham gia",
    staffs: "Nhân viên tham gia",
  };

  return (
    <Modal
      open={showDetail}
      title={`Chi tiết về dự án "${recordDetail.name}"`}
      okButtonProps={{ style: { display: "none" } }}
      cancelText="Đóng"
      onCancel={() => setShowDetail(false)}
      centered={true}
      width={800}
    >
      <Descriptions
        bordered
        column={1}
        size={"small"}
        style={{ whiteSpace: "pre-line" }}
      >
        {Object.entries(recordDetail).map(([key, value]) => {
          if (
            key === "_id" ||
            key === "createdAt" ||
            key === "updatedAt" ||
            key === "__v" ||
            key === "key"
          )
            return null;
          if (
            key === "project_type" ||
            key === "project_status" ||
            key === "customer_group"
          )
            return (
              <Descriptions.Item key={key} label={labels[key] || key}>
                {value.length > 0 ? value[0].name : ""}
              </Descriptions.Item>
            );
          if (
            key === "tech_stacks" ||
            key === "departments" ||
            key === "staffs"
          )
            return (
              <Descriptions.Item key={key} label={labels[key] || key}>
                <TagDisplay tags={value} maxTags={5} />
              </Descriptions.Item>
            );
          return (
            <Descriptions.Item key={key} label={labels[key] || key}>
              {value}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </Modal>
  );
}

export default ProjectDetail;
