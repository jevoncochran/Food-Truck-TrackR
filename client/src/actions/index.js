import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { GOOGLE_API_KEY } from "../config";

export const GET_VENDOR_START = "GET_ACCOUNT_START";
export const GET_VENDOR_SUCCESS = "GET_ACCOUNT_SUCCESS";
export const GET_DINER_START = "GET_DINER_START";
export const GET_DINER_SUCCESS = "GET_DINER_SUCCESS";
export const GET_DINER_FAIL = "GET_DINER_FAIL";
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const EDIT_LOCATION_START = "EDIT_LOCATION_START";
export const EDIT_LOCATION_SUCCESS = "EDIT_LOCATION_SUCCESS";
export const EDIT_COUNTRY_START = "EDIT_COUNTRY_START";
export const EDIT_COUNTRY_SUCCESS = "EDIT_COUNTRY_SUCCESS";
export const EDIT_LANGUAGE_START = "EDIT_LANGUAGE_START";
export const EDIT_LANGUAGE_SUCCESS = "EDIT_LANGUAGE_SUCCESS";
export const EDIT_PROFILE_PIC_START = "EDIT_PROFILE_PIC_START";
export const EDIT_PROFILE_PIC_SUCCESS = "EDIT_PROFILE_PIC_SUCCESS";
export const GET_ALL_TRUCKS_START = "GET_ALL_TRUCKS_START";
export const GET_ALL_TRUCKS_SUCCESS = "GET_ALL_TRUCKS_SUCCESS";
export const GET_TRUCKS_BY_CUISINE_START = "GET_TRUCKS_BY_CUISINE_START";
export const GET_TRUCKS_BY_CUISINE_SUCCESS = "GET_TRUCKS_BY_CUISINE_SUCCESS";
export const CALCULATE_TRUCK_DISTANCE_START = "CALCULATE_TRUCK_DISTANCE_START";
export const CALCULATE_TRUCK_DISTANCE_SUCCESS =
  "CALCULATE_TRUCK_DISTANCE_SUCCESS";
export const SET_CATEGORY_START = "SET_CATEGORY_START";
export const SET_CATEGORY_SUCCESS = "SET_CATEGORY_SUCCESS";
export const TURN_OFF_CUISINE_TYPE_MODE_START =
  "TURN_OFF_CUISINE_TYPE_MODE_START";
export const TURN_OFF_CUISINE_TYPE_MODE_SUCCESS =
  "TURN_OFF_CUISINE_TYPE_MODE_SUCCESS";
export const SET_SELECTED_TRUCK_START = "SET_SELECTED_TRUCK_START";
export const SET_SELECTED_TRUCK_SUCCESS = "SET_SELECTED_TRUCK_SUCCESS";
export const ADD_TO_FAVORITES_START = "ADD_TO_FAVORITES_START";
export const ADD_TO_FAVORITES_SUCCESS = "ADD_TO_FAVORITES_SUCCESS";
export const REMOVE_FROM_FAVORITES_START = "REMOVE_FROM_FAVORITES_START";
export const GET_FAVORITES_START = "GET_FAVORITES_START";
export const GET_FAVORITES_SUCCESS = "GET_FAVORITES_SUCCESS";
export const ADD_TO_ORDER_START = "ADD_TO_ORDER_START";
export const ADD_TO_ORDER_SUCCESS = "ADD_TO_ORDER_SUCCESS";
export const OPEN_ORDER_CARD_START = "OPEN_ORDER_CARD_START";
export const OPEN_ORDER_CARD_SUCCESS = "OPEN_ORDER_CARD_SUCCESS";
export const CLOSE_ORDER_CARD_START = "CLOSE_ORDER_CARD_START";
export const CLOSE_ORDER_CARD_SUCCESS = "CLOSE_ORDER_CARD_SUCCESS";
export const UPDATE_COUNT_START = "UPDATE_COUNT_START";
export const UPDATE_COUNT_SUCCESS = "UPDATE_COUNT_SUCCESS";
export const REMOVE_FROM_ORDER_START = "REMOVE_FROM_ORDER_START";
export const REMOVE_FROM_ORDER_SUCCESS = "REMOVE_FROM_ORDER_SUCCESS";
export const ADD_ORDER_TRUCK_START = "ADD_ORDER_TRUCK_START";
export const ADD_ORDER_TRUCK_SUCCESS = "ADD_ORDER_TRUCK_SUCCESS";
export const CREATE_NEW_ORDER_START = "CREATE_NEW_ORDER_START";
export const CREATE_NEW_ORDER_SUCCESS = "CREATE_NEW_ORDER_SUCCESS";
export const ADD_CARD_START = "ADD_CARD_START";
export const ADD_CARD_SUCCESS = "ADD_CARD_SUCCESS";
export const DELETE_CARD_START = "DELETE_CARD_START";
export const DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS";
export const UPDATE_ORDER_START = "UPDATE_ORDER_START";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const EDIT_TRUCK_IMG_START = "EDIT_TRUCK_IMG_START";
export const EDIT_TRUCK_IMG_SUCCESS = "EDIT_TRUCK_IMG_SUCCESS";

