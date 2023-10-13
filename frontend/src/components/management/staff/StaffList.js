import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Empty, Table } from "antd";
import TagDisplay from "../../UI/TagDisplay";
import Actions from "../../UI/Actions";
import { filterDropdownSearch } from "../../../api/api";

function StaffList({
  loading,
  staffs,
  page,
  setPage,
  pageSize,
  setPageSize,
  totalRecords,
  setShowDetail,
  setRecordDetail,
  setShowForm,
  setEdit,
  deleteRecord,
}) {
  const dataSource = staffs.map((record) => ({
    ...record,
    key: record._id,
  }));

  const columns = [
    {
      title: "STT",
      key: "stt",
      align: "center",
      render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      filterDropdown: filterDropdownSearch,
      filterIcon: () => <SearchOutlined />,
      onFilter: (text, record) =>
        record.name.toLowerCase().includes(text.toLowerCase()),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      filterDropdown: filterDropdownSearch,
      filterIcon: () => <SearchOutlined />,
      onFilter: (text, record) =>
        record.dob.toLowerCase().includes(text.toLowerCase()),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      filterDropdown: filterDropdownSearch,
      filterIcon: () => <SearchOutlined />,
      onFilter: (text, record) =>
        record.phone_number.toLowerCase().includes(text.toLowerCase()),
    },
    {
      title: "Level",
      dataIndex: "level",
      filters: [
        { text: "Fresher", value: "Fresher" },
        { text: "Junior", value: "Junior" },
        { text: "Middle", value: "Middle" },
        { text: "Senior", value: "Senior" },
      ],
      onFilter: (text, record) => record.level === text,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      filters: [
        { text: "Nam", value: "Nam" },
        { text: "Nữ", value: "Nữ" },
      ],
      onFilter: (text, record) => record.gender === text,
      render: (text) => <span>{text === "female" ? "Nữ" : "Nam"}</span>,
    },
    {
      title: "Bộ phận",
      dataIndex: "department",
      render: (text) => <span>{text.length > 0 ? text[0].name : ""}</span>,
    },
    {
      title: "Các tech stack",
      dataIndex: "tech_stacks",
      render: (text) => <TagDisplay tags={text} maxTags={2} />,
    },
    {
      title: "Dự án tham gia",
      dataIndex: "projects",
      render: (text) => <TagDisplay tags={text} maxTags={1} />,
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Actions
          setShowDetail={setShowDetail}
          setRecordDetail={setRecordDetail}
          setShowForm={setShowForm}
          setEdit={setEdit}
          deleteRecord={deleteRecord}
          record={record}
        />
      ),
    },
  ];

  return (
    <Table
      className="bg-white rounded px-2 pt-2"
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: totalRecords,
        pageSizeOptions: [5, 10, 15],
        showSizeChanger: true,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        },
      }}
      bordered={true}
      size="middle"
      locale={{
        emptyText: (
          <Empty description="Không có dữ liệu" imageStyle={{ height: 60 }} />
        ),
      }}
    />
  );
}

export default StaffList;
