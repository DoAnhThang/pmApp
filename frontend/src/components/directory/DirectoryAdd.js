import React, { useEffect } from "react";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { SERVER_URL } from "../../data/api";

const initFormAdd = {
  name: "",
  short_desc: "",
  long_desc: "",
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

  useEffect(() => {
    if (edit) form.setFieldsValue(recordDetail);
    else form.setFieldsValue(initFormAdd);
  }, [form, edit, recordDetail]);

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
      console.log("addDirectory: ", data);
      getDirectories();
    } catch (err) {
      console.error("addDirectory: ", err);
    }
  };

  // submit form
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        if (edit) addDirectory(values, "PATCH");
        else addDirectory(values, "POST");
        setShowForm(false);
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
        name="formAdd"
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
        >
          <Input placeholder={`Nhập tên ${directoryVie}`} />
        </Form.Item>

        <Form.Item
          name="short_desc"
          label="Mô tả ngắn"
          rules={[
            {
              required: true,
              message: `Nhập mô tả ngắn về ${directoryVie}`,
            },
          ]}
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
              message: `Nhập mô tả đầy đủ về ${directoryVie}`,
            },
          ]}
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
                    message: "Chọn mức độ ưu tiên",
                  },
                ]}
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
                  message: "Chọn trạng thái",
                },
              ]}
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
