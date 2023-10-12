/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { SERVER_URL } from "../../api/api";

const initFormAdd = {
  name: "",
  feature: "",
  tech_stacks: [],
  projects: [],
  staffs: [],
};

function DepartmentAdd({
  showForm,
  setShowForm,
  recordDetail,
  edit,
  getDepartments,
}) {
  const [form] = Form.useForm();
  const [techStacks, setTechStacks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [staffs, setStaffs] = useState([]);

  // get data for select form
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
  const getStaffs = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/management/staff`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getStaffs: ", data);
      if (data.success) {
        const staffsDontBelongToAnyDepartment = data.data.filter(
          (item) => item.department.length === 0
        );
        const staffsBelongToThisDepartment = recordDetail.staffs || [];
        setStaffs([
          ...staffsDontBelongToAnyDepartment,
          ...staffsBelongToThisDepartment,
        ]);
      }
    } catch (err) {
      console.error("getStaffs: ", err);
    }
  };

  useEffect(() => {
    if (edit)
      form.setFieldsValue({
        ...recordDetail,
        tech_stacks: recordDetail.tech_stacks.map((item) => item._id),
        projects: recordDetail.projects.map((item) => item._id),
        staffs: recordDetail.staffs.map((item) => item._id),
      });
    else form.setFieldsValue(initFormAdd);
    getTechStacks();
    getProjects();
    getStaffs();
  }, [form, edit, recordDetail]);

  // Create / Update
  const addDepartment = async (values, method) => {
    try {
      const res = await fetch(
        `${SERVER_URL}/management/department/${edit ? recordDetail._id : ""}`,
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
      // console.log("addDepartment: ", data);
      getDepartments();
    } catch (err) {
      console.error("addDepartment: ", err);
    }
  };

  // submit form
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // console.log("values: ", values);
        form.resetFields();
        if (edit) addDepartment(values, "PATCH");
        else addDepartment(values, "POST");
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
        edit ? `Chỉnh sửa "${recordDetail.name}"` : "Tạo bộ phận, phòng ban mới"
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
      >
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="name"
              label="Tên"
              rules={[
                {
                  required: true,
                  message: "Tên bộ phận, phòng ban không được bỏ trống",
                },
                {
                  min: 2,
                  message: "Tên bộ phận, phòng ban phải có ít nhất 2 kí tự",
                },
              ]}
            >
              <Input placeholder="Nhập tên bộ phận, phòng ban" />
            </Form.Item>
            <Form.Item
              name="feature"
              label="Chức năng, nhiệm vụ"
              rules={[
                {
                  required: true,
                  message: "Chức năng, nhiệm vụ không được bỏ trống",
                },
              ]}
            >
              <Input.TextArea
                rows={5}
                placeholder="Nhập chức năng, nhiệm vụ của bộ phận, phòng ban"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="tech_stacks" label="Các tech stack">
              <Select
                placeholder="Chọn tech stack"
                showSearch
                mode="multiple"
                maxTagCount={3}
                allowClear
                options={techStacks.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
              ></Select>
            </Form.Item>
            <Form.Item name="projects" label="Các dự án tham gia">
              <Select
                placeholder="Chọn dự án"
                showSearch
                mode="multiple"
                maxTagCount={2}
                allowClear
                options={projects.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
              ></Select>
            </Form.Item>
            <Form.Item name="staffs" label="Các nhân viên">
              <Select
                placeholder="Chọn nhân viên"
                showSearch
                mode="multiple"
                maxTagCount={2}
                allowClear
                options={staffs.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
              ></Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default DepartmentAdd;
