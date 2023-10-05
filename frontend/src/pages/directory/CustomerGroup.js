/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import PageTitle from "../../components/UI/PageTitle";
import DirectoryList from "../../components/directory/DirectoryList";
import DirectoryAdd from "../../components/directory/DirectoryAdd";
import DirectoryDetail from "../../components/directory/DirectoryDetail";
import { SERVER_URL, recordsPerPage } from "../../data/api";

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
        setTotalRecords(data.totalCustomerGroups);
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
  const deleteRecord = async (id) => {
    try {
      const res = await fetch(`${SERVER_URL}/directory/customer-group/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      const data = await res.json();
      console.log("deleteCustomerGroup: ", data);
      getCustomerGroups();
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
