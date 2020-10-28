import { userConstants } from "../actionTypes";

// check the localStorage see if user already logged in
let accessToken = JSON.parse(localStorage.getItem("accessToken"));

// Shorthand property names stynex
const initialState = accessToken
  ? { loggedIn: true, accessToken }
  : { loggedIn: false };

// given the current state and action return the next state
export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};
