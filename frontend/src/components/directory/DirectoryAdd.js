import React, { useEffect, useState } from "react";
import { Col, Form, Input, Modal, Row, Select, message } from "antd";
import { SERVER_URL } from "../../api/api";

const initValues = {
  name: null,
  short_desc: null,
  long_desc: null,
  priority: null,
  status: null,
};

function DirectoryAdd({
  showForm,
  setShowForm,
  recordDetail,
  edit,
  getDirectories,
  directoryVie,
  directoryEng,
  priority,
}) {
  const [form] = Form.useForm();
  const [errorMsg, setErrorMsg] = useState(initValues);

  useEffect(() => {
    if (edit) form.setFieldsValue(recordDetail);
    else form.resetFields();
    setErrorMsg(initValues);
  }, [form, edit, recordDetail, showForm]);

  // Create / Update
  const addDirectory = async (values, method) => {
    try {
      const res = await fetch(
        `${SERVER_URL}/directory/${directoryEng}/${
          edit ? recordDetail._id : ""
        }`,
        {
          credentials: "include",
          method: method,
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      // console.log("addDirectory: ", data);
      if (data.success) {
        message.success(data.msg);
        setShowForm(false);
        getDirectories();
      } else {
        for (const key in data) {
          setErrorMsg((prev) => ({ ...prev, [key]: data[key].msg }));
        }
      }
    } catch (err) {
      console.error("addDirectory: ", err);
    }
  };

  // submit form
  const handleSubmit = () => {
    setErrorMsg(initValues);
    form
      .validateFields()
      .then((values) => {
        if (edit) addDirectory(values, "PATCH");
        else addDirectory(values, "POST");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={showForm}
      title={
        edit ? `Chỉnh sửa "${recordDetail.name}"` : `Tạo ${directoryVie} mới`
      }
      okText={edit ? "Cập nhật" : "Lưu lại"}
      onOk={handleSubmit}
      cancelText="Đóng"
      onCancel={() => setShowForm(false)}
      centered={true}
      forceRender
      width={800}
    >
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        layout="horizontal"
        name="form"
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Tên"
          rules={[
            {
              required: true,
              message: `Tên ${directoryVie} không được bỏ trống`,
            },
            {
              min: 2,
              message: `Tên ${directoryVie} phải có ít nhất 2 kí tự`,
            },
          ]}
          validateStatus={errorMsg.name && "error"}
          help={errorMsg.name ? errorMsg.name : null}
        >
          <Input placeholder={`Nhập tên ${directoryVie}`} />
        </Form.Item>

        <Form.Item
          name="short_desc"
          label="Mô tả ngắn"
          rules={[
            {
              required: true,
              message: `Mô tả ngắn về ${directoryVie} không được bỏ trống`,
            },
          ]}
          validateStatus={errorMsg.short_desc && "error"}
          help={errorMsg.short_desc ? errorMsg.short_desc : null}
        >
          <Input.TextArea
            rows={2}
            placeholder={`Nhập mô tả ngắn về ${directoryVie}`}
          />
        </Form.Item>

        <Form.Item
          name="long_desc"
          label="Mô tả đầy đủ"
          rules={[
            {
              required: true,
              message: `Mô tả đầy đủ về ${directoryVie} không được bỏ trống`,
            },
          ]}
          validateStatus={errorMsg.long_desc && "error"}
          help={errorMsg.long_desc ? errorMsg.long_desc : null}
        >
          <Input.TextArea
            rows={6}
            placeholder={`Nhập mô tả đầy đủ về ${directoryVie}`}
          />
        </Form.Item>

        <Row gutter={24}>
          <Col span={12}>
            {priority && (
              <Form.Item
                name="priority"
                label="Ưu tiên"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message:
                      "Hãy chọn một mức độ ưu tiên trong khoảng từ 1 đến 4",
                  },
                ]}
                validateStatus={errorMsg.priority && "error"}
                help={errorMsg.priority ? errorMsg.priority : null}
              >
                <Select placeholder="Chọn mức độ ưu tiên">
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                  <Select.Option value="4">4</Select.Option>
                </Select>
              </Form.Item>
            )}
          </Col>

          <Col span={priority ? 12 : 24}>
            <Form.Item
              name="status"
              label="Trạng thái"
              labelCol={priority ? { span: 24 } : { span: 5 }}
              wrapperCol={priority ? { span: 24 } : { span: 10 }}
              rules={[
                {
                  required: true,
                  message: "Hãy chọn một trạng thái",
                },
              ]}
              validateStatus={errorMsg.status && "error"}
              help={errorMsg.status ? errorMsg.status : null}
            >
              <Select placeholder="Chọn trạng thái">
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default DirectoryAdd;
