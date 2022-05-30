import {
  FETCH_FEES_STRUCT_TABLE_DATA,
  FEES_STRUCT_TABLE_DATA_FAIL,
  FEES_STRUCT_TABLE_DATA_SUCCESS,
  FEES_STRUCTURE_CHANGE_STATUS,
  FEES_STRUCTURE_CHANGE_FAIL,
  FEES_STRUCTURE_CHANGE_SUCCESS,
  CHANGE_TOTAL_FEES,
  CHANGE_TOTAL_FEES_SUCCESS,
  CHANGE_TOTAL_FEES_FAIL,
} from "../../constants/actions";

const initialState = {
  third_loading: false,
  second_loading: false,
  loading: false,
  table_data: [],
  error: false,
};

const feesStructureTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEES_STRUCT_TABLE_DATA:
      return {
        ...state,
        loading: true,
      };

    case FEES_STRUCT_TABLE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        table_data: action.payload,
        error: false,
      };

    case FEES_STRUCT_TABLE_DATA_FAIL:
      return {
        ...state,
        loading: false,
        table_data: [],
        error: true,
      };

    case FEES_STRUCTURE_CHANGE_STATUS:
      return {
        ...state,
        second_loading: true,
      };

    case FEES_STRUCTURE_CHANGE_SUCCESS:
      return {
        ...state,
        second_loading: false,
      };

    case FEES_STRUCTURE_CHANGE_FAIL:
      return {
        ...state,
        second_loading: false,
      };


    case CHANGE_TOTAL_FEES:
      return {
        ...state,
        third_loading: true,
      };
    case CHANGE_TOTAL_FEES_SUCCESS:
      return {
        ...state,
        third_loading: false,
      };
    case CHANGE_TOTAL_FEES_FAIL:
      return {
        ...state,
        third_loading: false,
      };

    default:
      return state;
  }
};

export default feesStructureTableReducer;