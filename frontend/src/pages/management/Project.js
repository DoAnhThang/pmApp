/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import PageTitle from "../../components/UI/PageTitle";
import ProjectList from "../../components/management/project/ProjectList";
import ProjectAdd from "../../components/management/project/ProjectAdd";
import ProjectDetail from "../../components/management/project/ProjectDetail";
import { SERVER_URL, recordsPerPage } from "../../api/api";
import { message } from "antd";

function Project() {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(recordsPerPage);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [recordDetail, setRecordDetail] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // get projects
  const getProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${SERVER_URL}/management/project?page=${page}&pageSize=${pageSize}`,
        { credentials: "include" }
      );
      const data = await res.json();
      // console.log("getProjects:", data);
      if (data.success) {
        setProjects(data.data);
        setTotalRecords(data.totalRecords);
      } else setProjects([]);
      setLoading(false);
    } catch (err) {
      console.error("getProjects: ", err);
    }
  };

  // delete project
  const deleteRecord = async (ids) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await fetch(`${SERVER_URL}/management/project`, {
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({ ids: ids }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log("deleteProject: ", data);
      if (data.success) message.success(data.msg);
      else message.error(data.errorMsg);
      getProjects();
      setSelectedRowKeys([]);
    } catch (err) {
      console.error("deleteProject: ", err);
    }
  };

  useEffect(() => {
    getProjects();
  }, [page, pageSize]);

  return (
    <div className="container-fluid py-2">
      <PageTitle
        pageTitle={"Dự án"}
        pageIcon={"fa-solid fa-file-code"}
        setShowForm={setShowForm}
        setEdit={setEdit}
        isShowButton={true}
        selectedRowKeys={selectedRowKeys}
        deleteRecord={deleteRecord}
      />

      <ProjectList
        loading={loading}
        projects={projects}
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

      <ProjectAdd
        showForm={showForm}
        setShowForm={setShowForm}
        recordDetail={recordDetail}
        edit={edit}
        getProjects={getProjects}
      />

      <ProjectDetail
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        recordDetail={recordDetail}
      />
    </div>
  );
}

export default Project;
