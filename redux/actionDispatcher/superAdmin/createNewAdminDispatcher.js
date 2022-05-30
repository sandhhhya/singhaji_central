import axios from "axios";
import Swal from "sweetalert2";
// import { toast } from 'react-toastify'
// import getData from "../../services/agent";

import {
  CREATE_NEW_ADMIN_FAIL,
  CREATE_NEW_ADMIN_REQUEST,
  CREATE_NEW_ADMIN_SUCCESS,
} from "../../constants/actions";

export const createNewAdmin = (data, navigate) => {
  return async (dispatch) => {
    // Console the data getting from the form of create admin
    // console.log("The data is ", data);
    try {
      dispatch(newAdminReq());
      axios(data)
        .then(function (response) {
          if (response.status === 200) {
            dispatch(newAdminReqSuccess());
            navigate('admintable')
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Admin has been created successfully!',
              showConfirmButton: false,
              timer: 2500
            })
          } else if (response.status === 208) {
            dispatch(newAdminReqFail());
            Swal.fire({
              position: 'top-center',
              icon: 'info',
              title: 'Admin already created!',
              showConfirmButton: false,
              timer: 2500
            })
          } else if (response.status === 404) {
            dispatch(newAdminReqFail());
            Swal.fire({
              position: 'top-center',
              icon: 'warning',
              title: '404 status!',
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

          }
        })
        .catch(function (error) {
          // console.log(error);
          dispatch(newAdminReqFail());
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'problem occured!',
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
      dispatch(newAdminReqFail());
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'problem occured!',
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
    }
  };
};

export const newAdminReq = () => {
  return {
    type: CREATE_NEW_ADMIN_REQUEST,
  };
};

export const newAdminReqSuccess = () => {
  return {
    type: CREATE_NEW_ADMIN_SUCCESS,
  };
};

export const newAdminReqFail = () => {
  return {
    type: CREATE_NEW_ADMIN_FAIL,
  };
};
