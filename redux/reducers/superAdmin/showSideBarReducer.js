import { HIDE_SIDE_BAR, SHOW_SIDE_BAR } from "../../constants/actions";

const initialState = {
  show: false,
};

const showSideBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SIDE_BAR:
      return {
        show: true,
      };
    case HIDE_SIDE_BAR:
      return {
        show: false,
      };
    default:
      return state;
  }
};

export default showSideBarReducer;
