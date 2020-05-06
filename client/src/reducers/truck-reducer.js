import {
  GET_VENDOR_START,
  GET_VENDOR_SUCCESS,
  GET_DINER_START,
  GET_DINER_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  EDIT_LOCATION_START,
  EDIT_LOCATION_SUCCESS,
  GET_ALL_TRUCKS_START,
  GET_ALL_TRUCKS_SUCCESS,
  GET_TRUCKS_BY_CUISINE_START,
  GET_TRUCKS_BY_CUISINE_SUCCESS,
  CALCULATE_TRUCK_DISTANCE_START,
  CALCULATE_TRUCK_DISTANCE_SUCCESS,
  SET_CATEGORY_START,
  SET_CATEGORY_SUCCESS,
  TURN_OFF_CUISINE_TYPE_MODE_START,
  TURN_OFF_CUISINE_TYPE_MODE_SUCCESS,
  SET_SELECTED_TRUCK_START,
  SET_SELECTED_TRUCK_SUCCESS,
  ADD_TO_FAVORITES_START,
  ADD_TO_FAVORITES_SUCCESS,
  REMOVE_FROM_FAVORITES_START,
  GET_FAVORITES_START,
  GET_FAVORITES_SUCCESS,
  ADD_TO_ORDER_START,
  ADD_TO_ORDER_SUCCESS,
  OPEN_ORDER_CARD_START,
  OPEN_ORDER_CARD_SUCCESS,
  CLOSE_ORDER_CARD_START,
  CLOSE_ORDER_CARD_SUCCESS,
  UPDATE_COUNT_START,
  UPDATE_COUNT_SUCCESS,
  REMOVE_FROM_ORDER_START,
  REMOVE_FROM_ORDER_SUCCESS,
} from "../actions";
import { MenuItem } from "@material-ui/core";

const initialState = {
  account: {},
  isLoading: false,
  order: [],
  role: "",
  isLogged: false,
};

export const truckReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case GET_VENDOR_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_VENDOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        role: "vendor",

        account: {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
        },
      };
    case GET_DINER_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DINER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        role: "diner",

        account: {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          password: action.payload.password,
          location: action.payload.location,
          favTrucks: action.payload.favTrucks,
        },
      };
    case SIGNUP_START:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case LOGOUT_START:
      return {
        ...state,
        isLoading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        role: "",
        account: {},
        trucks: [],
        trucksByType: [],
        cuisineTypeMode: false,
        truckCategory: null,
      };
    case EDIT_LOCATION_START:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_LOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        account: {
          ...state.account,
          location: action.payload,
        },
      };
    case GET_ALL_TRUCKS_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_TRUCKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        trucks: action.payload,
      };
    case GET_TRUCKS_BY_CUISINE_START:
      return {
        ...state,
        isLoading: true,
        cuisineTypeMode: true,
      };
    case GET_TRUCKS_BY_CUISINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        trucksByType: action.payload,
      };
    case CALCULATE_TRUCK_DISTANCE_START:
      return {
        ...state,
        isLoading: true,
      };
    case CALCULATE_TRUCK_DISTANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        truckDistanceArr: [...state.truckDistanceArr, action.payload],
      };
    case SET_CATEGORY_START:
      return {
        ...state,
        isLoading: true,
      };
    case SET_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        truckCategory: action.payload,
      };
    case TURN_OFF_CUISINE_TYPE_MODE_START:
      return {
        ...state,
        isLoading: true,
      };
    case TURN_OFF_CUISINE_TYPE_MODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cuisineTypeMode: false,
      };
    case SET_SELECTED_TRUCK_START:
      return {
        ...state,
        isLoading: true,
      };
    case SET_SELECTED_TRUCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedTruck: action.payload,
      };
    case ADD_TO_FAVORITES_START:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        account: {
          ...state.account,
          favTrucks: [...state.account.favTrucks, action.payload],
        },
      };
    case REMOVE_FROM_FAVORITES_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_FAVORITES_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_FAVORITES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        account: {
          ...state.account,
          favTrucks: action.payload,
        },
      };
    case ADD_TO_ORDER_START:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_TO_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: [...state.order, action.payload],
      };
    case OPEN_ORDER_CARD_START:
      return {
        ...state,
        isLoading: true,
      };
    case OPEN_ORDER_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderCardOpen: true,
      };
    case CLOSE_ORDER_CARD_START:
      return {
        ...state,
        isLoading: true,
      };
    case CLOSE_ORDER_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderCardOpen: false,
      };
    case UPDATE_COUNT_START:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_COUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: [
          ...state.order.map((item) => {
            if (item.item === action.payload.key) {
              return {
                ...item,
                count: action.payload.newCount,
                total: action.payload.newCount * item.price,
              };
            }
            return item;
          }),
        ],
      };
    case REMOVE_FROM_ORDER_START:
      return {
        ...state,
        isLoading: true,
      };
    case REMOVE_FROM_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: [
          ...state.order.filter((item) => {
            return item.item !== action.payload;
          }),
        ],
      };
    default:
      return state;
  }
};
