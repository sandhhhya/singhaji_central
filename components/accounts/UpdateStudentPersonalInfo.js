import React from 'react'
import allUrls from '../../../redux/constants/url'
import { useFormik } from 'formik'
import NumberFormat from 'react-number-format'
import Select from 'react-select'
import axios from 'axios'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { accountAction } from '../../../redux/actionDispatcher/superAdmin/studentAccountTableDataDispatcher';
// import { useNavigate } from 'react-router-dom';


function UpdateStudentPersonalInfo({ handleClose }) {


    const data = localStorage.getItem('userEdit')
    const StudentProfileData = JSON.parse(data)

    const [branchNames, setBranchNames] = useState([{ subjects: 'loading...', id: 0 }])
    const [villageNames, setVillageNames] = useState([{ label: 'loading...', villageId: 0 }])


    useEffect(() => {


        const getData = async () => {

            const branchName = await axios(allUrls.branchList)
            if (branchName.status === 200) {

                setBranchNames(branchName.data)
            }
            // console.log(branchName.data);
            // console.log("branch Name ", branchName.data);

            /////////////////////////
            const villageNamesRes = await axios(allUrls.villageNameList)
            let newVillageName = [];
            villageNamesRes.data.forEach((ele) => { newVillageName.push({ 'label': ele.villageName, 'value': ele.villageName }) })
            // console.log(newVillageName);
            setVillageNames(newVillageName);
        }
        getData();
    }, []);

    const initialValues = {
        firstName: StudentProfileData ? StudentProfileData.accountInfo.firstName : '',
        lastName: StudentProfileData ? StudentProfileData.accountInfo.lastName : '',
        fatherName: StudentProfileData ? StudentProfileData.accountInfo.fathersName : '',
        contactNumber: StudentProfileData ? StudentProfileData.accountInfo.mobile : '',
        FatherContactNumber: StudentProfileData ? StudentProfileData.accountInfo.fatherContactNumber : '',
        dob: StudentProfileData ? StudentProfileData.accountInfo.dob : '',
        village: StudentProfileData ? StudentProfileData.accountInfo.village : '',
        streamName: StudentProfileData ? StudentProfileData.accountInfo.branch : '',
        aadharNumber: StudentProfileData ? (StudentProfileData.accountInfo.aadharNo).toString().match(/.{4}/g).join(' ') : '',
        EnrollmentNumber: StudentProfileData ? StudentProfileData.accountInfo.enrollmentNo : '',
    }

    const validationSchema = Yup.object({

        firstName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'must be alphabates').required("Required!"),
        lastName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'must be alphabates').required("Required!"),
        fatherName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'must be alphabates').required("Required!"),
        dob: Yup.string().required("Required!").test('doc_check', 'Minimum age must be 12-14 years', val => val?.slice(0, 4) <= (new Date().getFullYear()) - 13),
        contactNumber: Yup.string().trim().min(10, 'Must be exactly 10 digits').required("Required!"),
        FatherContactNumber: Yup.string().trim().min(10, 'Must be exactly 10 digits').required("Required!"),
        aadharNumber: Yup.string().trim().required("Required!").test('len', 'Must be exactly 12 digits', val => val?.replace('X', '').length === 14),
        village: Yup.string().required("Required!").trim().min(3, 'minimum 3 characters required').matches(/^[a-zA-Z]+$/, 'must be alphabates'),
        // EnrollmentNumber: Yup.string().required("Required!"),
        streamName: Yup.string().required("Required!"),


    })


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);

            const UpdatePersonalInfoData = {
                "stdId": StudentProfileData.accountInfo.stdId,
                "firstName": formik.values.firstName,
                "lastName": formik.values.lastName,
                "branch": formik.values.streamName,
                "fathersName": formik.values.fatherName,
                "dob": formik.values.dob,
                "mobile": formik.values.contactNumber,
                "fatherContactNumber": formik.values.FatherContactNumber,
                "aadharNo": formik.values.aadharNumber.split(' ').join(''),
                "village": formik.values.village,
                "enrollmentNo": formik.values.EnrollmentNumber,

            }
            const token = localStorage.getItem("token");
            var config = {
                method: 'post',
                url: allUrls.updatePersonalInformation,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: UpdatePersonalInfoData
            };
            // console.log(config, UpdatePersonalInfoData)

            const response = await axios(config)
            console.log(response);
            if (response.status === 200) {
                toast.success('Personal Information Successfully Updated', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(
                    handleClose()
                    , 2000
                )
                let backData = JSON.stringify({
                    "stdId": StudentProfileData.accountInfo.stdId,
                });
                let getBackData = {
                    method: 'post',
                    url: allUrls.allInfoOfActiveStudent,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    data: backData
                };
                axios(getBackData)
                    .then(function (response) {

                        console.log(response);
                        if (response.status === 200) {
                            localStorage.setItem('userEdit', JSON.stringify(response.data));
                            window.location.reload();
                        }
                    })
            }
            else if (response.status === 400) {
                toast.warn('Invalid Email', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else if (response.status === 406) {
                toast.warn('User Not Found', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                toast.warn('Internal server error', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            // console.log(response.status);

        },

    });

    return (
        <>

            <div>
                <form onSubmit={formik.handleSubmit}>


                    <div style={{ borderRadius: '5px' }}>

                        <div className='d-flex fw-bold text-light p-2' style={{
                            justifyContent: 'center',
                            backgroundColor: 'orange', width: '100%', margin: 0
                        }}>Edit Personal Detail </div>
                        <div className="d-flex p-1">
                            <div className="row">
                                <div className='row m-1'>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">First Name</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.firstName}
                                            name="firstName"
                                            type="text"
                                            className={formik.touched.firstName ? `form-control ${formik.errors.firstName ? "invalid" : ""}` : 'form-control'}
                                            placeholder="First name"
                                        />
                                        {formik.errors.firstName && formik.touched.firstName ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.firstName}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Last Name</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.lastName}
                                            name="lastName"
                                            type="text"
                                            className={formik.touched.lastName ? `form-control ${formik.errors.lastName ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Last Name"
                                        />
                                        {formik.errors.lastName && formik.touched.lastName ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.lastName}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>




                                </div>

                                {/* Second Four Input Field */}
                                <div className='row m-1'>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Father Name</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.fatherName}
                                            name="fatherName"
                                            type="text"
                                            className={formik.touched.fatherName ? `form-control ${formik.errors.fatherName ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Father Name"
                                        />
                                        {formik.errors.fatherName && formik.touched.fatherName ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.fatherName}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Contact Number</label>
                                        <NumberFormat onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.contactNumber}
                                            name="contactNumber" placeholder="Contact Number" className={formik.touched.contactNumber ? `form-control ${formik.errors.contactNumber ? "invalid" : ""}` : 'form-control'} format="##########" />
                                        {formik.errors.contactNumber && formik.touched.contactNumber ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.contactNumber}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>



                                </div>

                                <div className='row m-1'>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Father Contact</label>
                                        <NumberFormat onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.FatherContactNumber}
                                            name="FatherContactNumber" placeholder="Father Contact"
                                            className={formik.touched.FatherContactNumber ? `form-control ${formik.errors.FatherContactNumber ? "invalid" : ""}` : 'form-control'}
                                            format="##########" />
                                        {formik.errors.FatherContactNumber && formik.touched.FatherContactNumber ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.FatherContactNumber}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Stream Name</label>

                                        <select name="streamName" value={formik.values.streamName} onBlur={formik.handleBlur}

                                            onChange={formik.handleChange} className={formik.touched.streamName ? `form-select ${formik.errors.streamName ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02" placeholder="select">
                                            {branchNames.map((ele, i) => {
                                                return (
                                                    <option key={i} value={ele.subjects}>{ele.subjects}</option>
                                                )
                                            })}

                                        </select>
                                        {formik.errors.streamName && formik.touched.streamName ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.streamName}
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                    </div>

                                </div>
                                <div className='row m-1'>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Enrollment number</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.EnrollmentNumber}
                                            name="EnrollmentNumber"
                                            type="text"
                                            className={formik.touched.EnrollmentNumber ? `form-control ${formik.errors.EnrollmentNumber ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Enrollment number"
                                        />
                                        {formik.errors.EnrollmentNumber && formik.touched.EnrollmentNumber ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.EnrollmentNumber}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">DOB</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.dob}
                                            name="dob"
                                            type="date"
                                            className={formik.touched.dob ? `form-control ${formik.errors.dob ? "invalid" : ""}` : 'form-control'}
                                            placeholder="DOB"
                                        />
                                        {formik.errors.dob && formik.touched.dob ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.dob}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>




                                </div>
                                {/* Fourth four input feild */}
                                <div className='row m-1'>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Village</label>

                                        <Select
                                            options={villageNames}
                                            onChange={({ value }) => { formik.setFieldValue('village', value) }}
                                            onBlur={formik.handleBlur}
                                            name="village"
                                            styles={{control: base => ({
                                                ...base,
                                                height: 35,
                                                minHeight: 40
                                              })}}
                                            className={formik.touched.village ? ` ${formik.errors.village ? "invalid" : ""}` : ''}
                                            defaultValue={StudentProfileData ? { label: StudentProfileData.accountInfo.village, value: StudentProfileData.accountInfo.village } : ''}
                                            placeholder="Village"
                                        />
                                        {formik.errors.village && formik.touched.village ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.village}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Aadhar Number</label>
                                        <NumberFormat onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.aadharNumber}
                                            name="aadharNumber"
                                            // placeholder="Aadhar Number"
                                            className={formik.touched.aadharNumber ? `form-control ${formik.errors.aadharNumber ? "invalid" : ""}` : 'form-control'}
                                            format="#### #### ####"
                                            mask={'X'}
                                            placeholder="EX:- 436175370721"
                                        />
                                        {formik.errors.aadharNumber && formik.touched.aadharNumber ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.aadharNumber}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>


                                </div>
                                <div className="d-flex justify-content-end mt-3 m-1">
                                    <div className='me-3'>
                                        <button style={{ width: '116px', height: "41px" }} type='button' onClick={handleClose} className='btn  btn-light m-2'>Cancel</button>
                                        <button style={{ width: '153px', height: '41px' }} type="submit" onSubmit={formik.handleSubmit} className='btn  btn-primary ml-2' >Update</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        accountAction: (config, navigate, is_reciptBtn, setLoading) => dispatch(accountAction(config, navigate, is_reciptBtn, setLoading)),
    };
};

export default connect(null, mapDispatchToProps)(UpdateStudentPersonalInfo);
