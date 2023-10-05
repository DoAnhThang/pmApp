/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import PageTitle from "../../components/UI/PageTitle";
import DirectoryList from "../../components/directory/DirectoryList";
import DirectoryAdd from "../../components/directory/DirectoryAdd";
import DirectoryDetail from "../../components/directory/DirectoryDetail";
import { SERVER_URL, recordsPerPage } from "../../data/api";

function ProjectType() {
  const [loading, setLoading] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(recordsPerPage);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [recordDetail, setRecordDetail] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);

  // get project types
  const getProjectTypes = async () => {
    try {
      const res = await fetch(
        `${SERVER_URL}/directory/project-type?page=${page}&pageSize=${pageSize}`,
        { credentials: "include" }
      );
      const data = await res.json();
      // console.log("getProjectTypes:", data);
      if (data.success) {
        setProjectTypes(data.data);
        setTotalRecords(data.totalProjectTypes);
      }
      setLoading(false);
    } catch (err) {
      console.error("getProjectTypes: ", err);
    }
  };
  useEffect(() => {
    setLoading(true);
    getProjectTypes();
  }, [page, pageSize]);

  // delete project type
  const deleteRecord = async (id) => {
    try {
      const res = await fetch(`${SERVER_URL}/directory/project-type/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      const data = await res.json();
      console.log("deleteProjectType: ", data);
      getProjectTypes();
    } catch (err) {
      console.error("deleteProjectType: ", err);
    }
  };

  return (
    <div className="container-fluid py-2">
      <PageTitle
        pageTitle={"Loại dự án"}
        pageIcon={"fa-solid fa-folder-open"}
        setShowForm={setShowForm}
        setEdit={setEdit}
        isShowButton={true}
      />

      <DirectoryList
        loading={loading}
        directories={projectTypes}
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
        getDirectories={getProjectTypes}
        directoryVie={"loại dự án"}
        directoryEng={"project-type"}
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

export default ProjectType;
