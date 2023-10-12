import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import { SERVER_URL } from "../../api/api";

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 8 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
};

const initValues = {
  username: null,
  email: null,
  password: null,
  passwordConfirm: null,
  agreement: null,
};

function Signup() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(initValues);

  const postSignup = async (formValues) => {
    try {
      const res = await fetch(`${SERVER_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log("postSignup: ", data);
      if (data.success) {
        message.success(data.msg);
        navigate("/");
      } else {
        for (const key in data) {
          setErrorMsg((prev) => ({ ...prev, [key]: data[key].msg }));
        }
      }
      setLoading(false);
    } catch (err) {
      console.error("postSignup: ", err);
    }
  };

  const onSubmit = (values) => {
    setLoading(true);
    setErrorMsg(initValues);
    postSignup(values);
  };

  return (
    <div className="container vh-100 pt-4">
      <Form
        {...formItemLayout}
        form={form}
        name="signup"
        onFinish={onSubmit}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Tên người dùng"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên người dùng",
              whitespace: true,
            },
            {
              min: 3,
              message: "Tên người dùng phải có ít nhất 3 kí tự",
            },
          ]}
          validateStatus={errorMsg.username && "error"}
          help={errorMsg.username ? errorMsg.username : null}
        >
          <Input placeholder="Nhập tên người dùng" />
        </Form.Item>

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
          validateStatus={errorMsg.email && "error"}
          help={errorMsg.email ? errorMsg.email : null}
        >
          <Input placeholder="Nhập địa chỉ email" />
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
          validateStatus={errorMsg.password && "error"}
          help={errorMsg.password ? errorMsg.password : null}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item
          name="passwordConfirm"
          label="Xác nhận mật khẩu"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp")
                );
              },
            }),
          ]}
          validateStatus={errorMsg.passwordConfirm && "error"}
          help={errorMsg.passwordConfirm ? errorMsg.passwordConfirm : null}
        >
          <Input.Password placeholder="Xác nhận mật khẩu" />
        </Form.Item>

        <Form.Item
          {...tailFormItemLayout}
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        "Vui lòng đồng ý với các điều khoản và điều kiện"
                      )
                    ),
            },
          ]}
          validateStatus={errorMsg.agreement && "error"}
          help={errorMsg.agreement ? errorMsg.agreement : null}
        >
          <Checkbox>
            Tôi đồng ý với <Link to="#">các điều khoản và điều kiện</Link>
          </Checkbox>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? "Loading..." : "Đăng ký"}
          </Button>
          <div className="mt-3">
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signup;
