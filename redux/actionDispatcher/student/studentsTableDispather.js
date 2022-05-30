import axios from "axios";
import {
    STUDENTS_TABLE_DATA,
    STUDENTS_TABLE_DATA_FAIL,
    STUDENTS_TABLE_DATA_SUCCESS
} from '../../constants/actions'

const getStudentsdata = (data) => {
    return (dispatch) => {
        dispatch(fetchTableData());
        try {
            axios(data)
                .then(function (response) {
                    if (response.status === 200) {
                        dispatch(fetchSuccessTableData(response.data));
                    }
                })
                .catch(function (error) {
                    Swal.fire({
                        title: "Connection lost!",
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
                    fetchFailTableData();
                });
        } catch (error) {
            Swal.fire({
                title: "Connection lost !",
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
            fetchFailTableData();
        }
    };
};
export default getStudentsdata


const fetchTableData = () => {
    return {
        type: STUDENTS_TABLE_DATA,
    };
};


const fetchSuccessTableData = (data) => {
    return {
        type: STUDENTS_TABLE_DATA_SUCCESS,
        payload: data,
    };
};

const fetchFailTableData = () => {
    return {
        type: STUDENTS_TABLE_DATA_FAIL,
    };
};
