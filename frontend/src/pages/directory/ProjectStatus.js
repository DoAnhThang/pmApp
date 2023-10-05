/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import PageTitle from "../../components/UI/PageTitle";
import DirectoryList from "../../components/directory/DirectoryList";
import DirectoryAdd from "../../components/directory/DirectoryAdd";
import DirectoryDetail from "../../components/directory/DirectoryDetail";
import { SERVER_URL, recordsPerPage } from "../../data/api";

function ProjectStatus() {
  const [loading, setLoading] = useState(false);
  const [projectStatuses, setProjectStatuses] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(recordsPerPage);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [recordDetail, setRecordDetail] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);

  // get project statuses
  const getProjectStatuses = async () => {
    try {
      const res = await fetch(
        `${SERVER_URL}/directory/project-status?page=${page}&pageSize=${pageSize}`,
        { credentials: "include" }
      );
      const data = await res.json();
      // console.log("getProjectStatuses:", data);
      if (data.success) {
        setProjectStatuses(data.data);
        setTotalRecords(data.totalProjectStatuses);
      }
      setLoading(false);
    } catch (err) {
      console.error("getProjectStatuses: ", err);
    }
  };
  useEffect(() => {
    setLoading(true);
    getProjectStatuses();
  }, [page, pageSize]);

  // delete project status
  const deleteRecord = async (id) => {
    try {
      const res = await fetch(`${SERVER_URL}/directory/project-status/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      const data = await res.json();
      console.log("deleteProjectStatus: ", data);
      getProjectStatuses();
    } catch (err) {
      console.error("deleteProjectStatus: ", err);
    }
  };

  return (
    <div className="container-fluid py-2">
      <PageTitle
        pageTitle={"Trạng thái dự án"}
        pageIcon={"fa-solid fa-clipboard-question"}
        setShowForm={setShowForm}
        setEdit={setEdit}
        isShowButton={true}
      />

      <DirectoryList
        loading={loading}
        directories={projectStatuses}
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
        priority={false}
      />

      {/* Modal cho "Tạo mới" và "Sửa" */}
      <DirectoryAdd
        showForm={showForm}
        setShowForm={setShowForm}
        recordDetail={recordDetail}
        edit={edit}
        getDirectories={getProjectStatuses}
        directoryVie={"trạng thái dự án"}
        directoryEng={"project-status"}
        priority={false}
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

export default ProjectStatus;
