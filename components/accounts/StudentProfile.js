import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Edit_icon from '../../assests/image/Edit_icon.svg'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/AddNewStudent.css'
import { useNavigate } from 'react-router-dom';
import student_Profile__RocketImg from '../../assests/image/AccountIcons/studentProfileRocketImg.svg'
import allUrls from '../../../redux/constants/url'
import { useFormik } from 'formik'
// import NumberFormat from 'react-number-format'
// import Select from 'react-select'
import axios from 'axios'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import * as Yup from "yup";
import AvatarImg from '../../assests/image/Avtar.jpeg'
import ToastContainer from 'rsuite/esm/toaster/ToastContainer';
import { toast } from 'react-toastify';
import checkBoxImg from '../../assests/image/AccountIcons/thirdInstallmentCheckImg.svg'
import UpdateStudentPersonalInfo from './UpdateStudentPersonalInfo';
import './Styles/StudentAccountTable.css'
import LoaderButton from '../../assests/common/LoaderButton'
import { Tooltip, Whisper } from 'rsuite';
import { Avatar } from '@mui/material';


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

function StudentProfile({ accountAction }) {
    // const [branchNames,setBranchNames] = useState([{subjects: 'loading...',id: 0}])
    // const [villageNames,setVillageNames] = useState([{label: 'loading...',villageId: 0}])
    const [loaderLoading, setLoaderLoading] = useState(false)


    useEffect(() => {


        // const getData = async () => {

        //     const branchName = await axios(allUrls.branchList)
        //     if(branchName.status === 200) {

        //         setBranchNames(branchName.data)
        //     }
        //     // console.log(branchName.data);
        //     // console.log("branch Name ", branchName.data);

        //     /////////////////////////
        //     const villageNamesRes = await axios(allUrls.villageNameList)
        //     let newVillageName = [];
        //     villageNamesRes.data.forEach((ele) => {newVillageName.push({'label': ele.villagename,'value': ele.villagename})})
        //     // console.log(newVillageName);
        //     setVillageNames(newVillageName);
        // }
        // getData();
    }, []);


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()

    const data = localStorage.getItem('userEdit')
    const StudentProfileData = JSON.parse(data)

    // console.log(StudentProfileData);

    var StudentName = StudentProfileData.accountInfo.firstName + ' ' + StudentProfileData.accountInfo.lastName
    var StudentClassName = (StudentProfileData.accountInfo.branch).toUpperCase() + '-' + StudentProfileData.accountInfo.year
    var StudentPhoto = StudentProfileData.accountInfo.photo
    // console.log(StudentPhoto);

    const initialValues = {


        accountStatus: StudentProfileData ? StudentProfileData.accountInfo.isActive : '',
        remark: StudentProfileData ? StudentProfileData.accountInfo.remark : '',
        GKB_Amount: StudentProfileData ? StudentProfileData.accountInfo.GKBAmount : '',
        Busfee: StudentProfileData ? StudentProfileData.accountInfo.busFee : '',
        reg_Fees: StudentProfileData ? StudentProfileData.accountInfo.regFees : '',
        Tutionfee: StudentProfileData ? StudentProfileData.accountInfo.totalFee : '',
        year: StudentProfileData ? StudentProfileData.accountInfo.year : '',
        Firstinstallment: StudentProfileData ? StudentProfileData.accountInfo.firstInstallment : '',
        FirstinstallmentDate: StudentProfileData ? StudentProfileData.accountInfo.firstInstallmentDate : '',
        Secondinstallment: StudentProfileData ? StudentProfileData.accountInfo.secondInstallment : '',
        SecondinstallmentDate: StudentProfileData ? StudentProfileData.accountInfo.secondInstallmentDate : '',
        Thirdinstallment: StudentProfileData ? StudentProfileData.accountInfo.thirdInstallment : '',
        ThirdinstallmentDate: StudentProfileData ? StudentProfileData.accountInfo.thirdInstallmentDate : '',
        sponsorshipType: StudentProfileData ? StudentProfileData.accountInfo.sponsorshipType : '',
        feesScheme: StudentProfileData ? StudentProfileData.accountInfo.feesScheme : '',
        registrationNumber: StudentProfileData ? StudentProfileData.accountInfo.registrationNo : '',


    }
    const validationSchema = Yup.object({


        accountStatus: Yup.string().required("Required!"),
        remark: Yup.string().required("Required!"),
        GKB_Amount: Yup.string().required("Required!"),
        Busfee: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),
        reg_Fees: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),
        Tutionfee: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),
        year: Yup.string().required("Required!"),
        Firstinstallment: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),
        FirstinstallmentDate: Yup.string().required("Required!"),
        Secondinstallment: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),
        SecondinstallmentDate: Yup.string().required("Required!"),
        Thirdinstallment: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),
        ThirdinstallmentDate: Yup.string().required("Required!"),
        feesScheme: Yup.string().required("Required!"),
        sponsorshipType: Yup.string().required("Required!"),





    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);


            const UpdateAccountInfoData = {
                "stdId": StudentProfileData.accountInfo.stdId,
                "currentYear":StudentProfileData.accountInfo.currentYear,
                "isActive": formik.values.accountStatus,
                "feesScheme": formik.values.feesScheme,
                "totalFee": formik.values.Tutionfee,
                "sponsorshipType": formik.values.sponsorshipType,
                'year': formik.values.year,
                "regFees": formik.values.reg_Fees,
                "busFee": formik.values.Busfee,
                "GKBAmount": formik.values.GKB_Amount,
                "firstInstallment": formik.values.Firstinstallment,
                "firstInstallmentDate": formik.values.FirstinstallmentDate,
                "secondInstallment": formik.values.Secondinstallment,
                "secondInstallmentDate": formik.values.SecondinstallmentDate,
                "thirdInstallment": formik.values.Thirdinstallment,
                "thirdInstallmentDate": formik.values.ThirdinstallmentDate,
                "remark": formik.values.remark,
                "registrationNo": formik.values.registrationNumber
            }
            const token = localStorage.getItem("token");
            var config = {
                method: 'post',
                url: allUrls.updateAccountInformation,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: UpdateAccountInfoData
            };
            // console.log(config, UpdatePersonalInfoData)
            setLoaderLoading(true)

            const response = await axios(config)
            if (response.status === 200) {
                setLoaderLoading(false)
                toast.success('Account Information Successfully Updated', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
                setLoaderLoading(false)
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
            else if (response.status === 404) {
                setLoaderLoading(false)
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
            else if (response.status === 406) {
                setLoaderLoading(false)
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
            else if (response.status === 500) {
                setLoaderLoading(false)
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
            else {
                setLoaderLoading(false)
            }
            // console.log(response.status);

        }
    })





    return (
        <div>
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
            <form onSubmit={formik.handleSubmit}>

                <div className="d-flex my-3 me-3 ms-2" style={{ backgroundColor: '#E6E9F4', borderRadius: '8px' }}>
                    <div className="col-6 d-flex my-5">
                        <div >

                            {StudentPhoto.includes('/null') ?
                                <img style={{ borderRadius: "50px", height: "100px", width: '100px', marginLeft: '50px', backgroundColor: '#DDDDDD' }} src={AvatarImg} alt="avtar_photo" />
                                :
                                <Avatar src={StudentPhoto}
                                    alt="profile"
                                    style={{ borderRadius: "50px", height: "100px", width: '100px', marginLeft: '50px', backgroundColor: '#DDDDDD' }}

                                    className="mx-auto"

                                ><span style={{ fontSize: '75px', color: 'rgb(90, 96, 127)' }}>{StudentName.slice(0, 1)}</span></Avatar>
                                // <img style={{borderRadius: "50px",height: "100px",width: '100px',marginLeft: '50px',backgroundColor: '#DDDDDD'}} src={StudentPhoto} alt="avtar_photo" />
                            }

                            {/* <img src={Edit_icon} alt='edit_icon' className='mt-5' style={{marginLeft: "-10px",height: '20px',width: '20px'}} /> */}

                        </div>
                        <div className='ml-4'>

                            <div style={{ color: '#5A607F' }}>
                                <span className='fw-bold' style={{ fontSize: '22px' }}>{StudentName}</span>
                                <br />
                                <span style={{ fontWeight: 500 }} > {`${StudentClassName} (${StudentProfileData.accountInfo.joinBatch + '-' + (parseInt(StudentProfileData.accountInfo.joinBatch) + 3)})`}</span>
                            </div>
                            <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                <button style={{ backgroundColor: '#f99300', borderRadius: '11px 0px 0px 11px' }} onClick={() => { navigate("feesrecipt"); }} className="btn  btn-warning text-light fw-bold" type="submit">Receipt</button>

                                <button style={{ color: '#4F83DF', backgroundColor: '#e6e9f4', borderRadius: ' 0px 11px 11px 0px', border: '1px solid #4F83DF' }} className="btn btn-outline fw-bold" type="submit" onClick={() => { navigate("uploaddocument"); }}>Upload Document</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <img src={student_Profile__RocketImg} className='mt-4 ' alt="rocket" />
                        <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={
                            <Tooltip>
                                Edit personal info.
                            </Tooltip>
                        }>

                            <img src={Edit_icon} onClick={handleOpen} className='mb-1 ' alt="rocket" style={{ height: '40px', width: '40px', alignSelf: 'self-end', cursor: 'pointer' }} />
                            {/* <img src={Edit_icon} alt='edit_icon'  /> */}
                        </Whisper>
                        {/* <Whisper/> */}
                    </div>
                </div>

                <StyledModal
                    aria-labelledby="unstyled-modal-title"
                    aria-describedby="unstyled-modal-description"
                    open={open}
                    onClose={handleClose}
                    BackdropComponent={Backdrop}
                >
                    <Box sx={style}>
                        <UpdateStudentPersonalInfo handleClose={handleClose} />
                    </Box>
                </StyledModal>

                <Accordion className="my-2 me-3 ms-2" expanded={true} >
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{
                            backgroundColor: '#E6E9F4 ', borderBottom: '2px solid orange', maxHeight: "50px", minHeight: "50px"
                        }}
                    >
                        <Typography style={{ color: "#414c97", margin: "0px" }}><b> Fees Details</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: '#F4F7FC', padding: '15px' }}>
                        <Typography component={'div'} >
                            {/* Personal Details */}


                            <div className="row mt-3">
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">Account status</label>
                                    <select name="accountStatus" value={formik.values.accountStatus} onChange={formik.handleChange} className={formik.touched.accountStatus ? `form-select ${formik.errors.accountStatus ? "invalid" : ""}` : 'form-select'} >
                                        <option value="true">Active</option>
                                        <option value="false">Deactive</option>
                                    </select>
                                    {formik.errors.accountStatus && formik.touched.accountStatus ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.accountStatus}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">Fees Scheme</label>
                                    <select name="feesScheme" value={formik.values.feesScheme} onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} className={formik.touched.feesScheme ? `form-select ${formik.errors.feesScheme ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02" placeholder="select">
                                        <option value='none'>None</option>
                                        <option value='fullFees'>Full Fees</option>
                                        <option value='oneShot'>One Shot</option>
                                        <option value='OnlyScholarShip'>OnlyScholarShip</option>
                                    </select>
                                    {formik.errors.feesScheme && formik.touched.feesScheme ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.feesScheme}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">Course Fees</label>
                                    <input name="Tutionfee" onChange={formik.handleChange} disabled value={formik.values.Tutionfee} type="number" className='form-control' placeholder='Course Fees' />
                                    {formik.errors.Tutionfee && formik.touched.Tutionfee ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.Tutionfee}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">Sponsorship Type</label>
                                    <select name="sponsorshipType"
                                        value={formik.values.feesScheme !== "none" ? formik.values.sponsorshipType = "none" : formik.values.sponsorshipType}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} className={formik.touched.sponsorshipType ? `form-select ${formik.errors.sponsorshipType ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02" placeholder="select" disabled={formik.values.feesScheme === "none" ? false : true} >
                                        <option value='none'>None</option>
                                        <option value='SNS_SVS'>SNS_SVS</option>
                                        <option value='Rewa'>Rewa</option>
                                    </select>
                                    {formik.errors.sponsorshipType && formik.touched.sponsorshipType ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.sponsorshipType}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>


                            <div className="row mt-3">
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">Registration Amount</label>
                                    <input name="reg_Fees" onChange={formik.handleChange} value={formik.values.reg_Fees} type="text" className='form-control' placeholder='Registration Amount' disabled />
                                    {formik.errors.reg_Fees && formik.touched.reg_Fees ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.reg_Fees}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">Registration Number</label>
                                    <input name="registrationNumber" onChange={formik.handleChange} value={formik.values.registrationNumber} type="text" className='form-control' placeholder='Registration number ' />
                                    {formik.errors.registrationNumber && formik.touched.registrationNumber ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.registrationNumber}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">Bus Fees</label>
                                    <input name="Busfee" onChange={formik.handleChange} value={formik.values.Busfee} type="number" className='form-control' placeholder='Bus Fees' />
                                    {formik.errors.Busfee && formik.touched.Busfee ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.Busfee}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">GKB Amount</label>
                                    <input name="GKB_Amount" onChange={formik.handleChange} disabled value={formik.values.GKB_Amount} type="number" className='form-control' placeholder='Father contact' />
                                    {formik.errors.GKB_Amount && formik.touched.GKB_Amount ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.GKB_Amount}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">First Installment</label>
                                    <input name="Firstinstallment" onChange={formik.handleChange} value={formik.values.Firstinstallment} type="number" className='form-control' placeholder='First Installment' />
                                    {formik.errors.Firstinstallment && formik.touched.Firstinstallment ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.Firstinstallment}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">First Installment date</label>
                                    <input name="FirstinstallmentDate" onChange={formik.handleChange} value={formik.values.FirstinstallmentDate} type="date" className='form-control' placeholder='First Installment date' />
                                    {formik.errors.FirstinstallmentDate && formik.touched.FirstinstallmentDate ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.FirstinstallmentDate}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">Second Installment</label>
                                    <input name="Secondinstallment" onChange={formik.handleChange} value={formik.values.Secondinstallment} type="number" className='form-control' placeholder='Second Installment' />
                                    {formik.errors.Secondinstallment && formik.touched.Secondinstallment ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.Secondinstallment}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">Second Installment date</label>
                                    <input name="SecondinstallmentDate" onChange={formik.handleChange} value={formik.values.SecondinstallmentDate} type="date" className='form-control' placeholder='Second Installment date' />
                                    {formik.errors.SecondinstallmentDate && formik.touched.SecondinstallmentDate ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.SecondinstallmentDate}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>

                            <div className="row mt-3">

                                <div className=' col'><label className='addStdLable' htmlFor="">Third Installment</label>
                                    <div className="d-flex">
                                        <input name="Thirdinstallment" onChange={formik.handleChange} value={formik.values.Thirdinstallment} type="number" className='form-control' placeholder='Third Installment' />

                                        {StudentProfileData.accountInfo.scholarshipAmount > 0 ? <img style={{ marginLeft: "-25px" }} src={checkBoxImg} alt="." /> : ''}
                                    </div>
                                    {formik.errors.Thirdinstallment && formik.touched.Thirdinstallment ? (
                                        <div className=" text-danger fs-6">
                                            {formik.errors.Thirdinstallment}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div>
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">Third Installment date</label>
                                    <input name="ThirdinstallmentDate" onChange={formik.handleChange} value={formik.values.ThirdinstallmentDate} type="date" className='form-control' placeholder='Third Installment date' />
                                    {formik.errors.ThirdinstallmentDate && formik.touched.ThirdinstallmentDate ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.ThirdinstallmentDate}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">Remark</label>
                                    <input name="remark" onChange={formik.handleChange} value={formik.values.remark} type="text" className='form-control' placeholder='Remark' />
                                    {formik.errors.remark && formik.touched.remark ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.remark}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <label className='addStdLable' htmlFor="">Year</label>

                                    <select name="year" value={formik.values.year} onBlur={formik.handleBlur}
                                        disabled
                                        onChange={formik.handleChange} className={formik.touched.year ? `form-select ${formik.errors.year ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02" placeholder="select">

                                        <option value='I'>I</option>
                                        <option value='II'>II</option>
                                        <option value='III'>III</option>

                                    </select>
                                    {formik.errors.year && formik.touched.year ? (
                                        <div className="text-danger fs-6">
                                            {formik.errors.year}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                </div>
                            </div>

                            <div className="d-flex  justify-content-end my-4" >
                                <div className="me-2">

                                    <button className="btn btn-sm text-light fw-bold m-1 " style={{ width: "219px", height: "40px", backgroundColor: "#4f83df" }} type="submit"
                                        disabled={loaderLoading}
                                    // disabled={true}
                                    >{loaderLoading ? (<LoaderButton />) : "Update"}
                                    </button>
                                </div>
                            </div>


                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </form>
        </div>
    )
}

export default StudentProfile
