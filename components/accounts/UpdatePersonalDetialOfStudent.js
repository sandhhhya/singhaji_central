import { useState, useEffect } from 'react'
import allUrls from '../../../redux/constants/url'
import { useFormik } from 'formik'
import NumberFormat from 'react-number-format'
import Select from 'react-select'
import axios from 'axios'

import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;

`;

const style = {
    width: 500,
    bgcolor: 'white',

    // p: 2,
    // px: 4,
    pb: 3,
};

export default function UpdatePersonalDetialOfStudent() {

    const [branchNames, setBranchNames] = useState([{ subjects: 'loading...', id: 0 }])
    const [villageNames, setVillageNames] = useState([{ label: 'loading...', villageId: 0 }])

    useEffect(() => {


        const getData = async () => {

            const branchName = await axios(allUrls.branchList)
            // console.log(branchName.data);
            // console.log("branch Name ", branchName.data);
            setBranchNames(branchName.data)

            /////////////////////////
            const villageNamesRes = await axios(allUrls.villageNameList)
            let newVillageName = [];
            villageNamesRes.data.forEach((ele) => { newVillageName.push({ 'label': ele.villagename, 'value': ele.villagename }) })
            // console.log(newVillageName);
            setVillageNames(newVillageName);
        }
        getData();
    }, [])

    const initialValues = {
        studentName: '',
        fatherName: '',
        contactNumber: '',
        FatherContactNumber: '',
        dob: '',
        village: '',
        streamName: '',
        aadharNumber: '',

    }

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values);
        }
    })



    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Open modal
            </button>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}  >
                    <div style={{ borderRadius: '5px' }}>

                        <div className='d-flex fw-bold text-light p-2' style={{
                            justifyContent: 'center',
                            backgroundColor: 'orange', width: '100%', margin: 0
                        }}>Edit Personal Detail </div>
                        <div className="d-flex p-1">
                            <div className="row">
                                <div className='row m-1'>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Student Name</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.studentName}
                                            name="studentName"
                                            type="text"
                                            className={formik.touched.studentName ? `form-control ${formik.errors.studentName ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Student name"
                                        />
                                        {formik.errors.studentName && formik.touched.studentName ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.studentName}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
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



                                </div>

                                {/* Second Four Input Field */}
                                <div className='row m-1'>

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

                                </div>

                                <div className='row m-1'>
                                    <div className="col">
                                        <div className="col">
                                            <label className="addStdLable" htmlFor="">Stream Name</label>

                                            <select name="streamName" value={formik.values.streamName} onBlur={formik.handleBlur}

                                                onChange={formik.handleChange} className={formik.touched.streamName ? `form-select ${formik.errors.streamName ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02" placeholder="select">
                                                <option value=''>Select branch</option>
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
                                            className={formik.touched.village ? ` ${formik.errors.village ? "invalid" : ""}` : ''}
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
                            </div>
                        </div>
                    </div>
                </Box>
            </StyledModal>
        </div>
    );
}
