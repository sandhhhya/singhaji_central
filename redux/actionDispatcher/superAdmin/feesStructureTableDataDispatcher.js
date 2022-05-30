import axios from "axios";
import {
  FETCH_FEES_STRUCT_TABLE_DATA,
  FEES_STRUCT_TABLE_DATA_FAIL,
  FEES_STRUCT_TABLE_DATA_SUCCESS,
  FEES_STRUCTURE_CHANGE_STATUS,
  FEES_STRUCTURE_CHANGE_SUCCESS,
  FEES_STRUCTURE_CHANGE_FAIL,
  CHANGE_TOTAL_FEES,
  CHANGE_TOTAL_FEES_SUCCESS,
  CHANGE_TOTAL_FEES_FAIL,
} from "../../constants/actions";
import AllUrl from "../../constants/url";
import {
  toast
} from 'react-toastify'


export const fetchFeesTableData = (data, Show) => {
  return (dispatch) => {
    if (!Show) {
      dispatch(fetchTableData());
    }
    try {
      axios(data)
        .then(function (response) {
          //Printing the response of the data
          // console.log(response);
          if (response.status === 200) {
            dispatch(fetchSuccessTableData(response.data));
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
            dispatch(fetchFailTableData());
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
            dispatch(fetchFailTableData());
          }
          if (response.status === 404) {
            toast.warn('Data not found', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            dispatch(fetchFailTableData());
          }
        })
        .catch(function (error) {
          // toast.warn('No data found !', {
          //   position: "top-center",
          //   autoClose: 3000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
          dispatch(fetchFailTableData());
        });
    } catch (error) {
      toast.warn('Internal Server Error', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(fetchFailTableData());
    }
  };
};

export const changeFeesStructureStatus = (data, setVisible, visible) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {

    const getUpdatedTableData = async () => {
      var config = {
        method: "GET",
        url: AllUrl.allSchemaList,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      var response = await axios(config);
      dispatch(fetchSuccessTableData(response.data));
    }

    dispatch(feesStructureStatusChange());
    try {
      var response = await axios(data);
      // console.log(response);
      if (response.status === 200) {
        if (visible) {
          setVisible(!visible)
        }
        toast.success('Update successfully !', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(feesStructureStatusSuccess());
        getUpdatedTableData();
      }
      else if (response.status === 400) {
        if (visible) {
          setVisible(!visible)
        }
        // let value = JSON.stringify(response.status);
        dispatch(feesStructureStatusFailed());
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
      else if (response.status === 404) {
        if (visible) {
          setVisible(!visible)
        }
        // let value = JSON.stringify(response.status);
        dispatch(feesStructureStatusFailed());
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
      else if (response.status === 500) {
        if (visible) {
          setVisible(!visible)
        }
        // let value = JSON.stringify(response.status);
        dispatch(feesStructureStatusFailed());
        toast.error("Internal Server Error", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (visible) {
          setVisible(!visible)
        }
        toast.error("Internal Server Error", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(feesStructureStatusFailed())
      }
    } catch (e) {
      if (visible) {
        setVisible(!visible)
      }
      dispatch(feesStructureStatusFailed());
      toast.error("Internal Server Error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
  }
};


export const changeTotalFees = (data, setVisible, visible) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {

    const getUpdatedTableData = async () => {
      var config = {
        method: "GET",
        url: AllUrl.allSchemaList,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      var response = await axios(config);
      dispatch(fetchSuccessTableData(response.data));
    }

    dispatch(changeTotalFeesReq());

    try {
      var response = await axios(data);
      // console.log(response);
      if (response.status === 200) {
        if (visible) {
          setVisible(!visible)
        }
        toast.success('Update successfully !', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(changeTotalFeesSuccess());
        getUpdatedTableData();
      } else if (response.status === 400) {
        if (visible) {
          setVisible(!visible)
        }
        // let value = JSON.stringify(response.status);
        dispatch(changeTotalFeesFail());
        toast.warn('Internal Server Error', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (response.status === 500) {
        if (visible) {
          setVisible(!visible)
        }
        // let value = JSON.stringify(response.status);
        dispatch(changeTotalFeesFail());
        toast.error("Internal Server Error", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (visible) {
          setVisible(!visible)
        }
        toast.error("Internal Server Error", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(changeTotalFeesFail())
      }
    } catch (error) {
      if (visible) {
        setVisible(!visible)
      }
      toast.error("Internal Server Error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(changeTotalFeesFail())
    }

  }
};



const changeTotalFeesReq = () => {
  return {
    type: CHANGE_TOTAL_FEES,
  };
};

const changeTotalFeesSuccess = () => {
  return {
    type: CHANGE_TOTAL_FEES_SUCCESS,
  };
};
const changeTotalFeesFail = () => {
  return {
    type: CHANGE_TOTAL_FEES_FAIL,
  };
};
const fetchTableData = () => {
  return {
    type: FETCH_FEES_STRUCT_TABLE_DATA,
  };
};

const fetchSuccessTableData = (data) => {
  return {
    type: FEES_STRUCT_TABLE_DATA_SUCCESS,
    payload: data,
  };
};

const fetchFailTableData = () => {
  return {
    type: FEES_STRUCT_TABLE_DATA_FAIL,
  };
};

const feesStructureStatusChange = () => {
  return {
    type: FEES_STRUCTURE_CHANGE_STATUS,
  };
};
const feesStructureStatusSuccess = () => {
  return {
    type: FEES_STRUCTURE_CHANGE_SUCCESS,
  };
};
const feesStructureStatusFailed = () => {
  return {
    type: FEES_STRUCTURE_CHANGE_FAIL,
  };
};