// login for vendors
export const loginAndGetVendor = (credentials) => (dispatch) => {
  dispatch({ type: GET_VENDOR_START });
  return axios
    .post(
      "https://foodtrucktrackr.herokuapp.com/api/auth/login/operators",
      credentials
    )
    .then((res) => {
      // console.log(res);
      dispatch({ type: GET_VENDOR_SUCCESS, payload: res.data.account });
      localStorage.setItem("token", res.data.token);
    })
    .catch((err) => console.log(err));
};

// login for diners
export const loginAndGetDiner = (credentials) => (dispatch) => {
  dispatch({ type: GET_DINER_START });
  axios
    .post(
      "https://foodtrucktrackr.herokuapp.com/api/auth/login/diners",
      credentials
    )
    .then((res) => {
      console.log(res);
      dispatch({ type: GET_DINER_SUCCESS, payload: res.data.account });
      localStorage.setItem("token", res.data.token);
    })
    .catch((err) => {
      dispatch({ type: GET_DINER_FAIL, payload: err });
    });
};

// registration for diners

export const registerDiner = (info) => (dispatch) => {
  dispatch({ type: SIGNUP_START });
  console.log(
    `front end req.body: {name: ${info.name}, username: ${info.username}, email: ${info.email}, password: ${info.password}}`
  );
  axios
    .post(
      "https://foodtrucktrackr.herokuapp.com/api/auth/register/diners",
      info
    )
    .then((res) => {
      // console.log(res);
      dispatch({ type: SIGNUP_SUCCESS });
    })
    .catch((err) => console.log(err));
};

// registration for vendors
export const registerVendor = (info) => (dispatch) => {
  dispatch({ type: SIGNUP_START });
  axios
    .post(
      "https://foodtrucktrackr.herokuapp.com/api/auth/register/operators",
      info
    )
    .then((res) => {
      // console.log(res);
      dispatch({ type: SIGNUP_SUCCESS });
    })
    .catch((err) => console.log(err));
};

// signout for both diners and vendors
export const clientSignOut = () => (dispatch) => {
  dispatch({ type: LOGOUT_START });
  dispatch({ type: LOGOUT_SUCCESS });
};

// edit location for diners
export const editLocation = (newLocation, id) => (dispatch) => {
  dispatch({ type: EDIT_LOCATION_START });
  axiosWithAuth()
    .patch(`https://foodtrucktrackr.herokuapp.com/api/diner/${id}`, newLocation)
    .then((res) => {
      // console.log(res);
      dispatch({ type: EDIT_LOCATION_SUCCESS, payload: res.data.location });
    });
};

