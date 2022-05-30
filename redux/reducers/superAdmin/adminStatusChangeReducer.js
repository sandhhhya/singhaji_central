// import {actions} from "react-table";
import {
    ADMIN_STATUS_CHANGE_REQUEST,
    ADMIN_STATUS_CHANGE_SUCCESS,
    ADMIN_STATUS_CHANGE_FAIL
} from "../../constants/actions";

const initialState = {
    error: false,
    AdminStatusChangeData: [],
    loading: false
};

const AdminStatusChangeReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADMIN_STATUS_CHANGE_REQUEST:
            return {
                loading: true,

            };
        case ADMIN_STATUS_CHANGE_SUCCESS:
            return {
                loading: false,
                error: false,
                AdminStatusChangeData: action.payload,
            };
        case ADMIN_STATUS_CHANGE_FAIL:
            return {
                loading: false,
                error: true,
                AdminStatusChangeData: '',
            };

        default:
            return state;
    }

}

export default AdminStatusChangeReducer;