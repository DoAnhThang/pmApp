/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import PageTitle from "../../components/UI/PageTitle";
import DirectoryList from "../../components/directory/DirectoryList";
import DirectoryAdd from "../../components/directory/DirectoryAdd";
import DirectoryDetail from "../../components/directory/DirectoryDetail";
import { SERVER_URL, recordsPerPage } from "../../api/api";
import { message } from "antd";

function CustomerGroup() {
  const [loading, setLoading] = useState(false);
  const [customerGroups, setCustomerGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(recordsPerPage);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [recordDetail, setRecordDetail] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // get customer groups
  const getCustomerGroups = async () => {
    try {
      const res = await fetch(
        `${SERVER_URL}/directory/customer-group?page=${page}&pageSize=${pageSize}`,
        { credentials: "include" }
      );
      const data = await res.json();
      // console.log("getCustomerGroups:", data);
      if (data.success) {
        setCustomerGroups(data.data);
        setTotalRecords(data.totalRecords);
      }
      setLoading(false);
    } catch (err) {
      console.error("getCustomerGroups: ", err);
    }
  };
  useEffect(() => {
    setLoading(true);
    getCustomerGroups();
  }, [page, pageSize]);

  // delete project type
  const deleteRecord = async (ids) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await fetch(`${SERVER_URL}/directory/customer-group`, {
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({ ids: ids }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log("deleteCustomerGroup: ", data);
      if (data.success) message.success(data.msg);
      else message.error(data.errorMsg);
      getCustomerGroups();
      setSelectedRowKeys([]);
    } catch (err) {
      console.error("deleteCustomerGroup: ", err);
    }
  };

  return (
    <div className="container-fluid py-2">
      <PageTitle
        pageTitle={"Nhóm khách hàng"}
        pageIcon={"fa-solid fa-people-group"}
        setShowForm={setShowForm}
        setEdit={setEdit}
        isShowButton={true}
        selectedRowKeys={selectedRowKeys}
        deleteRecord={deleteRecord}
      />

      <DirectoryList
        loading={loading}
        directories={customerGroups}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalRecords={totalRecords}
        setShowDetail={setShowDetail}
        setRecordDetail={setRecordDetail}
        setShowForm={setShowForm}
        setEdit={setEdit}
        deleteRecord={deleteRecord}
        priority={true}
        setSelectedRowKeys={setSelectedRowKeys}
      />

      {/* Modal cho "Tạo mới" và "Sửa" */}
      <DirectoryAdd
        showForm={showForm}
        setShowForm={setShowForm}
        recordDetail={recordDetail}
        edit={edit}
        getDirectories={getCustomerGroups}
        directoryVie={"nhóm khách hàng"}
        directoryEng={"customer-group"}
        priority={true}
      />

      {/* Modal cho xem chi tiết */}
      <DirectoryDetail
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        recordDetail={recordDetail}
      />
    </div>
  );
}

export default CustomerGroup;
