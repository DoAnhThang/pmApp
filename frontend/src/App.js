/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Layout, message } from "antd";

import AppHeader from "./components/layout/AppHeader";
import AppSider from "./components/layout/AppSider";
import AppContent from "./components/layout/AppContent";
import AppFooter from "./components/layout/AppFooter";
import { SERVER_URL } from "./data/api";

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [activeUser, setActiveUser] = useState("anonymous");

  const getAuth = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/auth/auth`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getAuth: ", data);
      if (data.isAuth) {
        setIsLogin(true);
        setActiveUser(data.username);
      } else {
        message.error(data.msg);
        navigate("/");
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
          className="d-flex justify-content-between bg-gradient text-white ps-3 pe-5"
          style={{ height: "3rem" }}
        >
          <AppHeader isLogin={isLogin} setIsLogin={setIsLogin} />
        </Layout.Header>
        <Layout>
          <Layout.Sider className="bg-white mobileHidden">
            <AppSider isLogin={isLogin} setIsLogin={setIsLogin} />
          </Layout.Sider>
          <Layout>
            <Layout.Content>
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
