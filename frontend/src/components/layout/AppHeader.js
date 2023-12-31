import {
  MenuUnfoldOutlined,
  ThunderboltFilled,
  BellOutlined,
  DownOutlined,
  UserOutlined,
  SettingFilled,
  // MailOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Drawer,
  List,
  Space,
  Tooltip,
  Avatar,
  Button,
  Dropdown,
} from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AppSider from "./AppSider";

const items = [
  { type: "divider" },
  { key: "0", label: "Hồ sơ", icon: <UserOutlined /> },
  { type: "divider" },
  { key: "1", label: "Cài đặt", icon: <SettingFilled /> },
  { type: "divider" },
];

function AppHeader({
  isLogin,
  setIsLogin,
  activeUser,
  menuMobileMode,
  setMenuMobileMode,
}) {
  const [todos, setTodos] = useState([]);
  const [todosOpen, setTodosOpen] = useState(false);
  const [todosBadge, setTodosBadge] = useState(true);
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

  const displayUsername = () => {
    const splitedUsername = activeUser.split(" ");
    if (splitedUsername.length === 1)
      return splitedUsername[0].slice(0, 2).toUpperCase();
    else if (splitedUsername.length > 1)
      return (
        splitedUsername[0].slice(0, 1).toUpperCase() +
        splitedUsername[1].slice(0, 1).toUpperCase()
      );
  };

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
        <AppSider
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setMenuMobileMode={setMenuMobileMode}
        />
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

      {/* Notification */}
      {isLogin && (
        <Space size={32} className="pt-2">
          <Tooltip title="Thông báo" placement="bottom">
            <Badge
              count={todosBadge ? todos.length : 0}
              offset={[5, 0]}
              size="small"
            >
              <BellOutlined
                onClick={() => {
                  setTodosOpen(true);
                  setTodosBadge(false);
                }}
                className="fs-5 text-white"
              />
            </Badge>
          </Tooltip>
          {/* <Badge count={quotes.length} offset={[5, 0]} className="cursor-pointer">
              <MailOutlined
                className="fs-5 text-white"
                onClick={() => setQuotesOpen(true)}
              />
            </Badge> */}

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

          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <div style={{ marginTop: "-0.75rem" }}>
              <Button type="link">
                <Avatar className="fw-bold border border-2 bg-primary">
                  {displayUsername()}
                </Avatar>
                <DownOutlined />
              </Button>
            </div>
          </Dropdown>
        </Space>
      )}
    </>
  );
}

export default AppHeader;
