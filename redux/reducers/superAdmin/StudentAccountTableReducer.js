import {
  FETCH_STUDENTACCOUNT_DATA,
  STUDENTACCOUNT_TABLE_DATA_FAIL,
  GET_DAILY_REPORT,
  CHANGE_DAILY_REPORT,
  STUDENTACCOUNT_TABLE_DATA_SUCCESS,
  STUDENTACCOUNT_TABLE_CHANGE_SUCCESS,
  STUDENTACCOUNT_TABLE_CHANGE_FAIL,
  ACCOUNT_TABLE_ACTION_SUCCESS,
} from "../../constants/actions";

const initialState = {
  second_loading: false,
  loading: false,
  table_data: [],
  reportData: [],
  personalInfo: [],
  error: false,
};

const StudentAccountTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTACCOUNT_DATA:
      return {
        ...state,
        loading: true,
      };
    case STUDENTACCOUNT_TABLE_DATA_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };

    case STUDENTACCOUNT_TABLE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        table_data: action.payload,
        reportData: action.payload,
        error: false,
      };

    case STUDENTACCOUNT_TABLE_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        second_loading: false,
      };

    case STUDENTACCOUNT_TABLE_CHANGE_FAIL:
      return {
        ...state,
        loading: false,
        second_loading: false,
      };
    case GET_DAILY_REPORT:
      return {
        ...state,
        table_data: action.payload,
      };

    case CHANGE_DAILY_REPORT:
      // console.log("______________");
      // console.log(state.reportData)
      // console.log("______________");
      return {
        ...state,
        table_data: state.reportData
      };

    // Changing the button action reducers 
    case ACCOUNT_TABLE_ACTION_SUCCESS:
      return {
        ...state,
        personalInfo: action.payload,
      };

    default:
      return state;
  }
};

export default StudentAccountTableReducer;
