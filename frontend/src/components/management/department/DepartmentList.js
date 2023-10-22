import React from "react";
import { Empty, Table } from "antd";
import TagDisplay from "../../UI/TagDisplay";
import Actions from "../../UI/Actions";
import { useGetColumnSearchProps } from "../../../api/api";

function DepartmentList({
  loading,
  departments,
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
  const dataSource = departments.map((record) => ({
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
      title: "Chức năng, nhiệm vụ",
      dataIndex: "feature",
      ...useGetColumnSearchProps("feature"),
    },
    {
      title: "Các tech stack",
      dataIndex: "tech_stacks",
      render: (text) => <TagDisplay tags={text} maxTags={2} />,
    },
    {
      title: "Các dự án",
      dataIndex: "projects",
      render: (text) => <TagDisplay tags={text} maxTags={1} />,
    },
    {
      title: "Nhân viên",
      dataIndex: "staffs",
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

export default DepartmentList;
