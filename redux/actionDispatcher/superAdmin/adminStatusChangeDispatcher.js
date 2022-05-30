import { ADMIN_STATUS_CHANGE_SUCCESS, ADMIN_STATUS_CHANGE_FAIL } from "../../constants/actions";
import { toast } from "react-toastify";
import AllUrl from "../../constants/url";
import { fetchSuccessfailTableData, fetchTableDataSec } from './adminTableDatadispatcher'
var axios = require('axios');
// import getData from "../../services/agent";


export const AdminStatusChange = (data, navigate) => {
    // console.log("data dispatch", data);
    return async (dispatch) => {
        // dispatch(AdminStatusChangeRequest());
        dispatch(fetchTableDataSec());
        var body = JSON.stringify({
            email: data.email,
            isActive: data.isActive === 1 ? '0' : '1',
        });

        var config = {
            method: 'post',
            url: `${AllUrl.adminStatusChange}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            data: body
        };

        let userResData;
        try {
            userResData = await axios(config);
            // console.log(userResData)
            if (userResData.status === 200) {
                let email = localStorage.getItem('email')
                if (data.email === email) {
                    navigate('/');
                }
                dispatch(AdminStatusChangeSuccess(userResData.data));
                toast.success(`Successfull `, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return userResData.status;

            } else if (userResData.status === 404) {
                toast.warning('Data Not Found', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,  
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
 
                
                dispatch(fetchSuccessfailTableData())
                dispatch(AdminStatusChangeFail());
                return userResData.status;

            } else if (userResData.status === 208) {
                toast.warning('user are already available', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                dispatch(AdminStatusChangeFail())
                dispatch(fetchSuccessfailTableData())
                return userResData.status;

            } else {
                toast.error('Internal Server Error', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                // let value = JSON.stringify(userResData.status);
                dispatch(AdminStatusChangeFail())
                dispatch(fetchSuccessfailTableData())

            }
            return userResData.status;
        } catch (error) {
            //if crudential fails than Login fail action dispatch
            dispatch(AdminStatusChangeFail())
            dispatch(fetchSuccessfailTableData())
            toast.error('Internal Server Problem', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return error;

        }
    };
};


const AdminStatusChangeSuccess = (data) => {
    return {
        type: ADMIN_STATUS_CHANGE_SUCCESS,
        payload: data
    };
};

const AdminStatusChangeFail = () => {
    return {
        type: ADMIN_STATUS_CHANGE_FAIL,
    };
};