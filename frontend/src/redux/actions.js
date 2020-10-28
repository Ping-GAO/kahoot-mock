import { userConstants } from "./actionTypes";
import { API_URL } from "../constants";

// this file constains all the action creators used in this project
export const loginRequest = () => ({
  type: userConstants.LOGIN_REQUEST,
});

export const loginSuccess = () => ({
  type: userConstants.LOGIN_SUCCESS,
});

export const loginFailure = (error) => ({
  type: userConstants.LOGIN_FAILURE,
  payload: error,
});
export const logout = () => ({
  type: userConstants.LOG_OUT,
});
export const registryRequest = () => ({
  type: userConstants.REGISTRY_REQUEST,
});

export const registrySuccess = () => ({
  type: userConstants.REGISTRY_SECCESS,
});

export const registryFailure = (error) => ({
  type: userConstants.REGISTRY_FAILURE,
  payload: error,
});

// async action creator
export const login = (email, password) => {
  return function (dispatch) {
    dispatch(loginRequest());
    fetch(`${API_URL}/admin/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          dispatch(loginSuccess());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFailure(error.message));
      });
  };
};
