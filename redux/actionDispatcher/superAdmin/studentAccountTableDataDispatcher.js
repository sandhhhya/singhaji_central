import axios from "axios";
import {
  FETCH_STUDENTACCOUNT_DATA,
  STUDENTACCOUNT_TABLE_DATA_FAIL,
  STUDENTACCOUNT_TABLE_DATA_SUCCESS,
  GET_DAILY_REPORT,
  CHANGE_DAILY_REPORT,
  ACCOUNT_TABLE_ACTION_SUCCESS,
} from "../../constants/actions";
// import AllUrl from "../../constants/url";
import {
  toast
} from 'react-toastify'

import {
  isSuperAdmin
} from '../../../helpers/SuperAdmin';
import {
  isStudentAdmin
} from '../../../helpers/StudentAdmin';
import {
  isAccountAdmin
} from '../../../helpers/AccountAdmin';

export const fetchStudentAccountData = (data) => {
  return (dispatch) => {
    dispatch(fetchStuAccData());
    try {
      axios(data)
        .then(function (response) {
          // console.log(response);
          if (response.status === 200) {
            dispatch(accStuDataSuccess(response.data));
          }
          if (response.status === 400) {
            dispatch(accStuDataFail())
            toast.warn('No data found !', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          if (response.status === 500) {
            dispatch(accStuDataFail())
            toast.warn('Internal Server Error', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch(function (error) {
          dispatch(accStuDataFail())
          toast.warn('Internal Server Error', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } catch (error) {
      dispatch(accStuDataFail())
      toast.warn('Internal Server Error', {
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


export const accountAction = (config, navigate, is_reciptBtn, setLoading) => {
  return (dispatch) => {
    try {
      axios(config)
        .then(function (response) {
          setLoading(false)
          // console.log(response);
          if (response.status === 200) {
            localStorage.setItem('userEdit', JSON.stringify(response.data))

            if (isStudentAdmin()) {
              // console.log("Navigated ");
              if (is_reciptBtn)
                navigate('/student_admin_dashboard/studentprofile/feesrecipt');
              else
                navigate('/student_admin_dashboard/studentprofile');
            } else if (isAccountAdmin()) {
              // console.log("Navigated ");
              if (is_reciptBtn)
                navigate('/account_admin_dashboard/studentprofile/feesrecipt');
              else
                navigate('/account_admin_dashboard/studentprofile');
            } else if (isSuperAdmin()) {
              // console.log("Navigated ");
              if (is_reciptBtn)
                navigate('/admin_dashboard/studentprofile/feesrecipt');
              else
                navigate('/admin_dashboard/studentprofile');
            }
            dispatch(accountActionData(response.data));

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
            dispatch(accStuDataFail());
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
            dispatch(accStuDataFail());
          }
        })
        .catch(function (error) {
          setLoading(false)

          toast.warn('Internal Server Error', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(accStuDataFail());
        });
    } catch (error) {
      setLoading(false)

      toast.warn('Internal Server Error', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(accStuDataFail());
    }
  };
};


const fetchStuAccData = () => {
  return {
    type: FETCH_STUDENTACCOUNT_DATA
  }
}

const accStuDataSuccess = (data) => {
  return {
    type: STUDENTACCOUNT_TABLE_DATA_SUCCESS,
    payload: data
  }
}

const accStuDataFail = () => {
  return {
    type: STUDENTACCOUNT_TABLE_DATA_FAIL,
  }
}

export const getDailyReport = (data) => {
  return {
    type: GET_DAILY_REPORT,
    payload: data
  }
}
export const changeDailyReport = () => {
  return {
    type: CHANGE_DAILY_REPORT,
  }
}

export const accountActionData = (data) => {
  return {
    type: ACCOUNT_TABLE_ACTION_SUCCESS,
    payload: data
  }
}