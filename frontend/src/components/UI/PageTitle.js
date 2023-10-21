import React from "react";
import { Typography, Button, Tooltip, Space, Popconfirm, Badge } from "antd";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";

function PageTitle({
  pageTitle,
  pageIcon,
  setShowForm,
  setEdit,
  isShowButton,
  selectedRowKeys,
  deleteRecord,
}) {
  return (
    <Space direction="horizontal" className="page-title">
      <Typography.Title level={4} className="mb-0">
        <i className={`${pageIcon} page-icon`}></i>
        {pageTitle}
      </Typography.Title>

      <Space direction="horizontal" size="large">
        {selectedRowKeys && selectedRowKeys.length > 0 && (
          <Popconfirm
            placement="bottom"
            title="Bạn có chắc chắn muốn xóa không?"
            okText="Vẫn xóa"
            cancelText="Đóng"
            onConfirm={() => deleteRecord(selectedRowKeys)}
          >
            <Tooltip title="Xóa dữ liệu đã chọn">
              <Badge
                count={selectedRowKeys.length}
                offset={[0, 5]}
                size="small"
              >
                <Button shape="circle" icon={<DeleteFilled />} />
              </Badge>
            </Tooltip>
          </Popconfirm>
        )}

        {isShowButton && (
          <Button
            type="primary"
            onClick={() => {
              setShowForm(true);
              setEdit(false);
            }}
            icon={<PlusOutlined />}
          >
            Tạo mới
          </Button>
        )}
      </Space>
    </Space>
  );
}

export default PageTitle;
