/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import PageTitle from "../../components/UI/PageTitle";
import StaffList from "../../components/management/staff/StaffList";
import StaffAdd from "../../components/management/staff/StaffAdd";
import StaffDetail from "../../components/management/staff/StaffDetail";
import { SERVER_URL, recordsPerPage } from "../../api/api";
import ProjectDetail from "../../components/management/project/ProjectDetail";
import { message } from "antd";

function Staff() {
  const [loading, setLoading] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(recordsPerPage);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [recordDetail, setRecordDetail] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [projectDetail, setProjectDetail] = useState(null);
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // get staffs
  const getStaffs = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${SERVER_URL}/management/staff?page=${page}&pageSize=${pageSize}`,
        { credentials: "include" }
      );
      const data = await res.json();
      // console.log("getStaffs:", data);
      if (data.success) {
        setStaffs(data.data);
        setTotalRecords(data.totalRecords);
      } else setStaffs([]);
      setLoading(false);
    } catch (err) {
      console.error("getStaffs: ", err);
    }
  };

  // delete staff
  const deleteRecord = async (ids) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await fetch(`${SERVER_URL}/management/staff`, {
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({ ids: ids }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log("deleteStaff: ", data);
      if (data.success) message.success(data.msg);
      else message.error(data.errorMsg);
      getStaffs();
      setSelectedRowKeys([]);
    } catch (err) {
      console.error("deleteStaff: ", err);
    }
  };

  useEffect(() => {
    getStaffs();
  }, [page, pageSize]);

  const getProjectDetail = async (projectId) => {
    try {
      const res = await fetch(`${SERVER_URL}/management/project/${projectId}`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log("getProjectDetail: ", data);
      if (data.success) setProjectDetail(data.data);
    } catch (err) {
      console.error("getProjectDetail: ", err);
    }
  };

  return (
    <div className="container-fluid py-2">
      <PageTitle
        pageTitle={"Nhân sự"}
        pageIcon={"fa-solid fa-user-gear"}
        setShowForm={setShowForm}
        setEdit={setEdit}
        isShowButton={true}
        selectedRowKeys={selectedRowKeys}
        deleteRecord={deleteRecord}
      />

      <StaffList
        loading={loading}
        staffs={staffs}
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

      <StaffAdd
        showForm={showForm}
        setShowForm={setShowForm}
        recordDetail={recordDetail}
        edit={edit}
        getStaffs={getStaffs}
      />

      <StaffDetail
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        recordDetail={recordDetail}
        getProjectDetail={getProjectDetail}
        setShowProjectDetail={setShowProjectDetail}
      />

      {projectDetail && (
        <ProjectDetail
          showDetail={showProjectDetail}
          setShowDetail={setShowProjectDetail}
          recordDetail={projectDetail}
        />
      )}
    </div>
  );
}

export default Staff;
