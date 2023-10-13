import React from "react";
import { Empty, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Actions from "../UI/Actions";
import { filterDropdownSearch } from "../../api/api";

function DirectoryList({
  loading,
  directories,
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
  priority,
}) {
  const dataSource = directories.map((record) => ({
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
      sorter: (a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : a.name.toLowerCase() === b.name.toLowerCase()
          ? 0
          : -1,
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "short_desc",
      filterDropdown: filterDropdownSearch,
      filterIcon: () => <SearchOutlined />,
      onFilter: (text, record) =>
        record.short_desc.toLowerCase().includes(text.toLowerCase()),
      render: (text) => (
        <span>
          {text.length > 150 ? text.substring(0, 100) + " ..." : text}
        </span>
      ),
      className: "min-width-200px",
    },
    priority && {
      title: "Ưu tiên",
      dataIndex: "priority",
      sorter: (a, b) => a.priority - b.priority,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (text, record) => record.status === text,
      render: (text) => (
        <span
          className={
            text === "Active"
              ? "text-uppercase text-success fw-semibold"
              : "text-uppercase text-danger"
          }
        >
          {text}
        </span>
      ),
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
      columns={columns.filter(Boolean)}
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

export default DirectoryList;
