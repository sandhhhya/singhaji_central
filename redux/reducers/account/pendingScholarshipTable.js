import {
    PENDING_SCHOLARSHIP_TABLE_FAIL,
    PENDING_SCHOLARSHIP_TABLE_REQ,
    PENDING_SCHOLARSHIP_TABLE_SUCCESS
} from '../../constants/actions';







const initialState = {
    loading: false,
    table_data: [],
    error: false,
};



const pendingScholarshipTable = (state = initialState, action) => {
    switch (action.type) {
        case PENDING_SCHOLARSHIP_TABLE_REQ:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case PENDING_SCHOLARSHIP_TABLE_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case PENDING_SCHOLARSHIP_TABLE_SUCCESS:
            return {
                error: false,
                loading: false,
                table_data: action.payload,
            };

        default:
            return state;
    }
}

export default pendingScholarshipTable;