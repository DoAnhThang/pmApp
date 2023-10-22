import React from "react";
import { Empty, Table } from "antd";
import TagDisplay from "../../UI/TagDisplay";
import Actions from "../../UI/Actions";
import { useGetColumnSearchProps } from "../../../api/api";

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
  setSelectedRowKeys,
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
      ...useGetColumnSearchProps("name"),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      ...useGetColumnSearchProps("dob"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      ...useGetColumnSearchProps("phone_number"),
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
        { text: "Nam", value: "male" },
        { text: "Nữ", value: "female" },
        { text: "Khác", value: "another" },
      ],
      onFilter: (value, record) => record.gender === value,
      render: (text) => (
        <span>
          {text === "male" ? "Nam" : text === "female" ? "Nữ" : "Khác"}
        </span>
      ),
    },
    {
      title: "Bộ phận",
      dataIndex: "department",
      ...useGetColumnSearchProps("department"),
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
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 15],
        size: "default",
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
      rowSelection={{
        onChange: (newSelectedRowKeys) =>
          setSelectedRowKeys(newSelectedRowKeys),
      }}
    />
  );
}

export default StaffList;
