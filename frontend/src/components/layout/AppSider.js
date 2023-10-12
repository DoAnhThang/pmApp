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
import { SERVER_URL } from "../../api/api";

function AppSider({ isLogin, setIsLogin }) {
  const navigate = useNavigate();
  const getMatchingKey = () => {
    if (
      window.location.pathname === "/project-type" ||
      window.location.pathname === "/project-status" ||
      window.location.pathname === "/tech-stack" ||
      window.location.pathname === "/customer-group"
    ) {
      return ["directory"];
    } else if (
      window.location.pathname === "/departments" ||
      window.location.pathname === "/staffs" ||
      window.location.pathname === "/projects"
    ) {
      return ["management"];
    } else if (
      window.location.pathname === "/project-quantity" ||
      window.location.pathname === "/staff-quantity"
    ) {
      return ["report"];
    }
  };

  const [openKeys, setOpenKeys] = useState(getMatchingKey());
  // const rootSubmenuKeys = ["/", "directory", "management", "report"];
  const onOpenChange = (keys) => {
    setOpenKeys(keys);
    // const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    // if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //   setOpenKeys(keys);
    // } else {
    //   setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    // }
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
        setIsLogin(false);
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
          mode="inline"
          className="vh-100 overflow-y-auto position-sticky top-0"
          openKeys={openKeys}
          selectedKeys={[window.location.pathname]}
          onOpenChange={onOpenChange}
          onClick={(item) => {
            if (item.key === "logout") postLogout();
            else navigate(item.key);
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
