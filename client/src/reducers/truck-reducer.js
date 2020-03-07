import {
    GET_ACCOUNT_START,
    GET_ACCOUNT_SUCCESS,
    SIGNUP_START,
    SIGNUP_SUCCESS
} from "../actions";

const initialState = {
    account: {},
    isLoading: false
}

export const truckReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_START:
            return {
                ...state,
                isLoading: true
            }
        case GET_ACCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                account: {
                    id: action.payload.id,
                    username: action.payload.username,
                    email: action.payload.email
                }
            }
        case SIGNUP_START:
            return {
                ...state,
                isLoading: true
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}