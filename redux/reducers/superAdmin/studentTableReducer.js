import {
  FETCH_STUDENT_TABLE_DATA,
  STUDENT_TABLE_DATA_FAIL,
  STUDENT_TABLE_DATA_SUCCESS,
  STUDENT_SECOND_LOADING,
  STUDENT_SECOND_LOADING_END,
} from "../../constants/actions";

const initialState = {
  loading: false,
  table_data: [],
  secondLoading: false,
  error: "",
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENT_TABLE_DATA:
      return {
        ...state,
        loading: true,
      };
    case STUDENT_TABLE_DATA_SUCCESS:
      return {
        loading: false,
        table_data: action.payload,
        error: false,
      };

    case STUDENT_TABLE_DATA_FAIL:
      return {
        loading: false,
        table_data: [],
        error: true,
      };
    case STUDENT_SECOND_LOADING:
      return {
        ...state,
        secondLoading: true,
      };
    case STUDENT_SECOND_LOADING_END:
      return {
        ...state,
        secondLoading: false,
      };

    default:
      return state;
  }
};

export default tableReducer;
