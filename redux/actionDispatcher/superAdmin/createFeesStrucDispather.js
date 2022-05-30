import axios from "axios";
import Swal from 'sweetalert2'
// import getData from "../../services/agent";
import {
  CREATE_FEES_FAILED,
  CREATE_FEES_STRUCTURE,
  CREATE_FEES_SUCCESS,
} from "../../constants/actions";

export const createFeesStructure = (data, navigate, setVisible, visible) => {
  // console.log("The data is ", data.data);
  return async (dispatch) => {
    // Console the data getting from the form of create admin
    try {
      dispatch(feesReq());
      axios(data)
        .then(function (response) {

          if (response.status === 208) {
            Swal.fire({
              position: 'top-center',
              icon: 'warning',
              title: 'This fees structure is Already created!',
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
            dispatch(feesReqSuccess());
          } else if (response.status === 200) {
            navigate('feesstructuretable')
            setVisible(!visible)
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Fees structure created successfully!',
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
            dispatch(feesReqSuccess());
          } else if (response.status === 401) {
            Swal.fire({
              position: 'top-center',
              icon: 'error',
              title: 'Request failed!',
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
            dispatch(feesReqSuccess());
            // dispatch(feesReqFail(error));
          }
        })
        .catch(function (error) {
          dispatch(feesReqFail());
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'Request failed!',
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
        });
    } catch (error) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Internal server error',
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
      // console.log(error);
      dispatch(feesReqFail());

    }
  };
};

export const feesReq = () => {
  return {
    type: CREATE_FEES_STRUCTURE,
  };
};

export const feesReqSuccess = () => {
  return {
    type: CREATE_FEES_SUCCESS,
  };
};

export const feesReqFail = () => {
  return {
    type: CREATE_FEES_FAILED,
  };
};
