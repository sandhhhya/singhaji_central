import {
  NEW_PASS_FAIL,
  NEW_PASS_REQUEST,
  NEW_PASS_SUCCESS,
} from "../../constants/actions"; 


const initialState = {
  loading: false,
  newPass: false,
  error: false
};

const newPassReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_PASS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PASS_SUCCESS:
      return {
        loading: false,
        newPass: true,
        error: false,
      };
    case NEW_PASS_FAIL:
      return {
        loading: false,
        newPass: false,
        error: true,
      };
    default:
      return state;
  }
};

export default newPassReducer;
