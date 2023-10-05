import React from "react";
import { Button, Popconfirm, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

function Actions({
  setShowDetail,
  setRecordDetail,
  setShowForm,
  setEdit,
  deleteRecord,
  record,
}) {
  return (
    <Space wrap={false}>
      <Tooltip title="Xem chi tiết">
        <Button
          type="primary"
          shape="circle"
          icon={<EyeOutlined />}
          onClick={() => {
            setShowDetail(true);
            setRecordDetail(record);
          }}
        />
      </Tooltip>
      <Tooltip title="Sửa">
        <Button
          type="dashed"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => {
            setShowForm(true);
            setRecordDetail(record);
            setEdit(true);
          }}
        />
      </Tooltip>
      <Popconfirm
        placement="top"
        title="Bạn có chắc chắn muốn xóa không?"
        okText="Vẫn xóa"
        cancelText="Đóng"
        onConfirm={() => deleteRecord(record._id)}
      >
        <Tooltip title="Xóa">
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </Tooltip>
      </Popconfirm>
    </Space>
  );
}

export default Actions;
