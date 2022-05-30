import {
    STUDENTS_TABLE_DATA,
    STUDENTS_TABLE_DATA_FAIL,
    STUDENTS_TABLE_DATA_SUCCESS
} from '../../constants/actions'



const initialState = {
    loading: false,
    table_data: [],
    error: false,
};

const studentTable = (state = initialState, action) => {
    switch (action.type) {
        case STUDENTS_TABLE_DATA:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case STUDENTS_TABLE_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case STUDENTS_TABLE_DATA_SUCCESS:
            return {
                loading: false,
                table_data: action.payload,
                error: false,
            };

        default:
            return state;
    }
}

export default studentTable;