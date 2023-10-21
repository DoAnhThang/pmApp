import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  DatePicker,
  Row,
  Col,
  Input,
  Select,
  message,
} from "antd";
import { SERVER_URL } from "../../../api/api";
import moment from "moment";
import dayjs from "dayjs";

const initValues = {
  name: null,
  startTime: null,
  endTime: null,
  project_type: null,
  project_status: null,
  customer_group: null,
  tech_stacks: null,
  departments: null,
  staffs: null,
};

function ProjectAdd({
  showForm,
  setShowForm,
  recordDetail,
  edit,
  getProjects,
}) {
  const [form] = Form.useForm();
  const [techStacks, setTechStacks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectStatuses, setProjectStatuses] = useState([]);
  const [customerGroups, setCustomerGroups] = useState([]);
  const [errorMsg, setErrorMsg] = useState(initValues);

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
  const getStaffs = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/management/staff`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getStaffs: ", data);
      if (data.success) setStaffs(data.data);
    } catch (err) {
      console.error("getStaffs: ", err);
    }
  };
  const getProjectTypes = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/directory/project-type`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getProjectTypes: ", data);
      if (data.success) setProjectTypes(data.data);
    } catch (err) {
      console.error("getProjectTypes: ", err);
    }
  };
  const getProjectStatuses = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/directory/project-status`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getProjectStatuses: ", data);
      if (data.success) setProjectStatuses(data.data);
    } catch (err) {
      console.error("getProjectStatuses: ", err);
    }
  };
  const getCustomerGroups = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/directory/customer-group`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getCustomerGroups: ", data);
      if (data.success) setCustomerGroups(data.data);
    } catch (err) {
      console.error("getCustomerGroups: ", err);
    }
  };

  useEffect(() => {
    if (edit)
      form.setFieldsValue({
        ...recordDetail,
        startTime: dayjs(recordDetail.startTime, "DD/MM/YYYY"),
        endTime: dayjs(recordDetail.endTime, "DD/MM/YYYY"),
        project_type:
          recordDetail.project_type.length > 0
            ? recordDetail.project_type[0]._id
            : null,
        project_status:
          recordDetail.project_status.length > 0
            ? recordDetail.project_status[0]._id
            : null,
        customer_group:
          recordDetail.customer_group.length > 0
            ? recordDetail.customer_group[0]._id
            : null,
        tech_stacks: recordDetail.tech_stacks.map((item) => item._id),
        departments: recordDetail.departments.map((item) => item._id),
        staffs: recordDetail.staffs.map((item) => item._id),
      });
    else form.resetFields();
    getTechStacks();
    getDepartments();
    getStaffs();
    getProjectTypes();
    getProjectStatuses();
    getCustomerGroups();
    setErrorMsg(initValues);
  }, [form, edit, recordDetail, showForm]);

  // Create / Update
  const addProject = async (values, method) => {
    try {
      const res = await fetch(
        `${SERVER_URL}/management/project/${edit ? recordDetail._id : ""}`,
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
      // console.log("addProject: ", data);
      if (data.success) {
        message.success(data.msg);
        setShowForm(false);
        getProjects();
      } else {
        for (const key in data) {
          setErrorMsg((prev) => ({ ...prev, [key]: data[key].msg }));
        }
      }
    } catch (err) {
      console.error("addProject: ", err);
    }
  };

  // submit form
  const handleSubmit = () => {
    setErrorMsg(initValues);
    form
      .validateFields()
      .then((values) => {
        const updatedValues = {
          ...values,
          startTime: moment(values.startTime.$d).format("DD/MM/YYYY"),
          endTime: moment(values.endTime.$d).format("DD/MM/YYYY"),
        };
        if (edit) addProject(updatedValues, "PATCH");
        else addProject(updatedValues, "POST");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={showForm}
      title={edit ? `Chỉnh sửa dự án "${recordDetail.name}"` : "Tạo dự án mới"}
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
        name="form"
        scrollToFirstError
        autoComplete="off"
      >
        <Row gutter={24}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="name"
              label="Tên"
              rules={[
                {
                  required: true,
                  message: "Tên dự án không được bỏ trống",
                },
                {
                  min: 2,
                  message: "Tên dự án phải có ít nhất 2 kí tự",
                },
              ]}
              validateStatus={errorMsg.name && "error"}
              help={errorMsg.name ? errorMsg.name : null}
            >
              <Input placeholder="Nhập tên dự án" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              name="startTime"
              label="Ngày bắt đầu"
              rules={[
                {
                  required: true,
                  message: "Ngày bắt đầu không được bỏ trống",
                },
              ]}
              validateStatus={errorMsg.startTime && "error"}
              help={errorMsg.startTime ? errorMsg.startTime : null}
            >
              <DatePicker
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
                className="w-100"
                placement="bottomRight"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              name="endTime"
              label="Ngày kết thúc"
              rules={[
                {
                  required: true,
                  message: "Ngày kết thúc không được bỏ trống",
                },
              ]}
              validateStatus={errorMsg.endTime && "error"}
              help={errorMsg.endTime ? errorMsg.endTime : null}
            >
              <DatePicker
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
                className="w-100"
                placement="bottomRight"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item name="project_type" label="Loại dự án">
              <Select
                placeholder="Dự án thuộc loại nào?"
                showSearch
                options={projectTypes.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
                allowClear
              />
            </Form.Item>
            <Form.Item name="project_status" label="Trạng thái dự án">
              <Select
                placeholder="Dự án đang ở trạng thái nào?"
                showSearch
                options={projectStatuses.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
                allowClear
              />
            </Form.Item>
            <Form.Item name="customer_group" label="Nhóm khách hàng">
              <Select
                placeholder="Dự án thuộc nhóm khách hàng nào?"
                showSearch
                options={customerGroups.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="tech_stacks" label="Các tech stack được dùng">
              <Select
                placeholder="Chọn các tech stack được dùng trong dự án"
                showSearch
                mode="multiple"
                maxTagCount={3}
                options={techStacks.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
                allowClear
              />
            </Form.Item>
            <Form.Item name="departments" label="Các bộ phận tham gia">
              <Select
                placeholder="Chọn các bộ phận tham gia dự án"
                showSearch
                mode="multiple"
                maxTagCount={3}
                options={departments.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
                allowClear
              />
            </Form.Item>
            <Form.Item name="staffs" label="Các nhân viên tham gia">
              <Select
                placeholder="Chọn các nhân viên tham gia dự án"
                showSearch
                mode="multiple"
                maxTagCount={2}
                options={staffs.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ProjectAdd;
