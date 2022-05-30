 
 import {
  CButton,
  CModal,
  CModalBody,
  // CModalHeader,
  // CModalTitle,
  // CModalTitle,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../assests/image/User.svg";
import crossButton from "../assests/image/crossButton.svg";
import "./styles/createAdmin.css";
import { createNewAdmin } from "../../redux/actionDispatcher/superAdmin/createNewAdminDispatcher";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../assests/common/LoaderButton";
import AllUrl from "../../redux/constants/url";
import axios from 'axios'

function CreateAdminPopup({ adminData, createNewAdmin }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // console.log(adminData);

  const [visible, setVisible] = useState(false);
  const [roles, setRoles] = useState([{ roleId: '3', roleName: 'Loading...' }]);

  useEffect(() => {
    const fn = async () => {
      const roles = await axios(AllUrl.roleList)
      setRoles(roles.data)
    }
    fn();
  }, []);





  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format*")
      .required("Please fill the field above"),
    name: Yup.string().required("Please fill the field above"),
    role: Yup.string().required("Please fill the field above"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      role: "",
    },
    validationSchema,

    onSubmit: (values) => {
      var data = JSON.stringify({
        email: formik.values.email,
        name: formik.values.name,
        role: formik.values.role,
      });
      var config = {
        method: "post",
        url: AllUrl.createNewAdmin,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      createNewAdmin(config, navigate);
    },
  });

  return (
    <div>
      <CButton
        style={{
          backgroundColor: "#F7922A",
          color: "white",
          outline: "none",
          border: "none",
          fontWeight: "bold",
          marginLeft: "15px",
        }}
        onClick={() => setVisible(!visible)}
      >
        Create Admin <i className="fas fa-plus"></i>
      </CButton>
      <CModal

        alignment="center"
        visible={visible}
        onClose={() => {
          formik.handleReset()
          setVisible(false);
        }}
      >
        <CModalBody>
          <div className="first_div createAdmin">
            <div className="second_div " style={{ marginTop: "0px" }}>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <img onClick={() => setVisible(!visible)}
                    style={{ height: "20px", width: "20px", marginLeft: '110%', marginTop: "-10px", cursor: "pointer" }} src={crossButton} alt="close" className="logo_img" />
                  <h4 className=" text-aligns-center createAdminhead" style={{ color: '#5A607F', fontWeight: 'bold' }}>
                    Create Admin
                  </h4>
                  <img src={logo} alt="logo ssism" className="logo_img" />{" "}
                </div>
                <div>
                  <label htmlFor="gmail" className="labels" >
                    Username
                  </label>
                  <input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="inputs"
                    // aria-label="email"
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Enter name "
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <div className="text-danger fs-6">
                      {formik.errors.name}
                    </div>
                  ) : (
                    ""
                  )}

                  <label htmlFor="gmail" className="labels    " >
                    Email
                  </label>
                  <input
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="inputs"
                    // aria-label="email"
                    name="email"
                    type="text"
                    id="gmail"
                    placeholder="xyz@gmail.com"
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="text-danger fs-6">
                      {formik.errors.email}
                    </div>
                  ) : (
                    ""
                  )}

                  <label htmlFor="role" className="labels "   >
                    Role
                  </label>
                  <select
                    name="role"
                    className="form-select text-secondary  border-secondary "
                    value={formik.values.role}
                    // defaultValue="null"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // eslint-disable-next-line
                    id="role"
                    type="text"
                  >
                    <option value='' className="form-select"   >
                      Role
                    </option>
                    {roles.map((role, id) => {
                      var data2 = role.roleName.charAt(0).toUpperCase() + role.roleName.slice(1).toLowerCase();
                      data2 = data2.replace('admin', ' Admin');
                      return (<option value={role.roleId} className="form-select" style={{ color: '#5A607F' }}> {data2}</option>)
                    }

                    )}
                  </select>
                  {formik.errors.role && formik.touched.role ? (
                    <div className="text-danger fs-6">
                      {formik.errors.role}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <button
                  disabled={adminData.loading}
                  style={{ marginTop: '35px' }}
                  className=" submit_btn w-100  btn-md text-light font-weight-bold"
                  type="submit"
                >
                  {adminData.loading ? <LoaderButton /> : "Create"}
                </button>
              </form>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </div>
  );
}

//Getting the state from the store
const mapStateToProps = (state) => {
  return {
    adminData: state.createAdmin,
  };
};

//passing the userData in createNewAdmin function and also dispatch method
const mapDispatchToProps = (dispatch) => {
  return {
    createNewAdmin: (config, navigate) => dispatch(createNewAdmin(config, navigate)),
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(CreateAdminPopup);