// edit country for diners
export const editCountry = (newCountry, id) => (dispatch) => {
  dispatch({ type: EDIT_COUNTRY_START });
  axiosWithAuth()
    .patch(`https://foodtrucktrackr.herokuapp.com/api/diner/${id}`, newCountry)
    .then((res) => {
      dispatch({ type: EDIT_COUNTRY_SUCCESS, payload: res.data.country });
    });
};

// edit language for diners
export const editLanguage = (newLanguage, id) => (dispatch) => {
  dispatch({ type: EDIT_LANGUAGE_START });
  axiosWithAuth()
    .patch(`https://foodtrucktrackr.herokuapp.com/api/diner/${id}`, newLanguage)
    .then((res) => {
      dispatch({ type: EDIT_LANGUAGE_SUCCESS, payload: res.data.language });
    });
};

// change profile pic for diners
export const changeProfilePic = (newPic, id) => (dispatch) => {
  dispatch({ type: EDIT_PROFILE_PIC_START });
  axiosWithAuth()
    .patch(`https://foodtrucktrackr.herokuapp.com/api/diner/${id}`, newPic)
    .then((res) => {
      dispatch({
        type: EDIT_PROFILE_PIC_SUCCESS,
        payload: res.data.profile_pic,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// get all trucks
export const getAllTrucks = () => (dispatch) => {
  dispatch({ type: GET_ALL_TRUCKS_START });
  axiosWithAuth()
    .get("https://foodtrucktrackr.herokuapp.com/api/trucks")
    .then((res) => {
      console.log(res);
      // setAllTrucks(res.data);
      dispatch({ type: GET_ALL_TRUCKS_SUCCESS, payload: res.data });
    })
    .catch((err) => console.log(err));
};

// get trucks by cuisine type
export const getTrucksByCuisine = (category) => (dispatch) => {
  dispatch({ type: GET_TRUCKS_BY_CUISINE_START });
  return axiosWithAuth()
    .get(`https://foodtrucktrackr.herokuapp.com/api/trucks/type/${category}`)
    .then((res) => {
      console.log(res);
      dispatch({ type: GET_TRUCKS_BY_CUISINE_SUCCESS, payload: res.data });
    })
    .catch((err) => console.log(err));
};

// get distance from user location to truck
export const getTruckDistances = (userLocation, truckLocation) => (
  dispatch
) => {
  dispatch({ type: CALCULATE_TRUCK_DISTANCE_START });
  axios
    .get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLocation}&destinations=${truckLocation}&departure_time=now&key=${GOOGLE_API_KEY}`
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: CALCULATE_TRUCK_DISTANCE_SUCCESS,
        payload: res.data.rows[0].elements[0].distance.text,
      });
    })
    .catch((err) => console.log(err));
};

// set category for truck queries by category
export const pickTruckCategory = (category) => (dispatch) => {
  dispatch({ type: SET_CATEGORY_START });
  dispatch({ type: SET_CATEGORY_SUCCESS, payload: category });
};

// sets cuisineTypeMode to off
export const turnOffCuisineTypeMode = () => (dispatch) => {
  dispatch({ type: TURN_OFF_CUISINE_TYPE_MODE_START });
  dispatch({ type: TURN_OFF_CUISINE_TYPE_MODE_SUCCESS });
};

// selects specific truck so that app can use truck id to push to TruckDetails
export const setSelectedTruck = (truckId) => (dispatch) => {
  dispatch({ type: SET_SELECTED_TRUCK_START });
  axiosWithAuth()
    .get(`https://foodtrucktrackr.herokuapp.com/api/trucks/${truckId}`)
    .then((res) => {
      console.log(res);
      dispatch({ type: SET_SELECTED_TRUCK_SUCCESS, payload: res.data });
    })
    .catch((err) => console.log(err));
};

// adds truck to diner favorites
export const addToFavoriteTrucks = (dinerId, truckId) => (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITES_START });
  axiosWithAuth()
    .post(
      `https://foodtrucktrackr.herokuapp.com/api/diner/${dinerId}/fav/${truckId}`
    )
    .then((res) => {
      console.log(res);
      dispatch({ type: ADD_TO_FAVORITES_SUCCESS, payload: res.data });
    })
    .catch((err) => console.log(err));
};

// removes truck from diner favorites
export const removeFromFavoriteTrucks = (dinerId, truckId) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_FAVORITES_START });
  axiosWithAuth().delete(
    `https://foodtrucktrackr.herokuapp.com/api/diner/${dinerId}/fav/${truckId}`
  );
  dispatch({ type: GET_FAVORITES_START });
  axiosWithAuth()
    .get(`https://foodtrucktrackr.herokuapp.com/api/diner/${dinerId}/favorites`)
    .then((res) => {
      console.log(res);
      dispatch({ type: GET_FAVORITES_SUCCESS, payload: res.data });
    });
};

