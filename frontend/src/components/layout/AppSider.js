import {
  AppstoreOutlined,
  ControlOutlined,
  FileDoneOutlined,
  HomeFilled,
  LoginOutlined,
  PoweroffOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu, message } from "antd";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../data/api";

function AppSider({ isLogin, setIsLogin }) {
  const navigate = useNavigate();
  const rootSubmenuKeys = ["/", "directory", "management", "report"];
  const getMatchingKey = () => {
    if (
      window.location.pathname.includes("project-type") ||
      window.location.pathname.includes("project-status") ||
      window.location.pathname.includes("tech-stack") ||
      window.location.pathname.includes("customer-group")
    ) {
      return ["directory"];
    } else if (
      window.location.pathname.includes("departments") ||
      window.location.pathname.includes("staffs") ||
      window.location.pathname.includes("projects")
    ) {
      return ["management"];
    } else if (
      window.location.pathname.includes("project-quantity") ||
      window.location.pathname.includes("staff-quantity")
    ) {
      return ["report"];
    } else return ["/"];
  };

  const [openKeys, setOpenKeys] = useState(getMatchingKey());
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const postLogout = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/auth/logout`, {
        credentials: "include",
        method: "POST",
      });
      const data = await res.json();
      // console.log("postLogout: ", data);
      if (data.success) {
        message.success(data.msg);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isLogin ? (
        <Menu
          theme="dark"
          className="vh-100 overflow-y-auto position-sticky top-0"
          style={{ zIndex: 90 }}
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[window.location.pathname]}
          defaultSelectedKeys={[window.location.pathname]}
          onClick={(item) => {
            if (item.key === "logout") {
              setIsLogin(false);
              postLogout();
            } else navigate(item.key);
          }}
          items={[
            {
              label: "TRANG CHỦ",
              key: "/",
              icon: <HomeFilled />,
            },
            {
              label: "DANH MỤC",
              key: "directory",
              icon: <AppstoreOutlined />,
              children: [
                {
                  label: "Loại dự án",
                  key: "/project-type",
                },
                {
                  label: "Trạng thái dự án",
                  key: "/project-status",
                },
                {
                  label: "Tech stack",
                  key: "/tech-stack",
                },
                {
                  label: "Nhóm khách hàng",
                  key: "/customer-group",
                },
              ],
            },
            {
              label: "QUẢN LÝ",
              key: "management",
              icon: <ControlOutlined />,
              children: [
                {
                  label: "Bộ phận, phòng ban",
                  key: "/departments",
                },
                {
                  label: "Nhân sự",
                  key: "/staffs",
                },
                {
                  label: "Dự án",
                  key: "/projects",
                },
              ],
            },
            {
              label: "BÁO CÁO",
              key: "report",
              icon: <FileDoneOutlined />,
              children: [
                {
                  label: "Số lượng dự án",
                  key: "/project-quantity",
                },
                {
                  label: "Số lượng nhân sự",
                  key: "/staff-quantity",
                },
              ],
            },
            {
              label: "ĐĂNG XUẤT",
              key: "logout",
              icon: <PoweroffOutlined />,
              danger: true,
            },
          ]}
        />
      ) : (
        <Menu
          theme="dark"
          className="vh-100"
          mode="inline"
          selectedKeys={[window.location.pathname]}
          defaultSelectedKeys={[window.location.pathname]}
          onClick={(item) => navigate(item.key)}
          items={[
            {
              label: "Đăng nhập",
              key: "/login",
              icon: <LoginOutlined />,
            },
            {
              label: "Đăng ký",
              key: "/signup",
              icon: <UserAddOutlined />,
            },
          ]}
        />
      )}
    </>
  );
}

export default AppSider;
