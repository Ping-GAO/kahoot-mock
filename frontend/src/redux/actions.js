import userConstants from "./actionTypes";
import API_URL from "../constants";

// this file constains all the action creators used in this project
export const loginRequest = () => ({
  type: userConstants.LOGIN_REQUEST
});

export const loginSuccess = accessToken => ({
  type: userConstants.LOGIN_SUCCESS,
  accessToken
});

export const loginFailure = error => ({
  type: userConstants.LOGIN_FAILURE,
  payload: error
});
export const logoutRequest = () => ({
  type: userConstants.LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
  type: userConstants.LOGOUT_SUCCESS
});

export const logoutFailure = error => ({
  type: userConstants.LOGOUT_FAILURE,
  payload: error
});

export const registryRequest = () => ({
  type: userConstants.REGISTRY_REQUEST
});

export const registrySuccess = () => ({
  type: userConstants.REGISTRY_SECCESS
});

export const registryFailure = error => ({
  type: userConstants.REGISTRY_FAILURE,
  payload: error
});

// async action creator
export const login = (email, password) => {
  return dispatch => {
    dispatch(loginRequest());
    fetch(`${API_URL}/admin/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        // pretent api give us an accessToken
        localStorage.setItem("accessToken", data.token);
        dispatch(loginSuccess(data.token));
      })
      .catch(error => {
        // console.log(error);
        dispatch(loginFailure(error.message));
      });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(logoutRequest());
    fetch(`${API_URL}/admin/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          localStorage.removeItem("accessToken");
          dispatch(logoutSuccess());
        }
      })
      .catch(error => {
        dispatch(logoutFailure(error.message));
      });
  };
};
