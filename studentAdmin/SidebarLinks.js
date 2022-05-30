import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Education_svg from "../assests/image/sidebarIcons/Education.svg";


const SidebarLinks = ({ Toggle }) => {
    const [active_dropdown, setActiveDropdown] = useState('Dashboard');
    const [active_tab, setActiveTab] = useState('dashboard-collapse-btn');
    const [active_menu, setActiveMenu] = useState({ dashboard: false, education: false });

    const currentLocation = useLocation().pathname;
    // var location = getLocation();
    const base = '/student_admin_dashboard'

    // const changeTab = (id) => {

    //     setActiveDropdown('');
    //     setActiveTab(id);
    //     // setActiveMenu({})

    // }

    const DLink1 = (currentLocation, name, url, icon, id, parentId) => {
        useEffect(() => {
            const changeTab1 = () => {


                setActiveDropdown(id);
                setActiveTab(parentId)

                return parentId
            }
            if (currentLocation === (url ? base + '/' + url : base)) {
                console.log(changeTab1())
            }

        }, [currentLocation, id, parentId, url])
        return (
            <NavLink

                to={url}
                id={id}
                className={`sidebar_options_link ${active_dropdown === id ? "sidebar_options_active" : ""}`}
                onClick={() => {
                    if (Toggle) {

                        // document.getElementById('dashboard-collapse').classList.remove('show');
                        document.getElementById('education-collapse').classList.remove('show');
                        // document.getElementById('account-collapse').classList.remove('show');
                        setActiveMenu((pre) => {

                            return {
                                dashboard: false,
                                account: false,
                                education: false
                            }
                        })
                    }
                    setActiveDropdown(id);
                    setActiveTab(parentId)
                }}
            >
                <img src={icon} className=" Sidebar_text sidebar_icons" alt="" />
                <span className="text-dark ">{name}</span>
            </NavLink>
        );
    };

    return (
        <>
            {/* ---- second dropdown---- */}
            <div className="flex-shrink-0">
                <ul className="list-unstyled m-0">
                    <a
                        onClick={() => { setActiveMenu((pre) => { return { ...pre, education: !active_menu.education } }) }}
                        href="#!"
                        // style={{ borderBottomRightRadius: `${active_menu.education === true ? '0px' : ''}` }}
                        style={Toggle ?
                            !active_menu.education ?
                                { width: '60px', borderBottomRightRadius: `${active_menu.education === true ? '0px' : ''}` }
                                :
                                { borderBottomRightRadius: `${active_menu.education === true ? '0px' : ''}` }
                            : { borderBottomRightRadius: `${active_menu.education === true ? '0px' : ''}` }}
                        className={`data-toggle sidebar_options_drop d-flex justify-content-between ${active_tab === 'education-collapse-btn' ? 'active_tab' : ''} ${active_menu.education === true ? 'active_tab' : ''} `}
                        role="button"
                        // data-toggle="collapse"
                        id="education-collapse-btn"
                        data-bs-toggle="collapse" data-bs-target="#education-collapse" aria-expanded="true"
                    >
                        <div>
                            <img
                                src={Education_svg}
                                className="  Sidebar_text  sidebar_icons"
                                alt=""
                            />
                            <span style={
                                Toggle ?
                                    !active_menu.education ? { display: 'none' } :
                                        {} : {}} className="text-dark ">Education</span>
                        </div>
                        {!Toggle && <i className="fas fa-chevron-down mr-3"></i>}
                    </a>

                    <div className="collapse collapse_superadmin" id="education-collapse">
                        <ul className={`${Toggle ? 'btn-toggle-nav-hide' : 'btn-toggle-nav'}  list-unstyled `}>
                            <li className="dropdown_items_div ml-1">
                                {DLink1(currentLocation, "Self Applied Student", "selfappliedstudent", "ok", "Self_applied_students", 'education-collapse-btn')}
                                {DLink1(currentLocation, "Applied Students", "studenttable", "ok", "Applied_Students", 'education-collapse-btn')}
                                {DLink1(currentLocation, "Students", "students", "ok", "Students", "education-collapse-btn")}
                                {DLink1(currentLocation, "Add Students", "addnewstudent", "ok", "Add_students", 'education-collapse-btn')}
                            </li>
                        </ul>
                    </div>
                </ul>
            </div>

        </>
    );
};

export default SidebarLinks;