/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import PageTitle from "../../components/UI/PageTitle";
import DirectoryList from "../../components/directory/DirectoryList";
import DirectoryAdd from "../../components/directory/DirectoryAdd";
import DirectoryDetail from "../../components/directory/DirectoryDetail";
import { SERVER_URL, recordsPerPage } from "../../api/api";

function TechStack() {
  const [loading, setLoading] = useState(false);
  const [techStacks, setTechStacks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(recordsPerPage);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [recordDetail, setRecordDetail] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);

  // get tech stacks
  const getTechStacks = async () => {
    try {
      const res = await fetch(
        `${SERVER_URL}/directory/tech-stack?page=${page}&pageSize=${pageSize}`,
        { credentials: "include" }
      );
      const data = await res.json();
      // console.log("getTechStacks:", data);
      if (data.success) {
        setTechStacks(data.data);
        setTotalRecords(data.totalTechStacks);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    getTechStacks();
  }, [page, pageSize]);

  // delete tech stack
  const deleteRecord = async (id) => {
    try {
      const res = await fetch(`${SERVER_URL}/directory/tech-stack/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      const data = await res.json();
      console.log("deleteTechStack: ", data);
      getTechStacks();
    } catch (err) {
      console.error("deleteTechStack: ", err);
    }
  };

  return (
    <div className="container-fluid py-2">
      <PageTitle
        pageTitle={"Tech stack"}
        pageIcon={"fa-solid fa-lightbulb"}
        setShowForm={setShowForm}
        setEdit={setEdit}
        isShowButton={true}
      />

      <DirectoryList
        loading={loading}
        directories={techStacks}
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
        getDirectories={getTechStacks}
        directoryVie={"tech stack"}
        directoryEng={"tech-stack"}
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

export default TechStack;
