import * as React from 'react';
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./styles/AddNewStudent.css"
import Select from 'react-select'
import * as Yup from "yup";
import { useFormik } from 'formik';
import axios from 'axios';
import AddNewStudent from '../../redux/actionDispatcher/superAdmin/addNewStudentDispatcher'
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import allUrls from '../../redux/constants/url'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import LoaderButton from '../assests/common/LoaderButton'
import { isSuperAdmin } from '../../helpers/SuperAdmin';
import { isAccountAdmin } from '../../helpers/AccountAdmin';
import { isStudentAdmin } from '../../helpers/StudentAdmin';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
// import Loader from 'rsuite/Loader';
import SuccessIcon from '../assests/image/SuccessIcon.svg'
import Rectangle_img from '../assests/image/Rectangle_img.svg'
import imageCompression from 'browser-image-compression';
import UploadDocumentImage from '../assests/image/Upload_document_img.svg';
// import { Link } from 'react-router-dom';




function AddNewStudentPage({ addStudent, AddNewStudent }) {

    var editData = JSON.parse(localStorage.getItem('RegistrationEdit'));
    const navigate = useNavigate();
    // console.log('editdata',editData);
    // var editData = ''
    // console.log(editData);

    const [branchNames, setBranchNames] = useState([{ subjects: 'loading...', id: 0 }])
    const [trackNames, setTrackNames] = useState([{ trackName: 'loading...', trackId: 0 }])
    const [villageNames, setVillageNames] = useState([{ label: 'loading...', villageId: 0 }])
    const [loaderLoading, setLoaderLoading] = useState(false)


    useEffect(() => {


        const callingFun = async () => {

            ///////////////////////////////
            const branchName = await axios(allUrls.branchList)
            // console.log(branchName.data);
            // console.log("branch Name ", branchName.data);
            setBranchNames(branchName.data)

            /////////////////////////
            const villageNamesRes = await axios(allUrls.villageNameList)
            let newVillageName = [];
            villageNamesRes.data.forEach((ele) => { newVillageName.push({ 'label': ele.villageName, 'value': ele.villageName }) })
            // console.log(newVillageName);
            setVillageNames(newVillageName);

            /////////////////////////////
            const trackNamesRes = await axios(allUrls.trackList)
            // console.log(trackNamesRes.data);
            setTrackNames(trackNamesRes.data);
        }
        callingFun();
        getCourseFees();

        return () => {
            localStorage.removeItem('RegistrationEdit')
            localStorage.removeItem('SelfRegistrationEdit')
        }
    }, []);


    // const initialValues = {
    //     //not working
    //     // Date of birth , village name  , category name , 12 subject , scheme fees  , GKB scholarship , track name 

    //     // Personal Detail start here
    //     firstName: editData ? editData.firstName : "",
    //     lastName: editData ? editData.lastName : "",
    //     dob: editData ? editData.dob : "", // not working properly
    //     contactNumber: editData ? editData.mobile : "",
    //     fatherName: editData ? editData.fathersName : "",
    //     fatherOccupation: editData ? editData.fatherOccupation : "",



    //     fatherIncome: editData ? editData.fatherIncome : "",
    //     FatherContactNumber: editData ? editData.fatherContactNumber === null ? "" : editData.fatherContactNumber : "",
    //     address: editData ? editData.address : "",
    //     pincode: editData ? editData.pincode : "",
    //     village: editData ? editData.village : "",// not working
    //     tehsil: editData ? editData.tehsil : "",
    //     district: editData ? editData.district : "",
    //     email: editData ? editData.email : "",
    //     aadharNumber: editData ? (editData.aadharNo).match(/.{4}/g).join(' ') : "",
    //     category: editData ? editData.category : "",
    //     gender: editData ? editData.gender : "male",
    //     // Personal information end here 

    //     //Acadmic Details stated from here
    //     schoolName: editData ? editData.schoolName : "",
    //     subject12: editData ? editData.school12sub : "",
    //     streamName: editData ? editData.branch : "",
    //     joinBatch: editData ? editData.joinBatch : new Date().getFullYear(),
    //     rollNumber12: editData ? editData.rollNumber12 : "",
    //     persentage12: editData ? editData.persentage12 : "",
    //     year: editData ? editData.year : "",
    //     percent10: editData ? editData.persentage10 : "",
    //     rollNumber10: editData ? editData.rollNumber10 : "",
    //     //Acadmic Details end  here

    //     // Fees detail start from here 
    //     GKBAmount: editData ? editData.GKB_Amount : 0,
    //     postmatricAmount: editData ? editData.Postmetric_Amount : 0,

    //     // editData.pendingFee[0].PendingFees
    //     firstInstallmentDate: editData ? editData.FirstinstallmentDate : "",
    //     firstInstallment: editData ? editData.Firstinstallment : 0,
    //     secondInstallmentDate: editData ? editData.SecondinstallmentDate : "",
    //     secondInstallment: editData ? editData.Secondinstallment : 0,
    //     thirdInstallmentDate: editData ? editData.ThirdinstallmentDate : "",
    //     thirdInstallment: editData ? editData.Thirdinstallment : 0,

    //     feesScheme: editData ? editData.feesScheme : 'none',
    //     sponsorshipType: editData ? editData.sponsorshipType : 'none',
    //     courseFees: editData ? editData.Tutionfee === null ? "" : editData.Tutionfee : "",
    //     regisrationFees: editData ? editData.reg_Fees : "1500",
    //     postmatricScolarship: editData ? (editData.is_Postmetric)?.toLowerCase() : "No",

    //     //remaining
    //     gkbScolarship: editData ? (editData.Is_GKB)?.toLowerCase() : "No",//not working
    //     gkbOwner: editData ? editData.GaonKiBeti === null ? "Self" : editData.GaonKiBeti : "Self",
    //     postmatricOwner: editData ? editData.Postmetric === null ? "Self" : editData.Postmetric : "Self",
    //     payableAmmount: editData ? editData.remain_Amount : "",
    //     remark: editData ? editData.remark === null ? "" : editData.remark : "",
    //     scholarshipAmount: editData ? editData.scholarshipAmount : 0,
    //     trackName: editData ? editData.trackName : "",
    //     busFee: editData ? editData.Busfee === null ? "" : editData.Busfee : "",
    //     commitment: editData ? editData.commitment : "",
    //     // Fees detail end from here 

    // }



    // editData
    const initialValues = {
        firstName: editData ? editData.firstName : "",
        lastName: editData ? editData.lastName : "",
        dob: editData ? editData.dob : "",
        contactNumber: editData ? editData.mobile : "",
        fatherName: editData ? editData.fathersName : "",
        fatherOccupation: editData ? editData.fatherOccupation : "",

        fatherIncome: editData ? editData.fatherIncome : "",
        FatherContactNumber: editData ? editData.fatherContactNumber : "",
        address: editData ? editData.address : "",
        pincode: editData ? editData.pincode : "",
        village: editData ? editData.village : "",
        tehsil: editData ? editData.tehsil : "",
        district: editData ? editData.district : "",
        email: editData ? editData.email : "",
        aadharNumber: editData ? (editData.aadharNo).match(/.{4}/g).join(' ') : "",
        category: editData ? editData.category : "",
        gender: editData ? editData.gender : "male",
        // Personal information end here 

        //Acadmic Details stated from here
        rollNumber10: editData ? editData.rollNumber10 : "",
        percent10: editData ? editData.persentage10 : "",
        schoolName: editData ? editData.schoolName : "",
        subject12: editData ? editData.school12Sub : "",
        rollNumber12: editData ? editData.rollNumber12 : "",
        streamName: editData ? editData.branch : "",
        persentage12: editData ? editData.persentage12 : "",
        joinBatch: editData ? editData.joinBatch : new Date().getFullYear(),
        courseFees: editData ? editData.tutionFee === null ? "" : editData.tutionFee : "",
        year: editData ? editData.year : "",
        busFee: editData ? editData.busFee : "",

        //Acadmic Details end  here

        // Fees detail start from here 
        GKBAmount: editData ? editData.GKBAmount : 0,
        postmatricAmount: editData ? editData.postmetricAmount : 0,

        firstInstallmentDate: editData ? editData.firstInstallmentDate : "",
        firstInstallment: editData ? editData.firstInstallment : 0,
        secondInstallmentDate: editData ? editData.secondInstallmentDate : "",
        secondInstallment: editData ? editData.secondInstallment : 0,
        thirdInstallmentDate: editData ? editData.thirdInstallmentDate : "",
        thirdInstallment: editData ? editData.thirdInstallment - (editData.scholarshipAmount) : 0,

        feesScheme: editData ? editData.feesScheme : 'none',
        sponsorshipType: editData ? editData.sponsorshipType : 'none',
        regisrationFees: editData ? editData.regFees : "1500",
        postmatricScolarship: editData ? (editData.isPostmetric) : "No",


        gkbScolarship: editData ? editData.isGKB : "No",
        gkbOwner: editData ? editData.gaonKiBeti : "Self",
        postmatricOwner: editData ? editData.postmetric : "Self",
        payableAmmount: editData ? editData.totalFee : "",
        remark: editData ? editData.remark : "",
        scholarshipAmount: editData ? editData.scholarshipAmount : 0,
        trackName: editData ? editData.trackName : "",
        commitment: editData ? 'null' : "",

        // Fees detail end from here 

    }

    const validationSchema = Yup.object({
        firstName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'must be alphabates').required("Required!").test('len', 'Must be less then 24 character', val => val?.length < 24),
        lastName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/^[a-zA-Z]+$/, 'must be alphabates').required("Required!").test('len', 'Must be less then 24 character', val => val?.length < 24),
        dob: Yup.string().required("Required!").test('doc_check', 'Minimum age must be 12-14 years', val => val?.slice(0, 4) <= (new Date().getFullYear()) - 13),
        contactNumber: Yup.string().trim().min(10, 'Must be exactly 10 digits').required("Required!"),
        fatherName: Yup.string().trim().min(3, 'minimum 3 characters required').matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'must be alphabates').required("Required!").test('len', 'Must be less then 24 character', val => val?.length < 24),
        fatherOccupation: Yup.string().required("Required!").matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, 'must be alphabates'),
        fatherIncome: Yup.string().required("Required!").min(4, 'Must be exactly 4 digits').test('Is positive', 'must be positive', val => val > 0),
        FatherContactNumber: Yup.string().trim().min(10, 'Must be exactly 10 digits').required("Required!"),
        address: Yup.string().trim().min(10, 'minimum 10 characters required').required("Required!"),
        village: Yup.string().required("Required!").trim().min(3, 'minimum 3 characters required').matches(/^[a-zA-Z]+$/, 'must be alphabates'),
        pincode: Yup.string().trim().required("Required!").test('len', 'Must be exactly 6 digits', val => val?.replace('X', '').length === 6),
        tehsil: Yup.string().trim().min(3, 'minimum 3 characters required').required("Required!").matches(/^[a-zA-Z]+$/, 'must be alphabates'),
        district: Yup.string().trim().min(3, 'minimum 3 characters required').required("Required!").matches(/^[a-zA-Z]+$/, 'must be alphabates'),
        email: Yup.string().email("Invalid Email Format ").required("Required!"),
        aadharNumber: Yup.string().trim().required("Required!").test('len', 'Must be exactly 12 digits', val => val?.replace('X', '').length === 14),
        category: Yup.string().required("Required!"),

        percent10: Yup.string().required("Required!").test('len', 'Must be at least 33%', val => val?.replace('X', '').replace('%', '') > 32),
        rollNumber10: Yup.string().required("Required!"),
        joinBatch: Yup.string().trim().required("Required!").test('len', 'Must be exactly 4 digits', val => val?.replace('X', '').length === 4),
        persentage12: Yup.string().required("Required!").test('len', 'Must be at least 33%', val => val?.replace('X', '').replace('%', '') > 32),
        rollNumber12: Yup.string().required("Required!"),
        year: Yup.string().required("Required!"),
        streamName: Yup.string().required("Required!"),
        subject12: Yup.string().required("Required!"),
        schoolName: Yup.string().required("Required!"),

        GKBAmount: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),
        postmatricAmount: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),
        thirdInstallmentDate: Yup.string().required("Required!"),
        thirdInstallment: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),
        secondInstallmentDate: Yup.string().required("Required!"),
        secondInstallment: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),
        feesScheme: Yup.string().required("Required!"),
        firstInstallmentDate: Yup.string().required("Required!"),
        firstInstallment: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),
        courseFees: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),
        regisrationFees: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),

        postmatricScolarship: Yup.string().required("Required!"),
        gkbScolarship: Yup.string().required("Required!"),
        gkbOwner: Yup.string().required("Required!"),
        postmatricOwner: Yup.string().required("Required!"),
        remark: Yup.string("Require").required("Required!"),
        payableAmmount: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),
        // postmatricAmount: Yup.string().required("Required!"),
        // GKBAmount: Yup.string().required("Required!"),

        trackName: Yup.string().required("Required!"),
        commitment: Yup.string().required("Required!"),
        busFee: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val >= 0),

    })
    const backToProfilePage = (e) => {
        // e.preventDefault()
        if (isStudentAdmin()) {
            console.log("Navigated ");
            navigate('/student_admin_dashboard/studenttable');
        }
        else if (isAccountAdmin()) {
            console.log("Navigated ");
            navigate('/account_admin_dashboard/studenttable');
        }
        else if (isSuperAdmin()) {
            console.log("Navigated ");
            navigate('/admin_dashboard/studenttable');
        }
    }
    const updateStudentData = async (data) => {
        setLoaderLoading(true)
        data.id = editData.id
        console.log(data);
        var config = {
            method: 'post',
            url: `${allUrls.updateRegisterStudentInfo}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            data: data
        }
        const response = await axios(config)
        console.log(response);

        if (response.status === 200) {
            setLoaderLoading(false)

            Swal.fire({

                imageUrl: SuccessIcon,
                imageAlt: 'image',
                html:
                    '<h1>Success</h1>' +
                    '<hr/>' +
                    'Student Detail Successfully Updated <br/> <br/> ',
                showConfirmButton: false,
                // showCloseButton:true,
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

            backToProfilePage()
        }
        else if (response.status === 404) {
            setLoaderLoading(false)

            toast.warn('Student Not Found', {
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

            toast.warn('Internal Server Error', {
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
    }



    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {

            let CommitValue = formik.values.commitment;
            if (formik.values.commitment === 'null') {
                CommitValue = '';
            }
            const bodyData = {
                "firstName": formik.values.firstName,
                "lastName": formik.values.lastName,
                "branch": formik.values.streamName,
                "year": formik.values.year,
                "joinBatch": formik.values.joinBatch,
                "feesScheme": formik.values.feesScheme,
                "scholarshipAmount": formik.values.scholarshipAmount,
                "totalFee": formik.values.payableAmmount,
                "busFee": formik.values.busFee,
                "tutionFee": formik.values.courseFees,
                "fathersName": formik.values.fatherName,
                "dob": formik.values.dob,
                "mobile": formik.values.contactNumber,
                "fatherContactNumber": formik.values.FatherContactNumber,
                "email": formik.values.email,
                "schoolName": formik.values.schoolName,
                "school12Sub": formik.values.subject12,
                "rollNumber12": formik.values.rollNumber12,
                "persentage12": formik.values.persentage12,
                "persentage10": formik.values.percent10,
                "rollNumber10": formik.values.rollNumber10,
                "aadharNo": formik.values.aadharNumber.split(' ').join(''),
                "fatherOccupation": formik.values.fatherOccupation,
                "fatherIncome": formik.values.fatherIncome,
                "category": formik.values.category,
                "gender": formik.values.gender,
                "pincode": formik.values.pincode,
                "trackName": formik.values.trackName,
                "address": formik.values.address,
                "village": formik.values.village,
                "tehsil": formik.values.tehsil,
                "district": formik.values.district,
                "regFees": formik.values.regisrationFees,
                "firstInstallment": formik.values.firstInstallment,
                "firstInstallmentDate": formik.values.firstInstallmentDate,
                "secondInstallment": formik.values.secondInstallment,
                "secondInstallmentDate": formik.values.secondInstallmentDate,
                "thirdInstallment": formik.values.thirdInstallment + formik.values.scholarshipAmount,
                "thirdInstallmentDate": formik.values.thirdInstallmentDate,
                "gaonKiBeti": formik.values.gkbOwner,
                "GKBAmount": formik.values.GKBAmount,
                "isGKB": formik.values.gkbScolarship,
                "postmetric": formik.values.postmatricOwner,
                "postmetricAmount": formik.values.postmatricAmount,
                "isPostmetric": formik.values.postmatricScolarship,
                "remark": formik.values.remark,
                "sponsorshipType": formik.values.sponsorshipType,
                "commitment": CommitValue
            }
            //Remaining the Self register student to shift tha account table 
            editData ?
                updateStudentData(bodyData)
                :
                AddNewStudent(bodyData, backToProfilePage)
            // console.log(bodyData);
        }
    });
    // const [getCourseFee, setGetCourseFee] = useState(true)
    // if (editData) {
    //     formik.errors.commitment = '';
    // }

    const getPincode = async (value) => {
        // console.log(Block,District);
        if (value?.replace('X', '').length === 6) {
            var config = {
                method: "get",
                url: `https://api.postalpincode.in/pincode/${value}`,
                headers: {},
            };

            const PincodeResult = await axios(config);
            if (PincodeResult.status === 200) {

                formik.setFieldValue("district", PincodeResult.data[0].PostOffice[0].District)
                console.log("formiik::", formik.values.district);
                formik.setFieldValue("tehsil", PincodeResult.data[0].PostOffice[0].Block)
            } else {
                formik.setFieldValue("district", PincodeResult.data[0].PostOffice[0].District)
                console.log("formiik::", formik.values.district);
                formik.setFieldValue("tehsil", PincodeResult.data[0].PostOffice[0].Block)
            }
        }
    };

    const getCourseFees = async (branch, joinBatch) => {
        // console.log(joinBatch);

        if (joinBatch !== '' && joinBatch.toString()?.replace('X', '').length === 4 && branch !== '') {
            // console.log("api calling");

            var data = '';

            var config = {
                method: 'get',
                url: `${allUrls.showFees}${branch + joinBatch}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                data: data
            };
            try {


                const StudentCourseFees = await axios(config)
                if (StudentCourseFees.status === 200) {
                    formik.setFieldValue('courseFees', StudentCourseFees.data[0].totalFees);

                } else {
                    formik.setFieldValue('courseFees', '');

                }

                console.log(StudentCourseFees);
            } catch (error) {
                console.log(error);
                formik.setFieldValue('courseFees', '');

            }

        }
    }

    const [expanded, setExpanded] = React.useState({
        panel1: true,
        panel2: true,
        panel3: true,
        panel4: true
    });

    const handleChange = (id) => () => {
        // console.log(expanded)
        setExpanded((pre) => {
            return {
                ...pre,
                [id]: !expanded[id]
            }

        });
    };
    function swipe() {
        window.open(formik.values.commitment, '_blank', 'noopener,noreferrer')
    }
    const imageToBase64 = async (file, feildName) => {
        if (file) {
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1920,
                // useWebWorker: true
            }
            try {
                const compressedFile = await imageCompression(file, options);
                // console.log(compressedFile)
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                var reader = new FileReader();
                reader.readAsDataURL(compressedFile)
                reader.onload = async () => {
                    var Base64 = reader.result
                    console.log(Base64)
                    formik.setFieldValue("commitment", Base64)

                    // setIs_data(true);
                }
                reader.onerror = (err) => {
                    console.log(err);
                }
            } catch (error) {
                console.log(error);
            }

        }
    }

    return (
        <>
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

            <div className=' addnewstudent mx-auto px-3'>
                <form onSubmit={formik.handleSubmit}>
                    {/* Personal Details */}
                    <Accordion className="my-2" style={{ boxShadow: "none" }} expanded={expanded.panel1 === true} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{
                                backgroundColor: '#E6E9F4', borderBottom: '2px solid orange', maxHeight: "50px", minHeight: "50px"
                            }}
                        >
                            <Typography style={{ color: "#414c97", margin: "0px" }}><b> Personal Details</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: '#F4F7FC', padding: '15px' }}>
                            <Typography component={'div'} className='add_student_dropdown_menu' >
                                {/* Personal Details */}

                                {/* first four input feild */}
                                <div className='row m-1'>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">First Name*</label>  <input
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
                                        <label className="addStdLable" htmlFor="">Last Name*</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.lastName}
                                            name="lastName"
                                            type="text"
                                            className={formik.touched.lastName ? `form-control ${formik.errors.lastName ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Last name"
                                        />  {formik.errors.lastName && formik.touched.lastName ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.lastName}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">DOB*</label>  <input
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
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Contact Number*</label>
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

                                {/* Second Four Input Field */}
                                <div className='row m-1'>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Father Name*</label>  <input
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
                                        <label className="addStdLable" htmlFor="">Father Occupation*</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.fatherOccupation}
                                            name="fatherOccupation"
                                            type="text"
                                            className={formik.touched.fatherOccupation ? `form-control ${formik.errors.fatherOccupation ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Father Occupation"
                                        />
                                        {formik.errors.fatherOccupation && formik.touched.fatherOccupation ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.fatherOccupation}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Father Annual Income*</label>
                                        <input onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            type="number"
                                            value={formik.values.fatherIncome}
                                            name="fatherIncome" placeholder="Father Annual Income" className={formik.touched.fatherIncome ? `form-control ${formik.errors.fatherIncome ? "invalid" : ""}` : 'form-control'}
                                        />

                                        {formik.errors.fatherIncome && formik.touched.fatherIncome ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.fatherIncome}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Father Contact*</label>
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
                                {/* Addres Input feild */}
                                <div className="row m-1">

                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Address*</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.address}
                                            name="address"
                                            type="text"
                                            className={formik.touched.address ? `form-control ${formik.errors.address ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Enter your Address"
                                        />
                                        {formik.errors.address && formik.touched.address ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.address}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div></div>
                                {/* third Four input feild */}
                                <div className='row m-1'>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Pincode*</label>  <NumberFormat
                                            onBlur={formik.handleBlur}
                                            onChange={async (e) => { await formik.setFieldValue("pincode", e.target.value); getPincode(e.target.value) }}
                                            value={formik.values.pincode}
                                            name="pincode"
                                            type="text"
                                            className={formik.touched.pincode ? `form-control ${formik.errors.pincode ? "invalid" : ""}` : 'form-control'}
                                            format="######"
                                            mask={'X'}
                                            placeholder="EX:- 455336"
                                        />
                                        {formik.errors.pincode && formik.touched.pincode ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.pincode}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Village*</label>
                                        {/* <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.village}
                                            name="village"
                                            type="text"
                                            className={formik.touched.firstName ? `form-control ${formik.errors.firstName ? "invalid" : ""}` :'form-control'}
                                            placeholder="Village"
                                        /> */}
                                        <Select
                                            options={villageNames}
                                            onChange={({ value }) => { formik.setFieldValue('village', value) }}
                                            onBlur={formik.handleBlur}
                                            // value={formik.values.village}
                                            name="village"
                                            className={formik.touched.village ? ` ${formik.errors.village ? "invalid" : ""}` : ''}
                                            defaultValue={editData ? { label: editData.village, value: editData.village } : ''}
                                            placeholder="select Village"
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
                                        <label className="addStdLable" htmlFor="">Tehsil*</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.tehsil}
                                            name="tehsil"
                                            type="text"
                                            className={formik.touched.tehsil ? `form-control ${formik.errors.tehsil ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Tehsil"
                                        />
                                        {formik.errors.tehsil && formik.touched.tehsil ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.tehsil}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">District*</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.district}
                                            name="district"
                                            type="text"
                                            className={formik.touched.district ? `form-control ${formik.errors.district ? "invalid" : ""}` : 'form-control'}
                                            placeholder="District"
                                        />
                                        {formik.errors.district && formik.touched.district ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.district}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                {/* Fourth four input feild */}
                                <div className='row m-1'>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Email*</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                            name="email"
                                            type="text"
                                            className={formik.touched.email ? `form-control ${formik.errors.email ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Email"
                                        />
                                        {formik.errors.email && formik.touched.email ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.email}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Aadhar Number*</label>
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
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Category*</label>
                                        <select
                                            name="category"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.category}
                                            className={formik.touched.category ? `form-select ${formik.errors.category ? "invalid" : ""}` : 'form-select'}
                                            id="inputGroupSelect02"
                                        >
                                            <option value="">
                                                Category
                                            </option>
                                            <option value="GEN">GEN</option>
                                            <option value="OBC">OBC</option>
                                            <option value="SC">SC</option>
                                            <option value="ST">ST</option>
                                        </select>
                                        {formik.errors.category && formik.touched.category ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.category}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="col">
                                        <label className="addStdLable" >Gender</label>
                                        <div className='mt-1'>
                                            <label className="addStdLable" >

                                                <input type="radio" onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur} name="gender" value="male" defaultChecked={editData ? editData.gender === "male" ? true : false : true} />
                                                {' '} Male

                                            </label>{' '}
                                            <label className="addStdLable">

                                                <input type="radio" onChange={formik.handleChange}
                                                    defaultChecked={editData ? editData.gender === "female" ? true : false : false}
                                                    onBlur={formik.handleBlur} name="gender" value="female" />
                                                {' '} Female

                                            </label>
                                        </div>
                                    </div>
                                </div>



                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    {/* Personal Details */}

                    {/* Acadmic Details */}
                    <Accordion className="my-2" style={{ boxShadow: "none" }} expanded={expanded.panel2 === true} onChange={handleChange('panel2')} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            style={{ backgroundColor: '#E6E9F4', borderBottom: '2px solid orange', maxHeight: "50px", minHeight: "50px" }}
                        >
                            <Typography style={{ color: "#414c97" }}><b>Acadmic Details </b></Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: '#F4F7FC', padding: '15px' }}>
                            <Typography component={'div'}>

                                <div className='row m-1'>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">12<sup>th</sup> School Name*</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.schoolName}
                                            name="schoolName"
                                            type="text"
                                            className={formik.touched.schoolName ? `form-control ${formik.errors.schoolName ? "invalid" : ""}` : 'form-control'}
                                            placeholder="School Name"
                                        />
                                        {formik.errors.schoolName && formik.touched.schoolName ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.schoolName}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">12<sup>th</sup> Subject*</label>
                                        <select onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} name="subject12" value={formik.values.subject12} className={formik.touched.subject12 ? `form-select ${formik.errors.subject12 ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02" placeholder="select">
                                            <option value="">Select Subject</option>
                                            <option value="Maths">Maths</option>
                                            <option value="BIO">BIO</option>
                                            <option value="Art">Art</option>
                                            <option value="Commerce">Commerce</option>
                                            <option value="Agriculture">Agriculture</option>
                                        </select>
                                        {formik.errors.subject12 && formik.touched.subject12 ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.subject12}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Stream Name*</label>

                                        <select name="streamName" value={formik.values.streamName} onBlur={formik.handleBlur}
                                            onChange={async (e) => { await formik.setFieldValue("streamName", e.target.value); getCourseFees(e.target.value, formik.values.joinBatch) }} className={formik.touched.streamName ? `form-select ${formik.errors.streamName ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02" placeholder="select">
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
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Join Batch*</label>
                                        <NumberFormat
                                            onChange={async (e) => { await formik.setFieldValue("joinBatch", e.target.value); getCourseFees(formik.values.streamName, e.target.value) }} onBlur={formik.handleBlur}
                                            value={formik.values.joinBatch}
                                            name="joinBatch"
                                            // type="text"
                                            className={formik.touched.joinBatch ? `form-control ${formik.errors.joinBatch ? "invalid" : ""}` : 'form-control'}
                                            format="####"
                                            mask={'X'}
                                            placeholder="EX:-2022"
                                        />
                                        {formik.errors.joinBatch && formik.touched.joinBatch ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.joinBatch}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>


                                </div>
                                <div className='row m-1'>
                                    <div className="col-3">
                                        <label className="addStdLable" htmlFor="">12<sup>th</sup> Roll Number*</label>  <NumberFormat
                                           format="###############"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.rollNumber12}
                                            name="rollNumber12"
                                            type="text"
                                            className={formik.touched.rollNumber12 ? `form-control ${formik.errors.rollNumber12 ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Roll Number"
                                        /> {formik.errors.rollNumber12 && formik.touched.rollNumber12 ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.rollNumber12}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-3">
                                        <label className="addStdLable" htmlFor="">12<sup>th</sup> Percentage*</label>  <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.persentage12}
                                            name="persentage12"
                                            type="text"
                                            format="##%"
                                            mask={['X', 'X', '%']}
                                            placeholder="XX%"

                                            className={formik.touched.persentage12 ? `form-control ${formik.errors.persentage12 ? "invalid" : ""}` : 'form-control'}
                                        /> {formik.errors.persentage12 && formik.touched.persentage12 ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.persentage12}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-3">
                                        <label className="addStdLable" htmlFor="">Year*</label>
                                        <select name="year" value={formik.values.year} onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} className={formik.touched.year ? `form-select ${formik.errors.year ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02" placeholder="select">
                                            <option value=''>Select Year</option>
                                            <option value='I'>I Year</option>
                                            <option value='II'>II Year</option>
                                            <option value='III'>III Year</option>
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
                                <div className='row m-1'>
                                    <div className="col-3">
                                        <label className="addStdLable" htmlFor="">10<sup>th</sup> Roll Number*</label>  <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            format="###############"
                                            value={formik.values.rollNumber10}
                                            name="rollNumber10"
                                            type="text"
                                            className={formik.touched.rollNumber10 ? `form-control ${formik.errors.rollNumber10 ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Roll Number"
                                        />
                                        {formik.errors.rollNumber10 && formik.touched.rollNumber10 ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.rollNumber10}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-3">
                                        <label className="addStdLable" htmlFor="">10<sup>th</sup> Percentage*</label>  <NumberFormat
                                            isAllowed={(values) => {
                                                const { floatValue } = values;
                                                return floatValue <= 10000000000000;
                                            }}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.percent10}
                                            name="percent10"
                                            type="text"
                                            className={formik.touched.percent10 ? `form-control ${formik.errors.percent10 ? "invalid" : ""}` : 'form-control'}
                                            format="##%"
                                            mask={['X', 'X', '%']}
                                            placeholder="XX%"

                                        />
                                        {formik.errors.percent10 && formik.touched.percent10 ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.percent10}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>


                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    {/* Acadmic Details */}

                    {/* Fees Details */}
                    <Accordion className="my-2" style={{ boxShadow: "none" }} expanded={expanded.panel3 === true} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            style={{ backgroundColor: '#E6E9F4', borderBottom: '2px solid orange', maxHeight: "50px", minHeight: "50px" }}
                        >
                            <Typography style={{ color: "#414c97" }}><b>Fees Details </b></Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: '#F4F7FC', padding: '15px' }}>
                            <Typography component={'div'}>
                                <div className='row m-1'>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">Registration Fees*</label>  <input
                                            name="regisrationFees"
                                            value={formik.values.regisrationFees}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            type="text"
                                            className={formik.touched.regisrationFees ? `form-control ${formik.errors.regisrationFees ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Registration Fees"
                                            disabled={true}
                                        />
                                        {formik.errors.regisrationFees && formik.touched.regisrationFees ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.regisrationFees}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">Course Fees*</label> <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.courseFees}
                                            name="courseFees"
                                            type="text"
                                            className={formik.touched.courseFees ? `form-control ${formik.errors.courseFees ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Course Fees"
                                            disabled={true}
                                        />
                                        {formik.errors.courseFees && formik.touched.courseFees ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.courseFees}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">First Installment*</label>  <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.firstInstallment = parseInt(formik.values.firstInstallment?.toString().replace(/,/g, '').replace('₹', ''))}
                                            name="firstInstallment"
                                            className={formik.touched.firstInstallment ? `form-control ${formik.errors.firstInstallment ? "invalid" : ""}` : 'form-control'}
                                            placeholder="First Installment"
                                            thousandSeparator={true}
                                            thousandsGroupStyle='lakh'
                                            prefix='₹'
                                        />
                                        {formik.errors.firstInstallment && formik.touched.firstInstallment ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.firstInstallment}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">First Installment Date*</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.firstInstallmentDate}
                                            name="firstInstallmentDate"
                                            type="date"
                                            className={formik.touched.firstInstallmentDate ? `form-control ${formik.errors.firstInstallmentDate ? "invalid" : ""}` : 'form-control'}
                                            placeholder="First Installment Date"
                                        />
                                        {formik.errors.firstInstallmentDate && formik.touched.firstInstallmentDate ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.firstInstallmentDate}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className='row m-1'>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor=""> Fees Scheme*</label>
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
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">Sponsorship Type*</label>
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
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">Second Installment*</label>  <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.feesScheme === "oneShot" ? formik.values.secondInstallment = 0 : formik.values.secondInstallment = parseInt(formik.values.secondInstallment?.toString().replace(/,/g, '').replace('₹', ''))}
                                            name="secondInstallment"
                                            className={formik.touched.secondInstallment ? `form-control ${formik.errors.secondInstallment ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Second Installment"
                                            thousandSeparator={true}
                                            thousandsGroupStyle='lakh'
                                            prefix='₹'
                                            disabled={formik.values.feesScheme === "oneShot" ? true : false}
                                        />
                                        {formik.errors.secondInstallment && formik.touched.secondInstallment ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.secondInstallment}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">Second Installment Date*</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.secondInstallment === 0 ? formik.values.secondInstallmentDate = formik.values.firstInstallmentDate : formik.values.secondInstallmentDate}
                                            name="secondInstallmentDate"
                                            type="date"
                                            className={formik.touched.secondInstallmentDate ? `form-control ${formik.errors.secondInstallmentDate ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Second Installment Date"
                                            disabled={formik.values.feesScheme === "oneShot" ? true : false}
                                        />
                                        {formik.errors.secondInstallmentDate && formik.touched.secondInstallmentDate ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.secondInstallmentDate}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>

                                <div className='row m-1'>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="postmatricScolarship">Postmatric Scholarship*</label>
                                        <select
                                            name="postmatricScolarship"
                                            value={formik.values.postmatricScolarship}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={formik.touched.postmatricScolarship ? `form-select ${formik.errors.postmatricScolarship ? "invalid" : ""}` : 'form-select'}
                                            id="inputGroupSelect02"
                                            disabled={formik.values.category === 'GEN' ? true : false}
                                        >
                                            <option value="yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                        {formik.errors.postmatricScolarship && formik.touched.postmatricScolarship ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.postmatricScolarship}
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                    </div>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">GKB Scholarship*</label>
                                        <select name="gkbScolarship" className={formik.touched.gkbScolarship ? `form-select ${formik.errors.gkbScolarship ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02"
                                            value={formik.values.gender === "male" ? formik.values.gkbScolarship = "No" : formik.values.gkbScolarship}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={formik.values.gender === 'male' ? true : false}>
                                            <option value="yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                        {formik.errors.gkbScolarship && formik.touched.gkbScolarship ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.gkbScolarship}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">Third Installment*</label>  <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.feesScheme === "oneShot" ? formik.values.thirdInstallment = 0 : formik.values.thirdInstallment = parseInt(formik.values.thirdInstallment?.toString().replace(/,/g, '').replace('₹', ''))}
                                            name="thirdInstallment"
                                            className={formik.touched.thirdInstallment ? `form-control ${formik.errors.thirdInstallment ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Third Installment"
                                            thousandSeparator={true}
                                            thousandsGroupStyle='lakh'
                                            prefix='₹'
                                            disabled={formik.values.feesScheme === "oneShot" ? true : false}
                                        />
                                        {formik.errors.thirdInstallment && formik.touched.thirdInstallment ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.thirdInstallment}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">Third Installment Date*</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.thirdInstallment === 0 ? formik.values.thirdInstallmentDate = formik.values.secondInstallmentDate : formik.values.thirdInstallmentDate}
                                            name="thirdInstallmentDate"
                                            type="date"
                                            className={formik.touched.thirdInstallmentDate ? `form-control ${formik.errors.thirdInstallmentDate ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Third Installment Date"
                                            disabled={formik.values.feesScheme === "oneShot" ? true : false}
                                        />
                                        {formik.errors.thirdInstallmentDate && formik.touched.thirdInstallmentDate ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.thirdInstallmentDate}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>


                                <div className='row m-1'>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">Postmatric Owner*</label>
                                        <select name="postmatricOwner" className={formik.touched.postmatricOwner ? `form-select ${formik.errors.postmatricOwner ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02"
                                            value={formik.values.postmatricScolarship === "No" ? formik.values.postmatricOwner = "Self" : formik.values.postmatricOwner}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={formik.values.category === 'GEN' ? true : false || formik.values.postmatricScolarship === "No" ? true : false}>
                                            <option value="Self">Self</option>
                                            <option value="ssism">SSISM</option>
                                        </select>
                                        {formik.errors.postmatricOwner && formik.touched.postmatricOwner ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.postmatricOwner}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">GKB Owner*</label>
                                        <select name="gkbOwner" className={formik.touched.gkbOwner ? `form-select ${formik.errors.gkbOwner ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02"
                                            value={formik.values.gkbScolarship === "No" ? formik.values.gkbOwner = "Self" : formik.values.gkbOwner}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={formik.values.gender === 'male' ? true : false || formik.values.gkbScolarship === "No" ? true : false}>
                                            <option value="Self">Self</option>
                                            <option value="SSISM">SSISM</option>
                                        </select>
                                        {formik.errors.gkbOwner && formik.touched.gkbOwner ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.gkbOwner}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">Total Payable Amount*</label>  <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.payableAmmount = parseInt(formik.values.firstInstallment?.toString().replace(/,/g, '').replace('₹', '')) + parseInt(formik.values.secondInstallment?.toString().replace(/,/g, '').replace('₹', '')) + parseInt(formik.values.thirdInstallment?.toString().replace(/,/g, '').replace('₹', ''))
                                                + parseInt(formik.values.scholarshipAmount?.toString().replace(/,/g, '').replace('₹', ''))}
                                            name="payableAmmount"
                                            className={formik.touched.payableAmmount ? `form-control ${formik.errors.payableAmmount ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Payable Amount"
                                            thousandSeparator={true}
                                            thousandsGroupStyle='lakh'
                                            prefix='₹'
                                            disabled={true}
                                        />
                                        {formik.errors.payableAmmount && formik.touched.payableAmmount ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.payableAmmount}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">
                                        <label className="addStdLable" htmlFor="">Upload Commitment*</label>
                                        <div className="d-flex">
                                            <img src={Rectangle_img} style={{ height: '43px', width: '100%', borderBottom: "1px solid #DDDDDD" }} alt="upload_commitmed" onClick={() => {
                                                document.getElementById("commitment").click()
                                            }} />
                                            <img src={UploadDocumentImage} alt="upload_commitmed" onClick={() => {
                                                document.getElementById("commitment").click()
                                            }} style={{ marginLeft: '-25px', marginTop: '3px' }} />
                                            {formik.values.commitment !== '' ? <img src={formik.values.commitment} alt="upload_commitmed" onClick={swipe} id="commitmentImage" style={{ height: '30px', width: '30px', marginLeft: '-90%', marginTop: '9px' }} /> : ''}
                                        </div>
                                        <input
                                            onBlur={formik.handleBlur}
                                            name="commitment"
                                            type="file"
                                            accept="image/*"
                                            id="commitment"
                                            onChange={(e) => {
                                                imageToBase64(e.target.files[0], "commitment");
                                            }}
                                            // className={formik.touched.commitment ? `form-control ${formik.errors.commitment ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Payable Amount"
                                            style={{ display: 'none' }}

                                        />
                                        {formik.errors.commitment ?
                                            <div className="text-danger fs-6">
                                                {formik.errors.commitment}
                                            </div>
                                            : ''
                                        }


                                        {/* {formik.errors.com && formik.touched.com ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.com}
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                    </div>


                                </div>
                                <div className='row m-1'>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">Postmatric Amount*</label>  <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.category === "GEN" ? formik.values.postmatricAmount = 0 : formik.values.postmatricOwner === "Self" ? formik.values.postmatricAmount = 0 : formik.values.postmatricAmount = parseInt(formik.values.postmatricAmount?.toString().replace(/,/g, '').replace('₹', ''))}
                                            name="postmatricAmount"
                                            thousandSeparator={true}
                                            thousandsGroupStyle='lakh'
                                            prefix='₹' className={formik.touched.postmatricAmount ? `form-control ${formik.errors.postmatricAmount ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Postmatric Amount"
                                            disabled={formik.values.category === 'GEN' ? true : false || formik.values.postmatricOwner === "Self" ? true : false}
                                        />
                                        {formik.errors.postmatricAmount && formik.touched.postmatricAmount ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.postmatricAmount}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">GKB Amount*</label> <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.gender === 'male' ? formik.values.GKBAmount = 0 : formik.values.gkbOwner === "Self" ? formik.values.GKBAmount = 0 : formik.values.GKBAmount = parseInt(formik.values.GKBAmount?.toString().replace(/,/g, '').replace('₹', ''))}
                                            name="GKBAmount"
                                            thousandSeparator={true}
                                            thousandsGroupStyle='lakh'
                                            prefix='₹'
                                            className={formik.touched.GKBAmount ? `form-control ${formik.errors.GKBAmount ? "invalid" : ""}` : 'form-control'}
                                            placeholder="GKB Amount"
                                            disabled={formik.values.gender === 'male' ? true : false || formik.values.gkbOwner === "Self" ? true : false}
                                        />
                                        {formik.errors.GKBAmount && formik.touched.GKBAmount ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.GKBAmount}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col" style={{ marginTop: '7px' }}>
                                        <label className="addStdLable" htmlFor="">Scholarship Amount*</label> <NumberFormat
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.scholarshipAmount = parseInt(formik.values.postmatricAmount?.toString().replace(/,/g, '').replace('₹', '')) + parseInt(formik.values.GKBAmount?.toString().replace(/,/g, '').replace('₹', ''))}
                                            name="scholarshipAmount"
                                            thousandSeparator={true}
                                            thousandsGroupStyle='lakh'
                                            prefix='₹' className={formik.touched.scholarshipAmount ? `form-control ${formik.errors.scholarshipAmount ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Scholarship Amount"
                                            disabled={true}
                                        />
                                        {formik.errors.scholarshipAmount && formik.touched.scholarshipAmount ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.scholarshipAmount}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col">

                                        <label className="addStdLable" htmlFor="">Remark*</label>
                                        <textarea className={formik.touched.remark ? `form-control ${formik.errors.remark ? "invalid" : ""}` : 'form-control'} id="exampleFormControlTextarea1"
                                            placeholder="Remark" onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.remark}
                                            name="remark"
                                            rows="4"></textarea>
                                        {formik.errors.remark && formik.touched.remark ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.remark}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>



                                </div>



                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    {/* Fees Details */}

                    {/* Bus Details */}
                    <Accordion className="my-2" style={{ boxShadow: "none" }} expanded={expanded.panel4 === true} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            style={{ backgroundColor: '#E6E9F4', borderBottom: '2px solid orange', maxHeight: "50px", minHeight: "50px" }}
                        >
                            <Typography style={{ color: "#414c97" }}><b>Bus Details</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: '#F4F7FC', padding: '15px' }}>
                            <Typography component={'div'}>
                                <div className='row m-1'>
                                    <div className="col-3">
                                        <label className="addStdLable" htmlFor="">Bus Fees*</label>  <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.busFee}
                                            name="busFee"
                                            type="number"
                                            className={formik.touched.busFee ? `form-control ${formik.errors.busFee ? "invalid" : ""}` : 'form-control'}
                                            placeholder="Bus Fees"
                                        />
                                        {formik.errors.busFee && formik.touched.busFee ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.busFee}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-3">
                                        <label className="addStdLable" >Track Name*</label>
                                        <select name="trackName" value={formik.values.trackName} onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} className={formik.touched.trackName ? `form-select ${formik.errors.trackName ? "invalid" : ""}` : 'form-select'} id="inputGroupSelect02" placeholder="select">
                                            <option value='0'>Select Track</option>
                                            {trackNames.map((ele, i) => {
                                                return (
                                                    <option key={i} value={ele.trackName}>{ele.trackName}</option>
                                                )
                                            })}

                                        </select>
                                        {formik.errors.trackName && formik.touched.trackName ? (
                                            <div className="text-danger fs-6">
                                                {formik.errors.trackName}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>


                                </div>


                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    {/* Bus Details */}
                    <div style={{
                        height: '100%',
                        width: '100%',
                        position: "fixed",
                        left: "83%",
                        top: "90%",
                        zindex: "5000",
                    }}  >{
                            editData ?
                                <button className="btn btn-sm btn-primary text-light fw-bold" type="submit"
                                    disabled={loaderLoading}
                                    style={{
                                        width: "220px",
                                        height: '41px',
                                        backgroundColor: '#4f83df'
                                    }}
                                >{loaderLoading ? (loaderLoading ? (<LoaderButton />) : '') : "Update"}</button> :
                                <button className="btn btn-sm btn-warning text-light fw-bold" type="submit"
                                    style={{
                                        width: "220px",
                                        height: '41px',
                                        backgroundColor: 'orange'
                                    }}
                                    disabled={AddNewStudent.loading}
                                >{AddNewStudent.loading ? (<LoaderButton />) : "Submit"}
                                </button>
                        }
                    </div>

                </form>
            </div>



        </>
    );
}

//Getting the state from the store
const mapStateToProps = (state) => {
    return {
        addStudent: state.addStudent,
    };
};

//passing the userData in fetchUsers function and also dispatch method
const mapDispatchToProps = (dispatch) => {
    return {
        AddNewStudent: (data, backToProfilePage) => dispatch(AddNewStudent(data, backToProfilePage)),
    };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(AddNewStudentPage);

// Busfee: 0
// Firstinstallment: 8500
// FirstinstallmentDate: "2021-08-04"
// GKB_Amount: 5000
// GaonKiBeti: "SSISM"
// Is_GKB: "yes"
// Postmetric: "ssism"
// Postmetric_Amount: 15000
// scholarshipAmount: 20000
// Secondinstallment: 8000
// SecondinstallmentDate: "2021-12-23"
// Thirdinstallment: 0
// ThirdinstallmentDate: "2021-12-31"
// Totalfee: 31500
// Tutionfee: 31500
// aadharNo: "789456123789"
// address: "sandalpur khategoan"
// branch: "BCA"
// category: "OBC"
// district: "dewas"
// dob: "2001-01-01"
// email: "rahulv.bca2020@ssism.org"
// fatherContactNumber: "7898363017"
// fatherIncome: 120000
// fatherOccupation: "farmer"
// fathersName: "santosh"
// feesScheme: "fullFees"
// firstName: "rahul"
// gender: "female"
// is_Postmetric: "yes"
// joinBatch: "2021"
// lastName: "vishwkarma"
// mobile: "7898363017"
// persentage10: "90"
// persentage12: "60"
// pincode: "455339"
// reg_Fees: "1500"
// remark: "john deer tractor h"
// rollNumber10: "45612378"
// rollNumber12: "789456133111"
// school12sub: "Maths"
// schoolName: "vps"
// tehsil: "khategaon"
// trackName: "Sandalpur"
// village: "sandalpur"
// year: "II"

