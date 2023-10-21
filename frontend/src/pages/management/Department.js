/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import PageTitle from "../../components/UI/PageTitle";
import DepartmentList from "../../components/management/department/DepartmentList";
import DepartmentAdd from "../../components/management/department/DepartmentAdd";
import DepartmentDetail from "../../components/management/department/DepartmentDetail";
import { SERVER_URL, recordsPerPage } from "../../api/api";
import { message } from "antd";

function Department() {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(recordsPerPage);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [recordDetail, setRecordDetail] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // get departments
  const getDepartments = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${SERVER_URL}/management/department?page=${page}&pageSize=${pageSize}`,
        { credentials: "include" }
      );
      const data = await res.json();
      // console.log("getDepartments:", data);
      if (data.success) {
        setDepartments(data.data);
        setTotalRecords(data.totalRecords);
      } else setDepartments([]);
      setLoading(false);
    } catch (err) {
      console.error("getDepartments: ", err);
    }
  };

  // delete department
  const deleteRecord = async (ids) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await fetch(`${SERVER_URL}/management/department`, {
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({ ids: ids }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log("deleteDepartment: ", data);
      if (data.success) message.success(data.msg);
      else message.error(data.errorMsg);
      getDepartments();
      setSelectedRowKeys([]);
    } catch (err) {
      console.error("deleteDepartment: ", err);
    }
  };

  useEffect(() => {
    getDepartments();
  }, [page, pageSize]);

  return (
    <div className="container-fluid py-2">
      <PageTitle
        pageTitle={"Bộ phận, phòng ban"}
        pageIcon={"fa-solid fa-building"}
        setShowForm={setShowForm}
        setEdit={setEdit}
        isShowButton={true}
        selectedRowKeys={selectedRowKeys}
        deleteRecord={deleteRecord}
      />

      <DepartmentList
        loading={loading}
        departments={departments}
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
        setSelectedRowKeys={setSelectedRowKeys}
      />

      <DepartmentAdd
        showForm={showForm}
        setShowForm={setShowForm}
        recordDetail={recordDetail}
        edit={edit}
        getDepartments={getDepartments}
      />

      <DepartmentDetail
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        recordDetail={recordDetail}
      />
    </div>
  );
}

export default Department;
