import { Modal, Descriptions } from "antd";
import React from "react";

function DirectoryDetail({ showDetail, setShowDetail, recordDetail }) {
  const labels = {
    name: "Tên",
    short_desc: "Mô tả ngắn",
    long_desc: "Mô tả đầy đủ",
    priority: "Ưu tiên",
    status: "Trạng thái",
  };

  return (
    <Modal
      open={showDetail}
      title={`Chi tiết về "${recordDetail.name}"`}
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

export default DirectoryDetail;
