import React from "react";
import { Typography, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function PageTitle({
  pageTitle,
  pageIcon,
  setShowForm,
  setEdit,
  isShowButton,
}) {
  return (
    <div className="page-title">
      <Typography.Title level={4} className="mb-0">
        <i className={`${pageIcon} page-icon`}></i>
        {pageTitle}
      </Typography.Title>

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
    </div>
  );
}

export default PageTitle;
