import {
  MenuUnfoldOutlined,
  ThunderboltFilled,
  BellOutlined,
  // MailOutlined,
} from "@ant-design/icons";
import { Badge, Drawer, List, Space, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AppSider from "./AppSider";

function AppHeader({ isLogin, setIsLogin }) {
  const [menuMobileMode, setMenuMobileMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todosOpen, setTodosOpen] = useState(false);
  // const [quotes, setQuotes] = useState([]);
  // const [quotesOpen, setQuotesOpen] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data.todos));
    // fetch("https://dummyjson.com/quotes")
    //   .then((res) => res.json())
    //   .then((data) => setQuotes(data.quotes));
  }, []);

  return (
    <>
      {/* Menu for mobile mode */}
      <h4
        className="align-self-center cursor-pointer mb-0 mt-1 mobileVisible"
        onClick={() => setMenuMobileMode(true)}
      >
        <MenuUnfoldOutlined />
      </h4>
      <Drawer
        title="Project Management App"
        open={menuMobileMode}
        onClose={() => setMenuMobileMode(false)}
        placement="left"
        maskClosable
        style={{ backgroundColor: "#001529" }}
      >
        <AppSider isLogin={isLogin} setIsLogin={setIsLogin} />
      </Drawer>

      {/* Logo */}
      <div className="d-flex align-items-center">
        <ThunderboltFilled className="fs-4" />
        <NavLink
          to="/"
          className="text-decoration-none text-white ms-1 mb-0"
          style={{
            fontFamily: "Alfa Slab One",
            letterSpacing: "2px",
          }}
        >
          PM APP
        </NavLink>
      </div>

      {/* Announcement */}
      {isLogin && (
        <>
          <Space className="d-flex gap-4 pt-3">
            <Tooltip title="Thông báo" placement="bottom">
              <Badge
                count={todos.length}
                offset={[5, 0]}
                className="cursor-pointer"
              >
                <BellOutlined
                  className="fs-5 text-white"
                  onClick={() => setTodosOpen(true)}
                />
              </Badge>
            </Tooltip>
            {/* <Badge count={quotes.length} offset={[5, 0]} className="cursor-pointer">
              <MailOutlined
                className="fs-5 text-white"
                onClick={() => setQuotesOpen(true)}
              />
            </Badge> */}
          </Space>

          <Drawer
            title="Todos"
            open={todosOpen}
            onClose={() => setTodosOpen(false)}
            maskClosable
          >
            <List
              dataSource={todos}
              renderItem={(item) => <List.Item>{item.todo}</List.Item>}
            ></List>
          </Drawer>

          {/* <Drawer
            title="Quotes"
            open={quotesOpen}
            onClose={() => setQuotesOpen(false)}
            maskClosable
          >
            <List
              dataSource={quotes}
              renderItem={(item) => (
                <List.Item className="flex-column">
                  <Typography.Title level={5}>{item.quote}</Typography.Title>
                  <Typography.Text>-- {item.author} --</Typography.Text>
                </List.Item>
              )}
            ></List>
          </Drawer> */}
        </>
      )}
    </>
  );
}

export default AppHeader;
