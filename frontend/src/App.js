/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Layout, message } from "antd";

import AppHeader from "./components/layout/AppHeader";
import AppSider from "./components/layout/AppSider";
import AppContent from "./components/layout/AppContent";
import AppFooter from "./components/layout/AppFooter";
import { SERVER_URL } from "./api/api";

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  const [menuMobileMode, setMenuMobileMode] = useState(false);

  const getAuth = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/auth/auth`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getAuth: ", data);
      if (data.isAuth === true) {
        setIsLogin(true);
        setActiveUser(data.username);
      } else if (data.isAuth === false) {
        if (
          window.location.pathname === "/signup" ||
          window.location.pathname === "/login"
        ) {
          return null;
        } else if (window.location.pathname === "/") {
          navigate("/login");
        } else {
          message.error(data.msg);
          navigate("/login");
        }
      }
    } catch (err) {
      console.error("getAuth: ", err);
    }
  };
  useEffect(() => {
    getAuth();
  }, []);

  return (
    <Space direction="vertical" className="w-100" size={[0, 48]}>
      <Layout>
        <Layout.Header
          className="d-flex justify-content-between bg-gradient text-white p-3 position-sticky top-0"
          style={{ height: "3rem", zIndex: 100 }}
        >
          <AppHeader
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            activeUser={activeUser}
            menuMobileMode={menuMobileMode}
            setMenuMobileMode={setMenuMobileMode}
          />
        </Layout.Header>
        <Layout>
          <Layout.Sider className="bg-white mobileHidden">
            <AppSider
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              setMenuMobileMode={setMenuMobileMode}
            />
          </Layout.Sider>
          <Layout>
            <Layout.Content
              className="position-relative"
              style={{ minHeight: "91vh" }}
            >
              <AppContent
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                activeUser={activeUser}
                setActiveUser={setActiveUser}
              />
            </Layout.Content>
            <Layout.Footer className="py-2">
              <AppFooter />
            </Layout.Footer>
          </Layout>
        </Layout>
      </Layout>
    </Space>
  );
}

export default App;
