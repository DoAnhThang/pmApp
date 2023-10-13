import React from "react";
import { Descriptions, Modal } from "antd";
import TagDisplay from "../../UI/TagDisplay";

function DepartmentDetail({ showDetail, setShowDetail, recordDetail }) {
  const labels = {
    name: "Tên",
    feature: "Chức năng, nhiệm vụ",
    tech_stacks: "Các teck stack",
    projects: "Các dự án",
    staffs: "Nhân viên",
  };

  return (
    <Modal
      open={showDetail}
      title={`Chi tiết về bộ phận "${recordDetail.name}"`}
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
          if (key === "tech_stacks" || key === "projects" || key === "staffs")
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

export default DepartmentDetail;
