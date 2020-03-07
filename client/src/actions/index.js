import axios from "axios";

export const GET_ACCOUNT_START = 'GET_ACCOUNT_START';
export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export const loginAndGetAccount = credentials => dispatch => {
    dispatch({ type: GET_ACCOUNT_START })
    return axios
        .post('https://foodtrucktrackr.herokuapp.com/api/auth/login/operators', credentials)
        .then(res => {
            console.log(res);
            dispatch({ type: GET_ACCOUNT_SUCCESS, payload: res.data.account });
            localStorage.setItem("token", res.data.token);
        })
        .catch(err => console.log(err));
}

export const registerAccount = info => dispatch => {
    dispatch({ type: SIGNUP_START })
    axios
        .post('https://foodtrucktrackr.herokuapp.com/api/auth/register/operators', info)
        .then(res => {
            console.log(res);
            dispatch({ type: SIGNUP_SUCCESS });

        })
        .catch(err => console.log(err));
}