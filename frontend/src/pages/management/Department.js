/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import PageTitle from "../../components/UI/PageTitle";
import DepartmentList from "../../components/management/department/DepartmentList";
import DepartmentAdd from "../../components/management/department/DepartmentAdd";
import DepartmentDetail from "../../components/management/department/DepartmentDetail";
import { SERVER_URL, recordsPerPage } from "../../api/api";

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
        setTotalRecords(data.totalDepartments);
      } else setDepartments([]);
      setLoading(false);
    } catch (err) {
      console.error("getDepartments: ", err);
    }
  };

  // delete department
  const deleteRecord = async (id) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await fetch(`${SERVER_URL}/management/department/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      // const data = await res.json();
      // console.log("deleteDepartment: ", data);
      getDepartments();
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
