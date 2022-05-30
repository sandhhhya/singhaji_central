import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Numberformat from 'react-number-format'
import '../styles/AddNewStudent.css'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { isSuperAdmin } from '../../../helpers/SuperAdmin';
import { isAccountAdmin } from '../../../helpers/AccountAdmin';
import { isStudentAdmin } from '../../../helpers/StudentAdmin';
import { Link } from 'react-router-dom';
import Icon_feather_download from '../../assests/image/AccountIcons/Icon_feather_download.svg';
import * as Yup from "yup";
import Swal from 'sweetalert2'
import AllUrl from '../../../redux/constants/url';
import Loader from '../../assests/common/Loader';
import { connect } from 'react-redux';
import allUrls from '../../../redux/constants/url'
import { accountAction } from '../../../redux/actionDispatcher/superAdmin/studentAccountTableDataDispatcher';
import axios from 'axios';
import FeesRecieptDeletePopup from './FeesRecieptDeletePopup';
import { Tooltip, Whisper } from 'rsuite';


function FeesRecipt({ accountAction }) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate()

    const data = localStorage.getItem('userEdit')
    const StudentAccountData = JSON.parse(data)
    // console.log('StudentAccountData ::',StudentAccountData)
    var StudentName = StudentAccountData.accountInfo.firstName + ' ' + StudentAccountData.accountInfo.lastName
    var StudentClassName = StudentAccountData.accountInfo.branch
    // console.log((StudentAccountData.pendingFee).length);

    const [loading, setLoading] = useState(false)


    var totalFeesAmount = 0;
    var totalpendingFees = 0;
    var totalReceivedFees = 0;
    var totalpendingGKB = 0;
    var totalpendingPostmetric = 0;


    (StudentAccountData.pendingFee).forEach((ele) => {

        totalFeesAmount = totalFeesAmount + parseInt(ele.feesAmount)
        totalReceivedFees = totalReceivedFees + parseInt(ele.receivedFees)
        totalpendingFees = totalpendingFees + parseInt(ele.pendingFees)
        totalpendingPostmetric = totalpendingPostmetric + parseInt(ele.pendingPostmetric)
        totalpendingGKB = totalpendingGKB + parseInt(ele.pendingGKB)

    })

    // const delete_reciept = {
    //     stdId:"",
    //     AccountsReceiptNo:"",
    //     report_remark:""

    // }


    const getMOnth = () => {

        let MM = new Date().getMonth() + 1;
        if (MM.toString.length < 2) {
            return (`0${MM}`)

        } else {
            return (`${MM}`)
        }
    }

    const checkwaiveOff = (val) => {
        const amt = parseInt(val?.split(',').join(''));
        const year = formik.values.studentClassYear;
        const feesAmount = formik.values.feesAmount;
        const amt3 = parseInt(feesAmount?.split(',').join(''));
        const data = StudentAccountData.pendingFee.filter((ele) => ele.year === year)[0];
        console.log(data);
        let amt2 = parseInt(data.pendingFees);
        console.log(amt);
        console.log(amt2);
        console.log(amt3)
        return (amt <= (amt2 - amt3))
    }
    const checkAmount = (val) => {
        const amt = parseInt(val?.split(',').join(''));
        const year = formik.values.studentClassYear;
        const data = StudentAccountData.pendingFee.filter((ele) => ele.year === year)[0];
        console.log(data);
        let amt2 = parseInt(data.pendingFees);
        console.log(amt);
        console.log(amt2);
        return (amt <= amt2)
    }
    const checkGKBAmount = (val) => {
        const amt = parseInt(val?.split(',').join(''));
        const year = formik.values.studentClassYear;
        const data = StudentAccountData.pendingFee.filter((ele) => ele.year === year)[0];
        console.log(data);
        let amt2 = parseInt(data.pendingFees);
        let GKBpending = parseInt(data.pendingGKB);
        console.log(amt);
        console.log(amt2);
        if (formik.values.installmentNo === "GKB") {

            return (amt <= amt2 && amt <= GKBpending)
        } else {
            return (amt <= amt2)
        }
    }
    const checkPOSTAmount = (val) => {
        const amt = parseInt(val?.split(',').join(''));
        const year = formik.values.studentClassYear;
        const data = StudentAccountData.pendingFee.filter((ele) => ele.year === year)[0];
        console.log(data);
        let amt2 = parseInt(data.pendingFees);
        console.log(amt);
        let POSTpending = parseInt(data.pendingPostmetric);
        console.log(amt);
        console.log(amt2);
        if (formik.values.installmentNo === "POSTMATRIC") {

            return (amt <= amt2 && amt <= POSTpending)
        } else {
            return (amt <= amt2)
        }
    }

    const initialValues = {
        payBy: 'Cash',
        studentName: `${StudentName}`,
        studentClassYear: (StudentAccountData.accountInfo.year?.toString()),
        FatherName: StudentAccountData.accountInfo.fathersName,
        waiveOff: '0',
        chequeDate: '',
        ChequeNo: '',
        feesAmount: '',
        recieptdate: `${new Date().getFullYear() + '-' + getMOnth() + '-' + new Date().getDate()}`,
        installmentNo: '1',
        Remark: '',
        LateFeeAmount: '0',
        BankName: '',
    }
    // console.log(initialValues);
    const validationSchema = Yup.object({
        recieptdate: Yup.string().required("Required!").test('doc_check', `Date must be greater then ${new Date().getDate() - 8 + '-' + getMOnth() + '-' + new Date().getFullYear()}`, val => val?.slice(-2) >= (new Date().getDate()) - 8).test('check', 'invalid Date', value => value?.slice(-2) <= (new Date().getDate())),
        studentClassYear: Yup.string().required("Required!"),
        feesAmount: Yup.string().required("Required!")
            .test('Is positive', 'must be positive', val => val?.split(',').join('') > 0)
            .test('Is positive', `amount can't be greater than total pending fees`, checkAmount)
            .test('Is GKB positive', `amount can't be greater than GKB pending fees OR total pending fees`, checkGKBAmount)
            .test('Is POST positive', `amount can't be greater than postmetric pending fees OR total pending fees`, checkPOSTAmount),
        LateFeeAmount: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val?.split(',').join('') >= 0).test('Is not more', `amount can't be greater than ₹1000`, val=> val<=1000),
        waiveOff: Yup.string().required("Required!").test('Is positive', 'must be positive', val => val?.split(',').join('') > 0)
            .test('Is positive', `amount can't be greater than total pending fees`, checkAmount)
            .test('Is GKB positive', `amount can't be greater than GKB pending fees OR total pending fees`, checkGKBAmount)
            .test('Is POST positive', `amount can't be greater than postmetric pending fees OR total pending fees`, checkPOSTAmount)
            .test("not more than","waive of is not more than pending amount - fees Amount",checkwaiveOff)
            ,
        installmentNo: Yup.string().required("Required!"),
        payBy: Yup.string().required("Required!"),
        Remark: Yup.string().required("Required!").trim(),
        ChequeNo: Yup.string().test('require', 'Required!', (val) => {
            if (formik.values.payBy === 'Cheque') {
                if (!val) return false
                else return true

            }
            else return true
        }),
        chequeDate: Yup.string().test('require', 'Required!', (val) => {
            if (formik.values.payBy === 'Cheque') {
                if (!val) return false
                else return true

            }
            else return true
        }),
        BankName: Yup.string().test('require', 'Required!', (val) => {
            if (formik.values.payBy === 'Cheque') {
                if (!val) return false
                else return true

            }
            else return true
        })
    })

    // .test('date_check', `Date must be greater then ${new Date().getDate() - 1 + '-' + getMOnth() + '-' + new Date().getFullYear()}`, val => val?.slice(-2) >= (new Date().getDate()))
    // 

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async () => {


            const submitForm = async () => {

                setLoading(true)
                // console.log(values);

                var submitData = JSON.stringify({
                    "stdId": StudentAccountData.accountInfo.stdId,
                    "year": formik.values.studentClassYear,
                    "receivedAmount": formik.values.feesAmount.split(',').join(''),
                    "lateFeeAmount": formik.values.LateFeeAmount.split(',').join(''),
                    "waiveOf": formik.values.waiveOff.split(',').join(''),
                    "installmentNo": formik.values.installmentNo,
                    "receivedType": formik.values.payBy,
                    "chequeNo": formik.values.ChequeNo,
                    "chequeDate": formik.values.chequeDate,
                    "receiptDate": formik.values.recieptdate,
                    "bankName": formik.values.BankName,
                    "remark": formik.values.Remark
                })

                console.log(JSON.parse(submitData))
                var config = {
                    method: 'post',
                    url: AllUrl.generateReciept,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    data: submitData
                };

                var result = await axios(config);
                // if (result) setLoading(false)

                if (result.status === 200) {
                    let backData = JSON.stringify({
                        "stdId": StudentAccountData.accountInfo.stdId,
                    });
                    console.log("______________________________________");
                    console.log("backdata", backData);
                    console.log("______________________________________");
                    let getBackData = {
                        method: 'post',
                        url: allUrls.allInfoOfActiveStudent,
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        data: backData
                    };
                    accountAction(getBackData, navigate, true, setLoading)
                    // console.log(result.data);
                    const link = document.createElement('a')
                    link.href = result.data;
                    link.target = '_blank';
                    link.download = `${formik.values.studentName}`;
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                }

            }


            Swal.fire({
                title: `Confirmation`,

                html: `Student- ${StudentName} , Amount- ${formik.values.feesAmount} , Insta No- ${formik.values.installmentNo} ` +
                    '<hr>' +
                    'Are you sure?' +
                    '<br>' +
                    `You want to generate fees receipt .`,
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: 'No',
                confirmButtonText: `Yes `,
                // confirmButtonText:'Deactive',
                reverseButtons: true,
                showCloseButton: true,
                // cancelButtonColor: 'gray',
                confirmButtonColor: "#F8A72C",

                showLoaderOnDeny: true,

                showClass: {
                    backdrop: 'swal2-noanimation', // disable backdrop animation
                    popup: '',                     // disable popup animation
                    icon: ''                       // disable icon animation
                },
                hideClass: {
                    popup: '',                     // disable popup fade-out animation
                }

            }).then(async (result) => {
                if (result.isConfirmed) {
                    submitForm()
                }
            })




        }
    })

    const [expanded, setExpanded] = React.useState({
        panel1: true
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

    const backToProfilePage = (e) => {
        e.preventDefault()
        if (isStudentAdmin()) {
            console.log("Navigated ");
            navigate('/student_admin_dashboard/studentprofile');
        }
        else if (isAccountAdmin()) {
            console.log("Navigated ");
            navigate('/account_admin_dashboard/studentprofile');
        }
        else if (isSuperAdmin()) {
            console.log("Navigated ");
            navigate('/admin_dashboard/studentprofile');
        }
    }


    // console.log('total fees::',totalFeesAmount,'totalReceivedFees',totalReceivedFees,'totalpendingFees',totalpendingFees);


    console.log(StudentName);
    return (
        <>
            {loading && (
                <Loader />
            )}
            <div className=" p-3 m-2 me-3" style={{ backgroundColor: 'white', borderRadius: '8px' }}>

                <form onSubmit={formik.handleSubmit}>

                    <div className="row">
                        <div className="col">
                            <label className='addStdLable' htmlFor="">Father Name</label>
                            <input name='FatherName' onChange={formik.handleChange} value={formik.values.FatherName} type="text" className='form-control' placeholder='Father Name'

                                readOnly={true} />
                        </div>
                        <div className="col">
                            <label className='addStdLable' htmlFor="">Installment No.</label>
                            <select name='installmentNo' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.installmentNo} className='form-select' >
                                <option defaultValue="1">1 </option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="POSTMATRIC">Postmatric scholarship</option>
                                <option value="GKB">GKB scholarship</option>
                            </select>
                            {formik.errors.installmentNo && formik.touched.installmentNo ? (
                                <div className="text-danger fs-6">
                                    {formik.errors.installmentNo}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col">
                            <label className='addStdLable' htmlFor="">Year</label>
                            <select name='studentClassYear' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.studentClassYear} className='form-select'  >
                                {/* <option defaultValue={(StudentAccountData.accountInfo.year)?.toString()}>{StudentAccountData.accountInfo.year}</option> */}
                                {(StudentAccountData.accountInfo.year?.toString()) === 'I' &&
                                    <>
                                        <option value="I">I</option>
                                    </>
                                }
                                {(StudentAccountData.accountInfo.year?.toString()) === 'II' &&
                                    <>
                                        <option value="I">I</option>
                                        <option value="II">II</option>
                                    </>
                                }
                                {(StudentAccountData.accountInfo.year?.toString()) === 'III' &&
                                    <>
                                        <option value="I">I</option>
                                        <option value="II">II</option>
                                        <option value="III">III</option>
                                    </>
                                }
                            </select>
                            {formik.errors.studentClassYear && formik.touched.studentClassYear ? (
                                <div className="text-danger fs-6">
                                    {formik.errors.studentClassYear}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col">
                            <label className='addStdLable' htmlFor="">Receipt Date</label>
                            <input name='recieptdate' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.recieptdate} type="date" className='form-control' placeholder='Date' />
                            {formik.errors.recieptdate && formik.touched.recieptdate ? (
                                <div className="text-danger fs-6">
                                    {formik.errors.recieptdate}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="row">


                        <div className="col">
                            <label className='addStdLable' htmlFor="">Amount</label>
                            <Numberformat name='feesAmount' onBlur={formik.handleBlur} thousandSeparator={true}
                                thousandsGroupStyle='lakh' onChange={formik.handleChange} value={formik.values.feesAmount} className='form-control' placeholder='Amount' />
                            {formik.errors.feesAmount && formik.touched.feesAmount ? (
                                <div className="text-danger fs-6">
                                    {formik.errors.feesAmount}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col">
                            <label className='addStdLable' htmlFor="">Pay By</label>
                            <select name="payBy" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.payBy} className='form-select'>
                                <option defaultValue="Cash">Cash</option>
                                <option value="Online">Online</option>
                                <option value="Cheque">Cheque</option>
                            </select>
                            {formik.errors.payBy && formik.touched.payBy ? (
                                <div className="text-danger fs-6">
                                    {formik.errors.payBy}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col">
                            <label className='addStdLable' htmlFor="">Waive off</label>
                            <Numberformat name='waiveOff' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.waiveOff} className='form-control' placeholder='Waive off' />
                            {formik.errors.waiveOff && formik.touched.waiveOff ? (
                                <div className="text-danger fs-6">
                                    {formik.errors.waiveOff}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col">
                            <label className='addStdLable' htmlFor="">Late Fees</label>
                            <Numberformat name='LateFeeAmount' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.LateFeeAmount} className='form-control' placeholder='Waive off' />
                            {formik.errors.LateFeeAmount && formik.touched.LateFeeAmount ? (
                                <div className="text-danger fs-6">
                                    {formik.errors.LateFeeAmount}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>

                    </div>
                    <div className="row">

                        <div className="col">
                            <label className='addStdLable' htmlFor="">Cheque Date</label>
                            <input name='chequeDate' onBlur={formik.handleBlur}
                                disabled={formik.values.payBy !== 'Cheque'}
                                onChange={formik.handleChange} value={formik.values.chequeDate} type="date" className='form-control' />
                            {formik.errors.chequeDate && formik.touched.chequeDate ? (
                                <div className="text-danger fs-6">
                                    {formik.errors.chequeDate}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col">
                            <label className='addStdLable' htmlFor="">Bank Name</label>
                            <input name='BankName' onBlur={formik.handleBlur}
                                disabled={formik.values.payBy !== 'Cheque'}
                                onChange={formik.handleChange} value={formik.values.BankName} type="text" className='form-control' placeholder='Bank Name' />
                            {formik.errors.BankName && formik.touched.BankName ? (
                                <div className="text-danger fs-6">
                                    {formik.errors.BankName}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col">
                            <label className='addStdLable' htmlFor="">Cheque No.</label>
                            <input name='ChequeNo' onBlur={formik.handleBlur}
                                disabled={formik.values.payBy !== 'Cheque'}
                                onChange={formik.handleChange} value={formik.values.ChequeNo} type="text" className='form-control' placeholder='Cheque No' />
                            {formik.errors.ChequeNo && formik.touched.ChequeNo ? (
                                <div className="text-danger fs-6">
                                    {formik.errors.ChequeNo}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="col">
                            <label className='addStdLable' htmlFor="">Remark</label>
                            <input name='Remark' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Remark} type="text" className='form-control' placeholder='Remark' />
                            {formik.errors.Remark && formik.touched.Remark ? (
                                <div className="text-danger fs-6">
                                    {formik.errors.Remark}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>

                    <div className="row mt-3 ">
                        <div className='col-7'>
                        </div>

                        <div className=' col-5 d-flex justify-content-end'>

                            <Link className='m-1 me-5 ' onClick={backToProfilePage} to='#!'>Go To Profile</Link>
                            <button className="btn btn-md btn-outline-warning fw-bold  " style={{ width: "200px", backgroundColor: 'white', color: 'orange' }} type="submit" disabled={loading} >Generate Receipt</button>
                        </div>

                    </div>

                </form>
            </div>

            <Accordion className="my-2 me-3 ms-2" expanded={true} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{
                        backgroundColor: '#E6E9F4 ', borderBottom: '2px solid orange', maxHeight: "50px", minHeight: "50px"
                    }}
                >
                    <Typography style={{ color: "#414c97", margin: "0px" }}><b> Pending Fees Status</b></Typography>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: '#F4F7FC', padding: '15px' }}>
                    <Typography component={'div'} >
                        {/* Personal Details */}

                        <div className="row m-1 my-2 p-1 pt-2 fw-bold" style={{ backgroundColor: 'white', color: '#5A607F' }}>
                            <div className="col">
                                <label className='addStdLable' htmlFor="">Year</label>
                            </div>
                            <div className="col">
                                <label className='addStdLable' htmlFor=""> Total Fees</label>
                            </div>
                            <div className="col">
                                <label className='addStdLable' htmlFor="">Recieved Fees</label>
                            </div>
                            <div className="d-flex col-2">
                                <label className='addStdLable' htmlFor="">T.Pending Fees</label>
                            </div>
                            <div className="d-flex col-2">
                                <label className='addStdLable' htmlFor="">Postmatric Pending Fees</label>
                            </div>
                            <div className="d-flex col-2">
                                <label className='addStdLable' htmlFor="">GKB Pending Fees</label>
                            </div>

                        </div>
                        {StudentAccountData.pendingFee.map(pendingFee => (

                            <div className="row m-1 my-2 p-1 pt-2" style={{ backgroundColor: 'white' }}>



                                <div className="col">
                                    <label htmlFor="">{pendingFee.year === 'I' ? 'First Year' : pendingFee.year === 'II' ? 'Second Year' : 'Third Year'}</label>
                                </div>
                                <div className="col">
                                    <label htmlFor="">{pendingFee.feesAmount}</label>
                                </div>
                                <div className="col">
                                    <label htmlFor="">{pendingFee.receivedFees}</label>
                                </div>
                                <div className="d-flex col-2">
                                    <label htmlFor="">{pendingFee.pendingFees}</label>
                                </div>
                                <div className="d-flex col-2">
                                    <label htmlFor="">{pendingFee.pendingPostmetric}</label>
                                </div>
                                <div className="d-flex col-2">
                                    <label htmlFor="">{pendingFee.pendingGKB}</label>
                                </div>
                            </div>
                        ))}



                        <div className="row m-1 my-2 p-1 pt-2 " style={{ backgroundColor: '#dadadb ' }}>
                            <div className="col">
                                <label className='addStdLable' htmlFor="">Total</label>
                            </div>
                            <div className="col">
                                <label className='addStdLable' htmlFor="">{totalFeesAmount}</label>
                            </div>
                            <div className="col">
                                <label className='addStdLable' htmlFor="">{totalReceivedFees}</label>
                            </div>
                            <div className="d-flex col-2">
                                <label className='addStdLable' htmlFor="">{totalpendingFees} </label>
                            </div>
                            <div className="d-flex col-2">
                                <label className='addStdLable' htmlFor="">{totalpendingPostmetric} </label>
                            </div>
                            <div className="d-flex col-2">
                                <label className='addStdLable' htmlFor="">{totalpendingGKB} </label>
                            </div>
                        </div>





                    </Typography>
                </AccordionDetails>
            </Accordion>


            <Accordion className="my-2 me-3 ms-2 mb-5" expanded={expanded.panel1 === true} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{
                        backgroundColor: '#E6E9F4 ', borderBottom: '2px solid orange', maxHeight: "50px", minHeight: "50px"
                    }}
                >
                    <Typography style={{ color: "#414c97", margin: "0px" }}><b>Fees Receipt History</b></Typography>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: '#F4F7FC', padding: '15px' }}>
                    <Typography component={'div'} >
                        <div className=''>
                            <div className="row m-1 ">
                                {StudentAccountData.recieptData.map(StudentAccountData => (
                                    <div className='col-4'>
                                        <div className='mx-5 my-3 shadow'>


                                            <div className='row p-1' style={{ fontSize: '12px', backgroundColor: 'rgb(255 135 0)', color: 'white', borderRadius: '5px 5px  0 0 ' }}>Sant Singaji institute Of Science & Management</div>

                                            <div className="row p-1" style={{ backgroundColor: 'orange' }}>
                                                <div className="col">
                                                    <p className='p-1 m-0' style={{ fontSize: '14px', color: 'white' }}>
                                                        <span style={{ fontSize: '11px' }}>Receipt for</span>
                                                        <br />
                                                        {StudentName}
                                                    </p>
                                                </div>
                                                <div className="d-flex col justify-content-start ">
                                                    <p className='p-1' style={{ fontSize: '12px', margin: "auto", color: 'white' }}>{StudentAccountData.accountsReceiptNo}</p>
                                                </div>
                                            </div>
                                            <div className="row p-1" style={{ backgroundColor: 'white', borderRadius: '0 0 5px 5px ' }}>
                                                <div className="row">
                                                    <div className="col">
                                                        <p className='p-1 m-0' style={{ fontSize: '15px', color: '#656A87' }}>
                                                            <span style={{ fontSize: '13px' }}>Date</span>
                                                            <br />
                                                            {StudentAccountData.accountsReceiptDate.split("-").reverse().join("-")}
                                                        </p>
                                                    </div>
                                                    <div className="d-flex col justify-content-start ">
                                                        <p className='p-1 m-0 ms-2  ' style={{ fontSize: '15px', color: '#656A87' }}>
                                                            <span style={{ fontSize: '13px', paddingRight: "23px" }}>Class</span> <br />
                                                            {StudentClassName + '-' + StudentAccountData.year}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <p className='p-1 m-0' style={{ fontSize: '15px', color: '#656A87' }}>
                                                            <span style={{ fontSize: '13px' }}>Pay by</span> <br />
                                                            {StudentAccountData.receivedType}
                                                        </p>
                                                    </div>
                                                    <div className="d-flex col justify-content-start ">
                                                        <p className='p-1 pl-4 m-0' style={{ fontSize: '15px', color: '#656A87' }}>
                                                            <span style={{ fontSize: '13px', marginLeft: '6px' }}>Waive off</span> <br />
                                                            <span style={{ marginLeft: '6px' }}>
                                                                ₹ {StudentAccountData.waiveOf}
                                                            </span>
                                                        </p>

                                                    </div>
                                                </div>

                                                <div className="d-flex col m-2" style={{ backgroundColor: '#6b79cd', borderRadius: '5px' }}>
                                                    <div className="col">
                                                        <p className='p-1 m-0' style={{ fontSize: '15px', color: 'white' }}>

                                                            ₹ {StudentAccountData.receivedAmount}  <br />
                                                            <span style={{ fontSize: '12px' }}>Inst.{StudentAccountData.installmentNo}</span>
                                                        </p></div>

                                                    <div className="col-4 d-flex justify-content-start ">
                                                        {/* <span><i class="fa fa-camera-retro fa-lg"></i></span>
                                                        {/* <a href={StudentAccountData.AccountsReceiptName} rel="noreferrer" target='_blank'><img className='mt-3' src={} alt="downloadImg" /></a></div> */}
                                                        {/* <div>

                                                        <a href={StudentAccountData.AccountsReceiptName} rel="noreferrer" target='_blank'><img className='mt-3' src={Icon_feather_download} alt="downloadImg" /></a></div>
                                                        <FeesRecieptDeletePopup></FeesRecieptDeletePopup>
                                                        </div> */}
                                                        <div>
                                                            {/* <a href={StudentAccountData.AccountsReceiptName} rel="noreferrer" target='_blank'><img className='mt-3' src={Icon_feather_download} alt="downloadImg" /></a> */}
                                                            <FeesRecieptDeletePopup data={StudentAccountData}  ></FeesRecieptDeletePopup>

                                                        </div>
                                                        <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={
                                                            <Tooltip>
                                                                Download Receipt
                                                            </Tooltip>
                                                        }>


                                                            {/* <img src={Edit_icon} alt='edit_icon'  /> */}
                                                            <a href={StudentAccountData.accountsReceiptName} style={{ cursor: 'pointer' }} rel="noreferrer" target='_blank'><img className='mt-3' src={Icon_feather_download} alt="downloadImg" /></a>
                                                        </Whisper>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

//passing the userData in fetchUsers function and also dispatch method
const mapDispatchToProps = (dispatch) => {
    return {
        accountAction: (config, navigate, is_reciptBtn, setLoading) => dispatch(accountAction(config, navigate, is_reciptBtn, setLoading)),
    };
};

//Connecting the component to our store
export default connect(null, mapDispatchToProps)(FeesRecipt);

