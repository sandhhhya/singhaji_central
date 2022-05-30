import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../../constants/actions.js";
import getData from "../../../services/agent";
import { toast } from 'react-toastify';
import AllUrl from "../../constants/url.js";
import storage from "../../../helpers/Crypto.js";
import Swal from "sweetalert2";
// import Success_Icon_yellow from '../../../components/assests/image/Success_Icon_yellow.svg'


export const fetchUsers = (data, navigate) => {
  return async (dispatch) => {
    const url = AllUrl.login;
    // wait untill the data not received so getData function take data and url part
    dispatch(loginRequest());
    // console.log("the response is ::", userResData.request.status);
    // changing the userResData if we need token so userResData.data.toke will be used
    try {
      var userResData = await getData(data, url);
      if (userResData.request.status === 200) {
        console.log("Response :: ", userResData);
        //setting the Items in localStorage
        localStorage.setItem("user", userResData.data.user);
        localStorage.setItem("token", userResData.data.token);
        localStorage.setItem("email", userResData.data.email);
        localStorage.setItem("userId", userResData.data.userId);
        storage.setItem("role", userResData.data.role);


        // console.log(userResData.data.role)
        if (userResData.data.role === "SUPERADMIN") {
          navigate('/admin_dashboard');
        } else if (userResData.data.role === "STUDENTADMIN") {
          navigate('/student_admin_dashboard');
        } else if (userResData.data.role === "ACCOUNTADMIN") {
          navigate('/account_admin_dashboard');
        }
        dispatch(loginSuccess(userResData.data));
      }
      else if (userResData.request.status === 404) {
        toast.error('User not found', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(loginFailure());
      }
      else if (userResData.request.status === 403) {
        Swal.fire({
          title: 'User are deactivated please contact Your Admin !',
          icon: 'warn',
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

        dispatch(loginFailure());
      }


      else if (userResData.request.status === 400) {
        // let value = JSON.stringify(userResData.request.status);
        dispatch(loginFailure());
        toast.warn('Invalid credentials', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        dispatch(loginFailure());
        toast.error('Internal server error', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return userResData.request.status;
    } catch (error) {
      dispatch(loginFailure());
      toast.error('Internal server error', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (users) => {
  return {
    type: LOGIN_SUCCESS,
    payload: users,
  };
};

export const loginFailure = () => {
  return {
    type: LOGIN_FAIL,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
