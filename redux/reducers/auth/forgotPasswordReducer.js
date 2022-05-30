import { FORGETPASSWORD_FAIL, FORGETPASSWORD_REQUEST, FORGETPASSWORD_SUCCESS } from "../../constants/actions"

const initialState = {
    loading: false,
    success: false,
    error: false
}


const forgetPassReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGETPASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }


        case FORGETPASSWORD_SUCCESS:
            return {
                loading: false,
                success: true,
                error: false,
            }



        case FORGETPASSWORD_FAIL:
            return {
                loading: false,
                success: false,
                error: true
            }

        default: return state
    }
}

export default forgetPassReducer;






