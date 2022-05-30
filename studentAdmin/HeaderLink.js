import React from "react";
import "../components/styles/Navbar.css";
import AppHeaderDropdown from "../components/HeaderDropdown";
// import CreateAdminPopup from "../components/CreateAdminPopup";
// import FeesStructure from "../components/FeesStructure";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderLink = () => {
    const currentLocation = useLocation().pathname;
    var location = getLocation();

    const navigate = useNavigate();

    function getLocation() {
        if (currentLocation === "/student_admin_dashboard") {
            return "Dashboard";
        }
        else if (currentLocation === "/student_admin_dashboard/students") {
            return "Students";
        }
        else if (currentLocation === "/student_admin_dashboard/studenttable") {
            return "Applied Student";
        }
        else if (currentLocation === "/student_admin_dashboard/addnewstudent") {
            return "Add Student";
        }

        else {
            return "Dashboard";
        }
    }

    return (
        <div className="container_navbar">
            <div className="navbar_container_start_side">
                <h3 className=" fw-bolder ml-4" style={{ color: "#5A607F" }}>{location}</h3>
            </div>
            <div className="navbar_container_end_side">
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
