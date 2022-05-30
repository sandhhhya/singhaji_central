import {
  ACTIVATE_STUDENT,
  DEACTIVATE_STUDENT,
  FAIL_STATUS_REQUEST,
  REQUEST_STATUS_CHANGE,
} from "../../constants/actions";
// import getData from "../../services/agent";
import axios from "axios";
import Swal from 'sweetalert2'


export const changeStatus = (data) => {
  // const token = localStorage.getItem("token");

  return async (dispatch) => {
    // Console the data getting from the form of create admin
    // console.log("The data is ", data);
    try {
      // dispatch(newAdminReq());
      axios(data)
        .then(function (response) {
          //Printing the response of the data
          // console.log(("Response is  :::", response));

          if (response.status === 208) {
            // dispatch(newAdminReqSuccess());
            Swal.fire({
              position: 'top-center',
              icon: 'warning',
              title: 'Changed Status !',
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
        title: 'Someting went wrong!',
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


export const statusRequest = () => {
  return {
    type: REQUEST_STATUS_CHANGE,
  };
};

export const deactivateStudent = (users) => {
  return {
    type: DEACTIVATE_STUDENT,
    payload: users,
  };
};

export const activateStudent = () => {
  return {
    type: ACTIVATE_STUDENT,
  };
};

export const statusReqestFail = () => {
  return {
    type: FAIL_STATUS_REQUEST,
  };
};
