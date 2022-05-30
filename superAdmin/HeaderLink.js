import React from "react";
import "../components/styles/Navbar.css";
import AppHeaderDropdown from "../components/HeaderDropdown";
import CreateAdminPopup from "../components/CreateAdminPopup";
import FeesStructure from "../components/FeesStructure";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../assests/common/BackButton";

const HeaderLink = () => {
    if (localStorage.getItem('userEdit')) {
        var editData = JSON.parse(localStorage.getItem('userEdit'))
    }

    const currentLocation = useLocation().pathname;
    var location = getLocation();

    const navigate = useNavigate();

    function getLocation() {
        if (currentLocation === "/admin_dashboard") {
            return "Dashboard";
        }
        else if (currentLocation === "/admin_dashboard/studenttable") {
            return "Applied Student";
        }
        else if (currentLocation === "/admin_dashboard/studentaccounttable") {
            return "Student Account";
        }
        else if (currentLocation === "/admin_dashboard/students") {
            return "Students";
        }
        else if (currentLocation === "/admin_dashboard/admintable") {
            return "Admin List";
        }
        else if (currentLocation === "/admin_dashboard/selfappliedstudent") {
            return "Self Applied Student";
        }
        else if (currentLocation === "/admin_dashboard/addnewstudent") {
            return "Add New Student";
        }
        else if (currentLocation === "/admin_dashboard/registeredStudent") {
            return "Registered student";
        }
        else if (currentLocation.includes('admin_dashboard/studentprofile')) {
            if (editData) {
                return (
                    <div className='d-flex flex-column'>
                        
                        <span className="m-0 p-0"><BackButton/>{editData.accountInfo.firstName + "  " + editData.accountInfo.lastName} <span className="recieved-fee-circle" style={{ backgroundColor:`${editData.accountInfo.isActive === 'true'?'#56F000':'#f99300'}`  }}></span></span>
                        <span className="" style={{ fontSize: '15px' , marginLeft: "27px" }}>{`${editData.accountInfo.branch}-${editData.accountInfo.year} (${editData.accountInfo.joinBatch}-${editData.accountInfo.joinBatch + 3})`}</span>
                    </div>
                )
            }
            return "Add Student";
        }
        else if (currentLocation === "/admin_dashboard/feesstructuretable") {
            return "Fees Structure";
        }
        else if (currentLocation === "/admin_dashboard/pendingscholarship") {
            return "Pending Scholarship";
        }
        else if (currentLocation === "/admin_dashboard/feesreceiptlist") {
            return "Fees Receipt List";
        }
        else if (currentLocation === "/admin_dashboard/reportedreceipt") {
            return "Reported Receipt";
        }
        else {
            return "Dashboard";
        }
    }

    return (
        <div className="container_navbar">
            <div className="navbar_container_start_side">
                <h3 className="fw-bolder ml-4" style={{ color: "#5A607F" }}>{location === "Add New Student" ? <BackButton  addStudent="true"  /> : ''}{location}</h3>
            </div>
            <div className="navbar_container_end_side">
                {location === "Fees Structure" && (
                    <div className="changing_navbar_containt_conditional">
                        <FeesStructure />
                        <CreateAdminPopup />
                    </div>
                )}
                {location === "Dashboard" && (
                    <div className="changing_navbar_containt_conditional">
                        <FeesStructure />
                        <CreateAdminPopup />
                    </div>
                )}
                {location === "Applied Student" && (
                    <div className="changing_navbar_containt_conditional">
                        <button
                            style={{
                                borderWidth: "1px solid #ffc107 ",
                                backgroundColor: "orange",
                                color: "white",
                                border: "none",
                                marginRight: "10px",
                                padding: "5px 15px",
                                fontWeight: "bold",
                                borderRadius: "4px",
                            }}
                            onClick={() => {
                                navigate("addnewstudent");
                            }}
                        >
                            Add Student <i className="fas fa-plus pl-3"></i>
                        </button>
                    </div>
                )}
                <AppHeaderDropdown />
            </div>
        </div>
    );
}

export default HeaderLink;
