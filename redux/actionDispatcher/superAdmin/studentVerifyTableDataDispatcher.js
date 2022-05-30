import {
    VERIFY_STUDENT_TABLE_DATA,
    VERIFY_STUDENT_TABLE_DATA_FAIL,
    VERIFY_STUDENT_TABLE_DATA_SUCCESS
} from "../../constants/actions";
import { toast } from "react-toastify";
import AllUrl from "../../constants/url";
import { setLoadingState, setLoadingStateFalse } from "./studentTableDatadispatcher";
var axios = require('axios');
// import getData from "../../services/agent";


export const VerifyStudent = (data) => {
    // console.log("data dispatch", data);
    return async (dispatch) => {
        dispatch(setLoadingState())
        // const url = loginUrl;
        // wait untill the data not received so getData function take data and url part

        dispatch(VerifyStudentRequest());
        var body = JSON.stringify({
            id: data.id
        });

        var config = {
            method: 'post',
            url: `${AllUrl.verifyStudent}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            data: body
        };

        let userResData;

        // console.log("+++++++++++++++++++++++++++++");
        // console.log(body);
        // console.log("+++++++++++++++++++++++++++++");
        try {
            userResData = await axios(config);
            // console.log(userResData)
            dispatch(setLoadingStateFalse())

            if (userResData.status === 200) {
                dispatch(VerifyStudentSuccess(userResData.data));
                toast.success(`student ${data.firstName} ${data.lastName} is shifted to accounts`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                });

            } else if (userResData.status === 406) {
                toast.warning('Invalid parameters', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(VerifyStudentFail());

            } else if (userResData.status === 208) {
                toast.warning('user are already available', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(VerifyStudentFail());

            } else {
                toast.error('Internal Server Error', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // let value = JSON.stringify(userResData.status);
                dispatch(VerifyStudentFail());

            }
            return userResData.status;
        } catch (error) {
            dispatch(setLoadingStateFalse())
            toast.error('Internal Server Error', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            //if crudential fails than Login fail action dispatch
            // let value = JSON.stringify(userResData);
            dispatch(VerifyStudentFail());

        }
    };
};


const VerifyStudentRequest = () => {
    return {
        type: VERIFY_STUDENT_TABLE_DATA
    };
};

const VerifyStudentSuccess = (data) => {
    return {
        type: VERIFY_STUDENT_TABLE_DATA_SUCCESS,
        payload: data
    };
};

const VerifyStudentFail = () => {
    return {
        type: VERIFY_STUDENT_TABLE_DATA_FAIL,
    };
};