import axios from "axios";
import { toast } from "react-toastify";
import {
    PENDING_SCHOLARSHIP_TABLE_FAIL,
    PENDING_SCHOLARSHIP_TABLE_REQ,
    PENDING_SCHOLARSHIP_TABLE_SUCCESS
} from '../../constants/actions'

const pendingScholarship = (data) => {
    return (dispatch) => {
        dispatch(fetchTableData());
        axios(data)
            .then(function (response) {
                // console.log((response));
                if (response.status === 200) {
                    dispatch(fetchSuccessTableData(response.data));
                }
                else if (response.status === 400) {
                    toast.warning('No data found ', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    dispatch(fetchFailTableData());
                }
                else if (response.status === 500) {
                    toast.warning('Internal server error', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    dispatch(fetchFailTableData());
                }
                else {
                    toast.warning('Something went wrong !', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    dispatch(fetchFailTableData());
                }
            })
            .catch(function (error) {
                dispatch(fetchFailTableData());
                toast.warning('Something went wrong', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });

    };
};

export default pendingScholarship

const fetchTableData = () => {
    return {
        type: PENDING_SCHOLARSHIP_TABLE_REQ,
    };
};


const fetchSuccessTableData = (data) => {
    return {
        type: PENDING_SCHOLARSHIP_TABLE_SUCCESS,
        payload: data,
    };
};

const fetchFailTableData = () => {
    return {
        type: PENDING_SCHOLARSHIP_TABLE_FAIL,
    };
};
