import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  DatePicker,
  Button,
  Row,
  Col,
  Space,
  Input,
  InputNumber,
  Select,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { SERVER_URL } from "../../api/api";
import moment from "moment";
import dayjs from "dayjs";

const initFormAdd = {
  name: "",
  dob: "",
  phone_number: "",
  level: null,
  gender: null,
  department: null,
  tech_stacks: [],
  projects: [],
};

function StaffAdd({ showForm, setShowForm, recordDetail, edit, getStaffs }) {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [projects, setProjects] = useState([]);

  // get data for select form
  const getDepartments = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/management/department`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getDepartments: ", data);
      if (data.success) setDepartments(data.data);
    } catch (err) {
      console.error("getDepartments: ", err);
    }
  };
  const getTechStacks = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/directory/tech-stack`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getTechStacks: ", data);
      if (data.success) setTechStacks(data.data);
    } catch (err) {
      console.error("getTechStacks: ", err);
    }
  };
  const getProjects = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/management/project`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getProjects: ", data);
      if (data.success) setProjects(data.data);
    } catch (err) {
      console.error("getProjects: ", err);
    }
  };

  useEffect(() => {
    if (edit)
      form.setFieldsValue({
        ...recordDetail,
        dob: dayjs(recordDetail.dob, "DD/MM/YYYY"),
        department:
          recordDetail.department.length > 0
            ? recordDetail.department[0]._id
            : null,
        tech_stacks: recordDetail.tech_stacks.map((item) => ({
          ...item,
          tech_stack_id: item.tech_stack_id._id,
        })),
        projects: recordDetail.projects.map((item) => item._id),
      });
    else form.setFieldsValue(initFormAdd);
    getDepartments();
    getTechStacks();
    getProjects();
  }, [form, edit, recordDetail]);

  // Create / Update
  const addStaff = async (values, method) => {
    try {
      const res = await fetch(
        `${SERVER_URL}/management/staff/${edit ? recordDetail._id : ""}`,
        {
          credentials: "include",
          method: method,
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await res.json();
      // console.log("addStaff: ", data);
      getStaffs();
    } catch (err) {
      console.error("addStaff: ", err);
    }
  };

  // submit form
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedValues = {
          ...values,
          dob: moment(values.dob.$d).format("DD/MM/YYYY"),
        };
        form.resetFields();
        if (edit) addStaff(updatedValues, "PATCH");
        else addStaff(updatedValues, "POST");
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
        edit
          ? `Chỉnh sửa nhân viên "${recordDetail.name}"`
          : "Tạo nhân viên mới"
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
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        name="formAdd"
        scrollToFirstError
        autoComplete="off"
      >
        <Row gutter={24}>
          <Col xs={24} sm={10}>
            <Form.Item
              name="name"
              label="Tên"
              rules={[
                {
                  required: true,
                  message: "Tên nhân viên không được bỏ trống",
                },
                {
                  min: 2,
                  message: "Tên nhân viên phải có ít nhất 2 kí tự",
                },
              ]}
            >
              <Input placeholder="Nhập tên nhân viên" />
            </Form.Item>
            <Form.Item
              name="phone_number"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được bỏ trống",
                },
                {
                  min: 10,
                  message: "Số điện thoại phải có ít nhất 10 kí tự",
                },
                {
                  max: 12,
                  message: "Số điện thoại phải không quá 12 kí tự",
                },
              ]}
            >
              <Input type="number" placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              name="level"
              label="Level"
              rules={[
                {
                  required: true,
                  message: "Level không được bỏ trống",
                },
              ]}
            >
              <Select
                placeholder="Chọn level"
                options={["Fresher", "Junior", "Middle", "Senior"].map(
                  (item) => ({
                    label: item,
                    value: item,
                  })
                )}
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[
                {
                  required: true,
                  message: "Giới tính không được bỏ trống",
                },
              ]}
            >
              <Select placeholder="Chọn giới tính">
                <Select.Option value="male">Nam</Select.Option>
                <Select.Option value="female">Nữ</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={14}>
            <Form.Item
              name="dob"
              label="Ngày sinh"
              rules={[
                {
                  required: true,
                  message: "Ngày sinh không được bỏ trống",
                },
              ]}
            >
              <DatePicker
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
                className="w-100"
                placement="topRight"
              />
            </Form.Item>
            <Form.Item name="department" label="Bộ phận">
              <Select
                placeholder="Chọn bộ phận làm việc"
                showSearch
                allowClear
                options={departments.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Các tech stack và số năm kinh nghiệm"
              className="mb-0"
            >
              <Form.List name="tech_stacks">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} className="d-flex" align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, "tech_stack_id"]}
                          rules={[
                            {
                              required: true,
                              message: "Thiếu tên tech stack",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Tên tech stack"
                            showSearch
                            options={techStacks.map((item) => ({
                              label: item.name,
                              value: item._id,
                            }))}
                            style={{ width: 150 }}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "exp"]}
                          rules={[
                            {
                              required: true,
                              message: "Thiếu số năm kinh nghiệm",
                            },
                          ]}
                        >
                          <InputNumber placeholder="Năm" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm tech stack
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
            <Form.Item name="projects" label="Các dự án đã tham gia">
              <Select
                placeholder="Chọn dự án"
                showSearch
                mode="multiple"
                maxTagCount={3}
                allowClear
                options={projects.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default StaffAdd;
