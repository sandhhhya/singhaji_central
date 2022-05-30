
// import {actions} from "react-table";
import {
    VERIFY_STUDENT_TABLE_DATA,
    VERIFY_STUDENT_TABLE_DATA_SUCCESS,
    VERIFY_STUDENT_TABLE_DATA_FAIL
} from "../../constants/actions";

const initialState = {
    error: false,
    verifyStudentData: [],
    loading: false

};

const VerifyStudentReducer = (state = initialState, action) => {

    switch (action.type) {
        case VERIFY_STUDENT_TABLE_DATA:
            return {
                loading: true,

            };
        case VERIFY_STUDENT_TABLE_DATA_SUCCESS:
            return {
                loading: false,
                error: false,
                verifyStudentData: action.payload,
            };
        case VERIFY_STUDENT_TABLE_DATA_FAIL:
            return {
                loading: false,
                error: true,
                verifyStudentData: '',
            };

        default:
            return state;
    }

}

export default VerifyStudentReducer;