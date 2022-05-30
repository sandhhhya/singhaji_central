import {
  CButton,
  CModal,
  CModalBody,
} from "@coreui/react";
import React, { useState } from "react";
import { Tooltip, Whisper } from "rsuite";

import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createFeesStructure } from "../../redux/actionDispatcher/superAdmin/createFeesStrucDispather";
import "./styles/createAdmin.css";
import { baseUrl } from "../../redux/constants/url";
import crossButton from "../assests/image/crossButton.svg";
import Edit_icon from "../assests/image/Edit_icon.svg";
import axios from "axios";
import Swal from "sweetalert2";

import { changeTotalFees } from "../../redux/actionDispatcher/superAdmin/feesStructureTableDataDispatcher";
import './styles/Table.css'
import LoaderButton from "../assests/common/LoaderButton";
import AllUrl from "../../redux/constants/url"
import { useNavigate } from "react-router-dom";

function FeesStructure({ statusData, createFees, original, changeFeesStatus, table_data }) {
  const token = localStorage.getItem("token");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    totalFees: Yup.string().required("Required*").test('Is positive', 'must be positive', val => val >= 0).test('Is positive', 'fees must be less than 100000', val => val <= 100000),
    stream: Yup.string().required("Required*"),
    startYear: Yup.number().required("Required*"),
    endYear: Yup.number().required("Required*"),
  });

  const [fieldData, setFieldData] = useState([
    {
      "id": 0,
      "subjects": "Loading..."
    }
  ])

  const formik = useFormik({
    initialValues: {
      stream: "",
      startYear: "",
      endYear: "",
      totalFees: original ? original.totalFees : "",
    },
    validationSchema,

    onSubmit: async (values) => {

      if (original) {
        if (formik.values.totalFees > 1000) {
          var update = JSON.stringify({
            branchSchemaCode: formik.values.stream + formik.values.startYear,
            totalFees: `${formik.values.totalFees}`,
          })

          var updateSchema = {
            method: 'post',
            url: AllUrl.updateSchema,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            data: update
          };
          changeFeesStatus(updateSchema, setVisible, visible)
          // setVisible(!visible)
        }
      }
      else {
        var data = JSON.stringify({
          branchName: formik.values.stream,
          startingYear: formik.values.startYear,
          endingYear: formik.values.endYear,
          totalFees: formik.values.totalFees,
        });


        var config = {
          method: "post",
          url: AllUrl.createSchema,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: data,
        };
        createFees(config, navigate, setVisible, visible);
      }
    },
  });

  if (!original) {
    if (formik.values.startYear > formik.values.endYear) {
      formik.errors.endYear = "End year always greater then start year"
    }
  }

  const getData = async () => {
    setVisible(!visible)
    if (!visible) {
      let url = `${baseUrl}/api/list_branch`
      var dropdownData = await axios(url)
      if (dropdownData.status === 200) {
        var data = dropdownData.data
        setFieldData(data)

      } else {
        Swal.fire({
          position: 'top-center',
          icon: 'warning',
          title: 'Network problem ! ',
          showConfirmButton: false,
          timer: 2500,
          showClass: {
            backdrop: 'swal2-noanimation', // disable backdrop animation
            popup: '',                     // disable popup animation
            icon: ''                       // disable icon animation
          },
          hideClass: {
            popup: '',                     // disable popup fade-out animation
          }
        })
      }
    }
  }

  if (original) {
    formik.values.stream = original.branchName;
    formik.values.startYear = original.startingYear;
    formik.values.endYear = original.endingYear;
  }

  return (
    <>

      {original ? (
        <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={
          <Tooltip>
            Edit Fees Structure
          </Tooltip>}>

          <img
            style={{ cursor: "pointer" }}
            src={Edit_icon}
            alt="Edit"
            onClick={() => { getData() }}
          />
        </Whisper>

      ) : (
        <CButton
          style={{
            borderWidth: "1px solid #ffc107 ",
            backgroundColor: "white",
            color: "orange",
            outline: "orange",
            borderColor: "orange",
            marginRight: "10px",
            padding: "5px 15px",
            fontWeight: "bold",
          }}
          onClick={() => { getData() }}
        >
          Create Fees Structure <i className="fas fa-plus pl-3"></i>
        </CButton>
      )}


      <CModal
        alignment="center"
        visible={visible}
        onClose={() => {
          formik.handleReset();
          setVisible(false);
        }}
      >


        <CModalBody>
          <div className="first_div createAdmin">
            <div className="second_div ">
              <form onSubmit={formik.handleSubmit}>
                <img onClick={() => setVisible(!visible)}
                  style={{ height: "20px", width: "20px", marginLeft: '110%', marginTop: "-10px", cursor: "pointer" }} src={crossButton} alt="close" className="logo_img" />
                <h4 className=" text-aligns-center createAdminhead" style={{ marginRight: "30px", fontWeight: 'bold', color: '#5A607F' }}>
                  {original ? "Update Fees Structure" : "Create Fees Structure"}
                </h4>
                <div className=" mb-3 mt-3">
                  <label htmlFor="stream" className="labels"  >
                    Stream
                  </label>
                  <select
                    disabled={original}
                    name="stream"
                    id="stream"
                    className="form-select input-lg text-secondary  border-secondary  "
                    value={formik.values.stream}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // eslint-disable-next-line
                    type="text"
                  >
                    <option value='' className="fields form-select"   >
                      {
                        original ? `${original.branchName}` : "Stream"
                      }
                    </option>
                    {
                      fieldData.map((data) => {
                        return (
                          <option key={data.id} className="fields form-select" value={data.subjects}>
                            {data.subjects}
                          </option>
                        )

                      })
                    }

                  </select>
                  {formik.errors.stream && formik.touched.stream ? (
                    <div className="text-danger fs-6">
                      {formik.errors.stream}
                    </div>
                  ) : (
                    ""
                  )}

                  <label htmlFor="startyear" className="labels"  >
                    Start Year
                  </label>
                  <input
                    disabled={original}
                    value={formik.values.startYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // className="inputs"
                    name="startYear"
                    id="startyear"
                    type="number"
                    min="2000"
                    max="9999"
                    // eslint-disable-next-line
                    className="form-control input-lg fields"
                    placeholder="Starting year"
                  />
                  {formik.errors.startYear && formik.touched.startYear ? (
                    <div className="text-danger fs-6">
                      {formik.errors.startYear}
                    </div>
                  ) : (
                    ""
                  )}

                  <label htmlFor="endyear" className="labels"  >
                    End Year
                  </label>
                  <input
                    disabled={original}
                    value={formik.values.endYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // className="inputs"
                    name="endYear"
                    type="number"
                    min="2000"
                    max="9999"
                    id="endyear"
                    // eslint-disable-next-line
                    className="form-control input-lg fields"
                    placeholder="Ending year"
                  />
                  {formik.errors.endYear && formik.touched.endYear ? (
                    <div className="text-danger fs-6">
                      {formik.errors.endYear}
                    </div>
                  ) : (
                    ""
                  )}

                  <label htmlFor="totalfees" className="labels"  >
                    Total Fees
                  </label>
                  <input
                    value={formik.values.totalFees}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control input-lg fields"
                    name="totalFees"
                    type="number"
                    minLength={4}
                    placeholder="Total-fees"
                  />
                  {formik.errors.totalFees && formik.touched.totalFees ? (
                    <div className="text-danger fs-6">
                      {formik.errors.totalFees}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <button
                  className="submit_btn mt-2 w-100 btn-md font-weight-bold text-light"
                  type="submit"
                >
                  {
                    statusData.second_loading ? (<LoaderButton />) :
                      table_data.third_loading ? (<LoaderButton />) : (original ? "Update" : "Save")
                  }
                </button>
              </form>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
}

//Getting the state from the store
const mapStateToProps = (state) => {
  return {
    table_data: state.feesStructTableData,
    statusData: state.feeStructure,
  };
};

//passing the userData in createNewAdmin function and also dispatch method
const mapDispatchToProps = (dispatch) => {
  return {
    createFees: (data, navigate, setVisible, visible) => dispatch(createFeesStructure(data, navigate, setVisible, visible)),
    changeFeesStatus: (data, setVisible, visible) => dispatch(changeTotalFees(data, setVisible, visible)),
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(FeesStructure);
