import {
  CREATE_NEW_ADMIN_FAIL,
  CREATE_NEW_ADMIN_REQUEST,
  CREATE_NEW_ADMIN_SUCCESS,
} from "../../constants/actions";

const initialState = {
  loading: false,
  newAdmin: false,
  error: false,
};

const newAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_NEW_ADMIN_SUCCESS:
      return {
        loading: false,
        newAdmin: true,
        error: false,
      };
    case CREATE_NEW_ADMIN_FAIL:
      return {
        loading: false,
        newAdmin: false,
        error: true,
      };
    default:
      return state;
  }
};

export default newAdminReducer;
