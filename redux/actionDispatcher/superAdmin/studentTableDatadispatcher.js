import axios from "axios";
import {
  FETCH_STUDENT_TABLE_DATA,
  STUDENT_TABLE_DATA_FAIL,
  STUDENT_TABLE_DATA_SUCCESS,
  STUDENT_SECOND_LOADING,
  STUDENT_SECOND_LOADING_END,
} from "../../constants/actions";
// import Swal from "sweetalert2";
import {
  toast
} from 'react-toastify'

export const fetchStudentTable = (data, isLoading) => {
  return (dispatch) => {
    if (isLoading) {
      dispatch(setLoadingState())
    } else {
      dispatch(fetchTableData());
    }
    try {
      axios(data)
        .then(function (response) {
          if (response.status === 200) {

            if (isLoading) {
              dispatch(fetchSuccessTableData(response.data.reverse()));
              dispatch(setLoadingStateFalse())
            } else {
              dispatch(fetchSuccessTableData(response.data.reverse()));
            }
          }
          if (response.status === 400) {

            toast.warn('No data found !', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            if (isLoading) {
              dispatch(setLoadingStateFalse())
            } else {
              dispatch(fetchFailTableData());
            }
          }


          if (response.status === 500) {
            toast.warn('Internal Server Error', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            if (isLoading) {
              dispatch(setLoadingStateFalse())
            } else {
              dispatch(fetchFailTableData());
            }
          }
        })
        .catch(function (error) {
          if (isLoading) {
            dispatch(setLoadingStateFalse())
          } else {
            dispatch(fetchFailTableData());
          }
          // toast.warn('Some Problem Occurred', {
          //   position: "top-center",
          //   autoClose: 3000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
          //   Swal.fire({
          //     title: "Some Problem Occurred",
          //     icon: "warning",
          //     showConfirmButton: false,
          //     timer: 2500,
          //     showClass: {
          //       backdrop: 'swal2-noanimation', // disable backdrop animation
          //       popup: '',                     // disable popup animation
          //       icon: ''                       // disable icon animation
          //     },
          //     hideClass: {
          //       popup: '',                     // disable popup fade-out animation
          //     }
          //   });
        });
    } catch (error) {
      toast.warn('Some Problem Occurred', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Swal.fire({
      //   title: "Some Problem Occurred",
      //   icon: "warning",
      //   showConfirmButton: false,
      //   timer: 2500,
      //   showClass: {
      //     backdrop: 'swal2-noanimation', // disable backdrop animation
      //     popup: '',                     // disable popup animation
      //     icon: ''                       // disable icon animation
      //   },
      //   hideClass: {
      //     popup: '',                     // disable popup fade-out animation
      //   }
      // });
      if (isLoading) {
        dispatch(setLoadingStateFalse())
      } else {
        dispatch(fetchFailTableData());
      }
      //   console.log(error);
    }
  };
};

const fetchTableData = () => {
  return {
    type: FETCH_STUDENT_TABLE_DATA,
  };
};

const fetchSuccessTableData = (data) => {
  return {
    type: STUDENT_TABLE_DATA_SUCCESS,
    payload: data,
  };
};

const fetchFailTableData = () => {
  return {
    type: STUDENT_TABLE_DATA_FAIL,
  };
};

export const setLoadingState = () => {
  return {
    type: STUDENT_SECOND_LOADING,
  };
};

export const setLoadingStateFalse = () => {
  return {
    type: STUDENT_SECOND_LOADING_END,
  };
};