import { HIDE_SIDE_BAR, SHOW_SIDE_BAR } from "../../constants/actions";

export const showSideBar = () => {
  return {
    type: SHOW_SIDE_BAR,
  };
};

export const hideSideBar = () => {
  return {
    type: HIDE_SIDE_BAR,
  };
};
