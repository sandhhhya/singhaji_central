import { useFormik } from 'formik'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import AllUrl from '../../../redux/constants/url'
import ImageLightbox from './ImageLightbox'
import { useNavigate } from 'react-router-dom'
import UploadDocumentImage from '../../assests/image/UploadDocument.svg';
import { isSuperAdmin } from '../../../helpers/SuperAdmin';
import { isAccountAdmin } from '../../../helpers/AccountAdmin';
import { isStudentAdmin } from '../../../helpers/StudentAdmin';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import { ToastContainer } from "react-toastify";
import Loader from '../../assests/common/Loader';
import { Tooltip, Whisper } from 'rsuite';

function UploadDocumentFrom() {
    const navigate = useNavigate();
    const [showLightBox, setShowLightBox] = useState(false);
    const [LightboxIndex, setLightBoxIndex] = useState(1);
    const [ImageForLightBox, setImageForLightBox] = useState([]);
    const [loading, setLoading] = useState(false)

    const initialValues = {
        PHOTO: '',//
        COMMITMENT: '',
        BANK_PASSBOOK: '',//
        AADHAR_CARD: '',////
        CAST_CERTIFICATE: '',//
        DOMICILE_CERTIFICATE: '',//
        INCOME_CERTIFICATE: '',//
        TWELTH_MARKSHEET: '',//
        TENTH_MARKSHEET: '',//
        TRANSFER_CERTIFICATE: '',//
        OTHER_CERTIFICATE1: '',
        OTHER_CERTIFICATE2: ''

    }
    const [imgData, setImageData] = useState(initialValues);
    const [imgDataOnline, setImageDataOnline] = useState(initialValues);
    const [stdId1, setStdId] = useState('');
    // const [is_data, setIs_data] = useState(false);

    useEffect(() => {
        const stdData = JSON.parse(localStorage.getItem('userEdit'));
        if (!stdData) {
            if (isStudentAdmin()) { navigate('/student_admin_dashboard/studentaccounttable'); }
            else if (isAccountAdmin()) { navigate('/account_admin_dashboard/studentaccounttable'); }
            else if (isSuperAdmin()) { navigate('/admin_dashboard/studentaccounttable'); }
        }
        setStdId((stdData.accountInfo.stdId).toString())
        const getData = async () => {
            var config = { method: 'get', url: `${AllUrl.GetDocumentsOfStudents}/${(stdData.accountInfo.stdId).toString()}`, headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}`, 'Content-Type': 'application/json' } };
            const response = await axios(config);
            if (response.status === 200) {
                const data = response.data;
                console.log(data)
                data.forEach((ele) => { setImageDataOnline((val) => { return { ...val, [ele.docType]: ele.docUrl } }) })
                let arrayObj = data.map(ele => {
                    return {
                        title: ele.docType,
                        url: ele.docUrl
                    };
                });
                setImageForLightBox(arrayObj);
                // data.forEach((ele) => { setImageForLightBox((val) => { return { ...val, [ele.doc_type]: ele.doc_Url } }) })
            }
        }
        getData();
    }, [navigate])

    const backToProfilePage = (e) => {
        // e.preventDefault()
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
    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            // console.log(values);
            // console.log(imgData)
            let img_obj_db = [];
            Object.entries(imgData).forEach(([key, value]) => {
                if (value !== '') {
                    img_obj_db.push({ documentType: key, base64Data: value })
                    console.log(key)
                }
            })

            if (img_obj_db.length >= 1) {
                setLoading(true)


                const data = [{ stdId: stdId1 }, img_obj_db]

                var config = {
                    method: 'POST',
                    url: AllUrl.UploadDocument,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                const result = await axios(config);
                if (result.status === 200) {
                    setLoading(false)
                    toast('file upload succefullly!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    backToProfilePage()

                }
                console.log(result)

            } else {
                toast.error('Please Choose File To Upload', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });



            }
        }
    })


    const imageToBase64 = async (file, feildName) => {
        if (file) {
            const options = {
                maxSizeMB: 0.01,
                maxWidthOrHeight: 1920,
                // useWebWorker: true
            }
            try {
                const compressedFile = await imageCompression(file, options);
                console.log(compressedFile)
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                var reader = new FileReader();
                reader.readAsDataURL(compressedFile)
                reader.onload = async () => {
                    var Base64 = reader.result
                    console.log(Base64)
                    setImageData((val) => { return { ...val, [feildName]: Base64 } })
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

    const showImgOnLightBox = (image, title) => {
        let id = ImageForLightBox.findIndex(ele => ele?.title === title)

        setLightBoxIndex(id)

        setShowLightBox(true)
    }

    const ImgDiv = ({ IMG, ONLINE_IMG, DISPLAY_NAME, NAME_FOR_FILE }) => {
        return (
            <div className="col-6 col-sm-4 col-md-3 col-xxl-2 m-2 d-flex justify-content-center flex-column align-items-center">
                <div className='shadow' style={{ height: '150px', width: '150px', backgroundColor: 'white', borderRadius: '6px' }}>
                    {IMG !== '' ?

                        <img className='p-1' onClick={() => { showImgOnLightBox(IMG, NAME_FOR_FILE) }} src={IMG} alt="avtar_photo2" style={{ height: '150px', width: '100%', cursor: 'pointer' }} />
                        :
                        ONLINE_IMG !== '' ?

                            <img className='p-1' onClick={() => { showImgOnLightBox(ONLINE_IMG, NAME_FOR_FILE) }} src={ONLINE_IMG} alt="avtar_photo1" style={{ height: '150px', width: '100%', cursor: 'pointer' }} />
                            :
                            <div style={{ height: '150px', width: '100%', cursor: 'pointer' }} className='d-flex justify-content-center' >
                                <img className='mx-auto my-auto' onClick={() => { document.getElementById(NAME_FOR_FILE).click() }} src={UploadDocumentImage} alt="avtar_photo" />
                            </div>
                    }
                </div>
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={
                    <Tooltip>
                        Click Here To Choose File
                    </Tooltip>}>


                    <p className="mx-auto fw-bold text-center mt-2" style={{ cursor: 'pointer', color: '#4f83df' }}
                        onClick={() => { document.getElementById(NAME_FOR_FILE).click() }}>
                        {DISPLAY_NAME}</p>
                    {/* <Whisper /> */}
                </Whisper>
                <input name={NAME_FOR_FILE} placeholder={NAME_FOR_FILE} id={NAME_FOR_FILE} type="file" accept="image/*" onChange={(e) => {
                    imageToBase64(e.target.files[0], NAME_FOR_FILE);
                }} value={formik.values.NAME_FOR_FILE} hidden={true} />
            </div>
        )
    }

    return (
        <div style={{ marginTop: '50px' }}>
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
            {loading && (
                <Loader />
            )}

            {showLightBox && <ImageLightbox images={ImageForLightBox} startIndex={LightboxIndex} onClose={() => { setShowLightBox(false) }} />}


            <form onSubmit={formik.handleSubmit}>

                <div className="row justify-content-center m-1">
                    {<ImgDiv IMG={imgData.PHOTO} ONLINE_IMG={imgDataOnline.PHOTO} DISPLAY_NAME={'Passport Photo'} NAME_FOR_FILE={'PHOTO'} />}
                    {<ImgDiv IMG={imgData.COMMITMENT} ONLINE_IMG={imgDataOnline.COMMITMENT} DISPLAY_NAME={'Commitment'} NAME_FOR_FILE={'COMMITMENT'} />}
                    {<ImgDiv IMG={imgData.TENTH_MARKSHEET} ONLINE_IMG={imgDataOnline.TENTH_MARKSHEET} DISPLAY_NAME={'10th Marksheet'} NAME_FOR_FILE={'TENTH_MARKSHEET'} />}
                    {<ImgDiv IMG={imgData.TWELTH_MARKSHEET} ONLINE_IMG={imgDataOnline.TWELTH_MARKSHEET} DISPLAY_NAME={'12th Marksheet'} NAME_FOR_FILE={'TWELTH_MARKSHEET'} />}
                    {<ImgDiv IMG={imgData.AADHAR_CARD} ONLINE_IMG={imgDataOnline.AADHAR_CARD} DISPLAY_NAME={'Aadhar Card'} NAME_FOR_FILE={'AADHAR_CARD'} />}
                    {<ImgDiv IMG={imgData.CAST_CERTIFICATE} ONLINE_IMG={imgDataOnline.CAST_CERTIFICATE} DISPLAY_NAME={'Cast Certificate'} NAME_FOR_FILE={'CAST_CERTIFICATE'} />}

                    {<ImgDiv IMG={imgData.INCOME_CERTIFICATE} ONLINE_IMG={imgDataOnline.INCOME_CERTIFICATE} DISPLAY_NAME={'Income Cretificate'} NAME_FOR_FILE={'INCOME_CERTIFICATE'} />}
                    {<ImgDiv IMG={imgData.DOMICILE_CERTIFICATE} ONLINE_IMG={imgDataOnline.DOMICILE_CERTIFICATE} DISPLAY_NAME={'Domicile Certificate'} NAME_FOR_FILE={'DOMICILE_CERTIFICATE'} />}
                    {<ImgDiv IMG={imgData.TRANSFER_CERTIFICATE} ONLINE_IMG={imgDataOnline.TRANSFER_CERTIFICATE} DISPLAY_NAME={'Transfer Certificate'} NAME_FOR_FILE={'TRANSFER_CERTIFICATE'} />}
                    {<ImgDiv IMG={imgData.OTHER_CERTIFICATE1} ONLINE_IMG={imgDataOnline.OTHER_CERTIFICATE1} DISPLAY_NAME={'Other Document'} NAME_FOR_FILE={'OTHER_CERTIFICATE1'} />}
                    {<ImgDiv IMG={imgData.OTHER_CERTIFICATE2} ONLINE_IMG={imgDataOnline.OTHER_CERTIFICATE2} DISPLAY_NAME={'Other Document'} NAME_FOR_FILE={'OTHER_CERTIFICATE2'} />}
                </div>

                <div className="d-flex justify-content-end m-1">
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={
                        <Tooltip>
                            Upload Documents
                        </Tooltip>}>

                        <button className="btn btn-primary text-light fw-bold " style={{ marginRight: '30px', marginTop: '110px', width: "220px", height: "41px" }} type="submit">Save</button>
                    </Whisper>

                </div>


            </form>
        </div>
    )
}

export default UploadDocumentFrom
