import {
  ACTIVATE_STUDENT,
  DEACTIVATE_STUDENT,
  FAIL_STATUS_REQUEST,
  REQUEST_STATUS_CHANGE,
} from "../../constants/actions";

const initialState = {
  loading: false,
  statusChanged: false,
  error: false
};

const changeStudentStatus = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE_STUDENT:
      return {
        ...state,
        loading: true,
      };
    case DEACTIVATE_STUDENT:
      return {
        loading: false,
        statusChanged: true,
        error: false,
      };
    case REQUEST_STATUS_CHANGE:
      return {
        loading: false,
        statusChanged: false,
        error: false,
      };
    case FAIL_STATUS_REQUEST:
      return {
        loading: false,
        statusChanged: false,
        error: true,
      };
    default:
      return state;
  }
};

export default changeStudentStatus;
