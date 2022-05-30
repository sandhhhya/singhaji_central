import {
    FEES_RECEIPT_TABLE_FAIL,
    FEES_RECEIPT_TABLE_REQ,
    FEES_RECEIPT_TABLE_SUCCESS
} from '../../constants/actions'
  


const initialState = {
    loading: false,
    table_data: [],
    error: false,
};

const feesReceiptTable = (state = initialState, action) => {
    switch (action.type) {
        case FEES_RECEIPT_TABLE_REQ:
            return {
                ...state,
                loading: true,
            };
        case FEES_RECEIPT_TABLE_FAIL:
            return {
                ...state,
                loading: false,
                error: true
            };
        case FEES_RECEIPT_TABLE_SUCCESS:
            return {
                error: false,
                loading: false,
                table_data: action.payload,
            };

        default:
            return state;
    }
}


export default feesReceiptTable;