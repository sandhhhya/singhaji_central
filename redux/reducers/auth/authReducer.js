import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../../constants/actions";

const initialState = {
  loading: false,
  loginSucces: false,
  role: "",
  email: '',
  token: "",
  userInfo: "",
  error: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginSucces: true,
        role: action.payload.role,
        token: action.payload.token,
        userInfo: action.payload.user,
        email: action.payload.email,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case LOGOUT:
      return {
        loading: false,
        loginSucces: false,
        role: "",
        token: "",
        userInfo: "",
        error: "",
      };
    default:
      return state;
  }
};

export default userReducer;
