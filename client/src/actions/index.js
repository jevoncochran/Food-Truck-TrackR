import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { GOOGLE_API_KEY } from "../config";

export const GET_VENDOR_START = 'GET_ACCOUNT_START';
export const GET_VENDOR_SUCCESS = 'GET_ACCOUNT_SUCCESS';
export const GET_DINER_START = 'GET_DINER_START';
export const GET_DINER_SUCCESS = 'GET_DINER_SUCCESS';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const EDIT_LOCATION_START = 'EDIT_LOCATION_START';
export const EDIT_LOCATION_SUCCESS = 'EDIT_LOCATION_SUCCESS';
export const GET_ALL_TRUCKS_START = 'GET_ALL_TRUCKS_START';
export const GET_ALL_TRUCKS_SUCCESS = 'GET_ALL_TRUCKS_SUCCESS';
export const GET_TRUCKS_BY_CUISINE_START = 'GET_TRUCKS_BY_CUISINE_START';
export const GET_TRUCKS_BY_CUISINE_SUCCESS = 'GET_TRUCKS_BY_CUISINE_SUCCESS';
export const CALCULATE_TRUCK_DISTANCE_START = 'CALCULATE_TRUCK_DISTANCE_START';
export const CALCULATE_TRUCK_DISTANCE_SUCCESS = 'CALCULATE_TRUCK_DISTANCE_SUCCESS';
export const SET_CATEGORY_START = 'SET_CATEGORY_START';
export const SET_CATEGORY_SUCCESS = 'SET_CATEGORY_SUCCESS';
export const TURN_OFF_CUISINE_TYPE_MODE_START = 'TURN_OFF_CUISINE_TYPE_MODE_START';
export const TURN_OFF_CUISINE_TYPE_MODE_SUCCESS = 'TURN_OFF_CUISINE_TYPE_MODE_SUCCESS';
export const SET_SELECTED_TRUCK_START = 'SET_SELECTED_TRUCK_START';
export const SET_SELECTED_TRUCK_SUCCESS = 'SET_SELECTED_TRUCK_SUCCESS';


// login for vendors
export const loginAndGetVendor = credentials => dispatch => {
    dispatch({ type: GET_VENDOR_START })
    return axios
        .post('https://foodtrucktrackr.herokuapp.com/api/auth/login/operators', credentials)
        .then(res => {
            // console.log(res);
            dispatch({ type: GET_VENDOR_SUCCESS, payload: res.data.account });
            localStorage.setItem("token", res.data.token);
        })
        .catch(err => console.log(err));
}

// login for diners
export const loginAndGetDiner = credentials => dispatch => {
    dispatch({ type: GET_DINER_START })
    axios
        .post('https://foodtrucktrackr.herokuapp.com/api/auth/login/diners', credentials)
        .then(res => {
            console.log(res);
            dispatch({ type: GET_DINER_SUCCESS, payload: res.data.account });
            localStorage.setItem("token", res.data.token);
        })
        .catch(err => console.log(err));
}

// registration for diners
export const registerDiner = info => dispatch => {
    dispatch({ type: SIGNUP_START })
    axios
        .post('https://foodtrucktrackr.herokuapp.com/api/auth/register/diners', info)
        .then(res => {
            // console.log(res);
            dispatch({ type: SIGNUP_SUCCESS });
        })
        .catch(err => console.log(err));
}

// registration for vendors
export const registerVendor = info => dispatch => {
    dispatch({ type: SIGNUP_START })
    axios
        .post('https://foodtrucktrackr.herokuapp.com/api/auth/register/operators', info)
        .then(res => {
            // console.log(res);
            dispatch({ type: SIGNUP_SUCCESS });

        })
        .catch(err => console.log(err));
}

// signout for both diners and vendors
export const clientSignOut = () => dispatch => {
    dispatch({ type: LOGOUT_START })
    dispatch({ type: LOGOUT_SUCCESS })
}

// edit location for diners
export const editLocation = (newLocation, id) => dispatch => {
    dispatch({ type: EDIT_LOCATION_START })
    axiosWithAuth()
        .patch(`https://foodtrucktrackr.herokuapp.com/api/diner/${id}`, newLocation)
        .then(res => {
            // console.log(res);
            dispatch({ type: EDIT_LOCATION_SUCCESS, payload: res.data.location })
        })
}

// get all trucks
export const getAllTrucks = () => dispatch => {
    dispatch({ type: GET_ALL_TRUCKS_START })
    axiosWithAuth()
            .get('https://foodtrucktrackr.herokuapp.com/api/trucks')
            .then(res => {
                console.log(res);
                // setAllTrucks(res.data);
                dispatch({ type: GET_ALL_TRUCKS_SUCCESS, payload: res.data })
            })
            .catch(err => console.log(err));
}

// get trucks by cuisine type
export const getTrucksByCuisine = (category) => dispatch => {
    dispatch({ type: GET_TRUCKS_BY_CUISINE_START })
    return axiosWithAuth()
    .get(`https://foodtrucktrackr.herokuapp.com/api/trucks/type/${category}`)
    .then(res => {
        console.log(res);
        dispatch({ type: GET_TRUCKS_BY_CUISINE_SUCCESS, payload: res.data })
    })
    .catch(err => console.log(err))
}

// get distance from user location to truck
export const getTruckDistances = (userLocation, truckLocation) => dispatch => {
    dispatch({ type: CALCULATE_TRUCK_DISTANCE_START })
        axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLocation}&destinations=${truckLocation}&departure_time=now&key=${GOOGLE_API_KEY}`)
            .then(res => {
                console.log(res);
                dispatch({ type: CALCULATE_TRUCK_DISTANCE_SUCCESS, payload: res.data.rows[0].elements[0].distance.text })
            })
            .catch(err => console.log(err))
}

// set category for truck queries by category
export const pickTruckCategory = category => dispatch => {
    dispatch({ type: SET_CATEGORY_START })
        dispatch({ type: SET_CATEGORY_SUCCESS, payload: category })
}

// sets cuisineTypeMode to off
export const turnOffCuisineTypeMode = () => dispatch => {
    dispatch({ type: TURN_OFF_CUISINE_TYPE_MODE_START })
    dispatch({ type: TURN_OFF_CUISINE_TYPE_MODE_SUCCESS })
}

// selects specific truck so that app can use truck id to push to TruckDetails
export const setSelectedTruck = truckId => dispatch => {
    dispatch({ type: SET_SELECTED_TRUCK_START })
    axiosWithAuth()
    .get(`/trucks/${truckId}`)
    .then(res => {
        console.log(res);
        dispatch({ type: SET_SELECTED_TRUCK_SUCCESS, payload: res.data })
    })
    .catch(err => console.log(err))
}