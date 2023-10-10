import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { SERVER_URL } from "../data/api";

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } },
};

function Login({ setIsLogin, setActiveUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const postLogin = async (formValues) => {
    try {
      const res = await fetch(`${SERVER_URL}/auth/login`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log("postLogin: ", data);
      if (data.isAuth) {
        message.success(data.msg);
        setIsLogin(data.isAuth);
        setActiveUser(data.username);
        navigate("/");
      } else {
        for (const key in data) {
          if (key === "email" || key === "password") {
            message.error(data[key].msg);
          }
        }
      }
      setLoading(false);
    } catch (err) {
      console.error("postLogin: ", err);
    }
  };

  const onSubmit = (values) => {
    setLoading(true);
    postLogin(values);
  };
  return (
    <div className="container vh-100 pt-4">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: false,
        }}
        onFinish={onSubmit}
        {...formItemLayout}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Vui lòng nhập địa chỉ e-mail hợp lệ",
            },
            {
              required: true,
              message: "Vui lòng nhập địa chỉ e-mail hợp lệ",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Nhập E-mail"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
            {
              min: 8,
              message:
                "Mật khẩu phải có ít nhất 8 kí tự bao gồm chữ, số và kí tự đặc biệt",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Nhập mật khẩu"
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <div className="d-flex justify-content-between">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Nhớ mật khẩu</Checkbox>
            </Form.Item>
            <Link className="login-form-forgot" to="#">
              Quên mật khẩu
            </Link>
          </div>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="login-form-button d-block"
          >
            {loading ? "Loading ..." : "Đăng nhập"}
          </Button>
          <div className="mt-3">
            Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
