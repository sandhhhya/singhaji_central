import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAnimate } from "react-simple-animate";

import "../components/styles/adminDashboard.css";

import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import FeesStructureTable from "../components/FeesStuctureTable";
import AddNewStudent from "../components/AddNewStudent";
import AdminTable from "../components/AdminTable";
import Sidebar from "../components/Sidebar";
import StudentAccountTable from '../components/accounts/StudentAccountTable'
import { ToastContainer } from "react-toastify";
import SidebarLinks from "./SidebarLinks";
import HeaderLink from "./HeaderLink";
import StudentProfile from "../components/accounts/StudentProfile";
import UploadDocumentFrom from "../components/accounts/UploadDocumentFrom";
import FeesRecipt from "../components/accounts/FeesRecipt";
import PendingScholarshipTable from "../components/accounts/PendingScholarshipTable";
//Test
import StudentTable from '../components/StudentsTable'
import FeesReceiptTable from "../components/accounts/FeesReceiptTable";
import StudentTableFirst from "../components/student/StudentTableFirst";
import UpdatePersonalDetialOfStudent from "../components/accounts/UpdatePersonalDetialOfStudent";
import DeleteReceiptTable from "../components/DeleteReceiptTable";
import SelfAppliedStudentTable from "../components/SelfAppliedStudentTable";
import RegisteredStudent from "../components/accounts/RegisteredStudent";
import UpdateSelfAppliedStudentDetail from "../components/UpdateSelfAppliedStudentDetail";

function AdminDashboard() {
  const { play, style, isPlaying } = useAnimate({
    start: {
      width: "281px",
      minWidth: "280px",
    },
    end: {
      width: "95px",
      minWidth: "95px",
    },
  });

  return (
    <div className="main_container_dashboard">
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="side_bar_content" style={style}>
        <Sidebar play={play} isPlaying={isPlaying} Options={SidebarLinks} />
      </div>
      <div className="header_table">
        <div className="header_dashboard">
          <Navbar Options={HeaderLink} />
        </div>


        <div className="table_dashboard">
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="studenttable" element={<StudentTable />} />
            <Route path="selfappliedstudent" element={<SelfAppliedStudentTable />} />
            {/* Nested routes  */}
            <Route path="studentaccounttable" element={<StudentAccountTable />} />
            {/* Nested routes  */}
            <Route path="admintable" element={<AdminTable />} />


            {/* Adding student page   */}
            <Route path="students" element={<StudentTableFirst />} />
            <Route path="registeredStudent" element={<RegisteredStudent />} />


            <Route path="addnewstudent" element={<AddNewStudent />} />
            <Route path="updateselfappliedstudentdetail" element={<UpdateSelfAppliedStudentDetail />} />

            <Route path="feesstructuretable" element={<FeesStructureTable />} />
            <Route path="studentprofile" element={<StudentProfile />} />
            <Route path="studentprofile/uploaddocument" element={<UploadDocumentFrom />} />
            <Route path="studentprofile/feesrecipt" element={<FeesRecipt />} />
            <Route path="pendingscholarship" element={<PendingScholarshipTable />} />
            <Route path="feesreceiptlist" element={<FeesReceiptTable />} />
            <Route path="studentprofile/updatepersonaldetial" element={<UpdatePersonalDetialOfStudent />} />
            <Route path="reportedreceipt" element={<DeleteReceiptTable />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
