import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Trở về Trang chủ
        </Button>
      }
    />
  );
}

export default PageNotFound;
