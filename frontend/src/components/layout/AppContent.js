import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ReactLoading from "react-loading";

const Home = lazy(() => import("../../pages/Home"));
const ProjectType = lazy(() => import("../../pages/directory/ProjectType"));
const ProjectStatus = lazy(() => import("../../pages/directory/ProjectStatus"));
const TechStack = lazy(() => import("../../pages/directory/TechStack"));
const CustomerGroup = lazy(() => import("../../pages/directory/CustomerGroup"));
const Department = lazy(() => import("../../pages/management/Department"));
const Staff = lazy(() => import("../../pages/management/Staff"));
const Project = lazy(() => import("../../pages/management/Project"));
const ProjectQuantity = lazy(() =>
  import("../../pages/report/ProjectQuantity")
);
const StaffQuantity = lazy(() => import("../../pages/report/StaffQuantity"));
const Signup = lazy(() => import("../../pages/Signup"));
const Login = lazy(() => import("../../pages/Login"));
const PageNotFound = lazy(() => import("../../pages/PageNotFound"));

function AppContent({ isLogin, setIsLogin, activeUser, setActiveUser }) {
  return (
    <Suspense
      fallback={
        <div className="d-flex flex-column align-items-center loading-page">
          <ReactLoading
            type="bars"
            color="#001529"
            height="150%"
            width="150%"
          />
          <p className="fw-semibold fst-italic">Loading...</p>
        </div>
      }
    >
      <Routes>
        <Route
          path="/login"
          element={
            <Login setIsLogin={setIsLogin} setActiveUser={setActiveUser} />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={isLogin && <Home activeUser={activeUser} />} />
        <Route path="/project-type" element={isLogin && <ProjectType />} />
        <Route path="/project-status" element={isLogin && <ProjectStatus />} />
        <Route path="/tech-stack" element={isLogin && <TechStack />} />
        <Route path="/customer-group" element={isLogin && <CustomerGroup />} />
        <Route path="/departments" element={isLogin && <Department />} />
        <Route path="/staffs" element={isLogin && <Staff />} />
        <Route path="/projects" element={isLogin && <Project />} />
        <Route
          path="/project-quantity"
          element={isLogin && <ProjectQuantity />}
        />
        <Route path="/staff-quantity" element={isLogin && <StaffQuantity />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppContent;
