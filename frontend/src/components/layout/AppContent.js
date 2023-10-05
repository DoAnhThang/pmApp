import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../pages/Home";
import ProjectType from "../../pages/directory/ProjectType";
import ProjectStatus from "../../pages/directory/ProjectStatus";
import TechStack from "../../pages/directory/TechStack";
import CustomerGroup from "../../pages/directory/CustomerGroup";
import Department from "../../pages/management/Department";
import Staff from "../../pages/management/Staff";
import Project from "../../pages/management/Project";
import ProjectQuantity from "../../pages/report/ProjectQuantity";
import StaffQuantity from "../../pages/report/StaffQuantity";
import Signup from "../../pages/Signup";
import Login from "../../pages/Login";
import PageNotFound from "../../pages/PageNotFound";

function AppContent({ isLogin, setIsLogin, activeUser, setActiveUser }) {
  return (
    <Routes>
      {isLogin ? (
        <>
          <Route path="/" element={<Home activeUser={activeUser} />} />
          <Route path="/project-type" element={<ProjectType />} />
          <Route path="/project-status" element={<ProjectStatus />} />
          <Route path="/tech-stack" element={<TechStack />} />
          <Route path="/customer-group" element={<CustomerGroup />} />

          <Route path="/departments" element={<Department />} />
          <Route path="/staffs" element={<Staff />} />
          <Route path="/projects" element={<Project />} />

          <Route path="/project-quantity" element={<ProjectQuantity />} />
          <Route path="/staff-quantity" element={<StaffQuantity />} />
        </>
      ) : (
        <>
          <Route
            path="/"
            element={
              <Login setIsLogin={setIsLogin} setActiveUser={setActiveUser} />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </>
      )}
    </Routes>
  );
}

export default AppContent;
