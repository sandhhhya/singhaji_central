import { ADD_STUDENT_FAIL, ADD_STUDENT_REQUEST, ADD_STUDENT_SUCCESS } from "../../constants/actions";
// import getData from "../services/agent";
// import getData from '../../../services/agent'
// import swal from "sweetalert";
import Swal from 'sweetalert2'
import AllUrl from "../../constants/url";
import axios from "axios";
import SuccessIcon from '../../../components/assests/image/SuccessIcon.svg'

const AddNewStudent = (data, backToProfilePage) => {
    var dataOfAddStudent = {
        method: 'post',
        url: AllUrl.newRegistraionUrl,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        },
        data: data
    };
    return async (dispatch) => {
        dispatch(AddNewStudentRequest());
        // Sending the additional url to be attached on baseUrl in other function
        // const registrationUrl = AllUrl.newRegistraionUrl;

        // wait untill the data not received so getData function take data and url part
        try {
            let userResData = await axios(dataOfAddStudent);
            // console.log("the response is ::", userResData.request.status);
            // changing the userResData if we need token so userResData.data.toke will be used

            if (userResData.request.status === 200) {
                dispatch(AddNewStudentSuccess(userResData.data));
                backToProfilePage()
                Swal.fire({
                    imageUrl: SuccessIcon,
                    imageAlt: 'image',
                    imageWidth: '75px',
                    imageHeight: '75px',
                    title: 'Success',
                    html:
                        '<hr/>' +
                        'Your form is Successfully submited ',
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

            }
            else if (userResData.request.status === 208) {
                Swal.fire({
                    title: "Email Already found",
                    icon: "warning",
                    showClass: {
                        backdrop: 'swal2-noanimation', // disable backdrop animation
                        popup: '',                     // disable popup animation
                        icon: ''                       // disable icon animation
                    },
                    hideClass: {
                        popup: '',                     // disable popup fade-out animation
                    }
                })
                dispatch(AddNewStudentFailure());
            }
            else if (userResData.request.status === 404) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'warning',
                    title: 'This Student is Already created!',
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
                dispatch(AddNewStudentFailure());
            }
            else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'warning',
                    title: 'Something went wrong!',
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
                dispatch(AddNewStudentFailure());
            }
            return userResData.request.status
        }
        catch (error) {
            //if crudential fails than Login fail action dispatch
            Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: 'Connection lost !',
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
            dispatch(AddNewStudentFailure());
        }
    }
}

export default AddNewStudent;

export const AddNewStudentRequest = () => {
    return {
        type: ADD_STUDENT_REQUEST,
    };
};

export const AddNewStudentSuccess = (users) => {
    return {
        type: ADD_STUDENT_SUCCESS,
        payload: users,
    };
};

export const AddNewStudentFailure = () => {
    return {
        type: ADD_STUDENT_FAIL,
    };
};
