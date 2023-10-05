import React from "react";
import { Descriptions, Modal, Tag, Tooltip } from "antd";

function StaffDetail({
  showDetail,
  setShowDetail,
  recordDetail,
  getProjectDetail,
  setShowProjectDetail,
}) {
  const labels = {
    name: "Tên",
    dob: "Ngày sinh",
    phone_number: "Số điện thoại",
    level: "Level",
    gender: "Giới tính",
    department: "Bộ phận",
    tech_stacks: "Các teck stack",
    projects: "Dự án tham gia",
  };

  return (
    <Modal
      open={showDetail}
      title={`Chi tiết về nhân viên "${recordDetail.name}"`}
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
          if (key === "gender")
            return (
              <Descriptions.Item key={key} label={labels[key] || key}>
                {value === "female" ? "Nữ" : "Nam"}
              </Descriptions.Item>
            );
          if (key === "department")
            return (
              <Descriptions.Item key={key} label={labels[key] || key}>
                {value.length > 0 ? value[0].name : ""}
              </Descriptions.Item>
            );
          if (key === "tech_stacks")
            return (
              <Descriptions.Item key={key} label={labels[key] || key}>
                {value.map((tag, index) => (
                  <Tag key={index}>
                    {tag.tech_stack_id.name} ({tag.exp}y)
                  </Tag>
                ))}
              </Descriptions.Item>
            );
          if (key === "projects")
            return (
              <Descriptions.Item key={key} label={labels[key] || key}>
                {value.map((tag) => (
                  <Tooltip key={tag._id} title="Click để xem chi tiết">
                    <Tag
                      className="cursor-pointer scale-hover"
                      onClick={() => {
                        getProjectDetail(tag._id);
                        setShowDetail(false);
                        setShowProjectDetail(true);
                      }}
                    >
                      {tag.name}
                    </Tag>
                  </Tooltip>
                ))}
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

export default StaffDetail;
