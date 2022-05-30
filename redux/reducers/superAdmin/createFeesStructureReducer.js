import {
  CREATE_FEES_FAILED,
  CREATE_FEES_STRUCTURE,
  CREATE_FEES_SUCCESS,
} from "../../constants/actions";

const initialState = {
  second_loading: false,
  loading: false,
  feesStructure: false,
  error: false,
};

const createNewFeesStructure = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FEES_STRUCTURE:
      return {
        ...state,
        second_loading: true,
        loading: true,
      };
    case CREATE_FEES_SUCCESS:
      return {
        ...state,
        loading: false,
        feesStructure: true,
        second_loading: false,
        error: false,
      };
    case CREATE_FEES_FAILED:
      return {
        loading: false,
        feesStructure: false,
        second_loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default createNewFeesStructure;
