import { ADD_STUDENT_REQUEST, ADD_STUDENT_FAIL, ADD_STUDENT_SUCCESS } from "../../constants/actions";

const initialState = {
    loading: false,
    newStudent: false,
    error: false,
};

const addNewStudentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STUDENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_STUDENT_SUCCESS:
            return {
                loading: false,
                newStudent: true,
                error: false,
            };
        case ADD_STUDENT_FAIL:
            return {
                loading: false,
                newStudent: false,
                error: true,
            };
        default:
            return state;
    }
};

export default addNewStudentReducer;