// add to customer order
export const addItemToOrder = (item) => (dispatch) => {
  dispatch({ type: ADD_TO_ORDER_START });
  dispatch({ type: ADD_TO_ORDER_SUCCESS, payload: item });
};

// display order card
export const openOrderCard = () => (dispatch) => {
  dispatch({ type: OPEN_ORDER_CARD_START });
  dispatch({ type: OPEN_ORDER_CARD_SUCCESS });
};

// close order card
export const closeOrderCard = () => (dispatch) => {
  dispatch({ type: CLOSE_ORDER_CARD_START });
  dispatch({ type: CLOSE_ORDER_CARD_SUCCESS });
};

// update count for individual item in order
export const updateCount = (newCount, key) => (dispatch) => {
  dispatch({ type: UPDATE_COUNT_START });
  dispatch({ type: UPDATE_COUNT_SUCCESS, payload: { newCount, key } });
};

// remove individual item from order
export const removeFromOrder = (key) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_ORDER_START });
  dispatch({ type: REMOVE_FROM_ORDER_SUCCESS, payload: key });
};

// add truck to order so as to distinguish which truck is being ordered from
export const addTruckToOrder = () => (dispatch) => {
  dispatch({ type: ADD_ORDER_TRUCK_START });
  dispatch({ type: ADD_ORDER_TRUCK_SUCCESS });
};

// create new order so as to not allow user to order from multiple trucks at same time
export const createNewOrder = () => (dispatch) => {
  dispatch({ type: CREATE_NEW_ORDER_START });
  dispatch({ type: CREATE_NEW_ORDER_SUCCESS });
};

export const addCreditCard = (dinerId, card) => (dispatch) => {
  dispatch({ type: ADD_CARD_START });
  axiosWithAuth()
    .post(
      `https://foodtrucktrackr.herokuapp.com/api/diner/${dinerId}/card`,
      card
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: ADD_CARD_SUCCESS,
        payload: { card: card, payment_id: res.data },
      });
    })
    .catch((err) => console.log(err));
};

export const deleteCreditCard = (dinerId) => (dispatch) => {
  dispatch({ type: DELETE_CARD_START });
  axiosWithAuth()
    .delete(`/diner/${dinerId}/card`)
    .then(() => {
      dispatch({ type: DELETE_CARD_SUCCESS });
    })
    .catch((err) => console.log(err));
};

export const updateOrder = (item) => (dispatch) => {
  dispatch({ type: UPDATE_ORDER_START });
  dispatch({ type: UPDATE_ORDER_SUCCESS, payload: item });
};

// operators change truck image
export const changeTruckImg = (newImg, operatorId, truckId) => (dispatch) => {
  dispatch({ type: EDIT_TRUCK_IMG_START });
  axiosWithAuth()
    .patch(
      `https://foodtrucktrackr.herokuapp.com/api/operator/${operatorId}/truck/${truckId}`,
      newImg
    )
    .then((res) => {
      dispatch({ type: EDIT_TRUCK_IMG_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
