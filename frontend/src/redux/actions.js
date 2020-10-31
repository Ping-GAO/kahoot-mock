import { userConstants, alertConstants } from "./actionTypes";
import API_URL from "../constants";

// this file constains all the action creators used in this project
export const loginRequest = () => ({
    type: userConstants.LOGIN_REQUEST
});

export const loginSuccess = accessToken => ({
    type: userConstants.LOGIN_SUCCESS,
    accessToken
});

export const loginFailure = () => ({
    type: userConstants.LOGIN_FAILURE,
});
export const logoutRequest = () => ({
    type: userConstants.LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
    type: userConstants.LOGOUT_SUCCESS
});

export const logoutFailure = () => ({
    type: userConstants.LOGOUT_FAILURE,
});

export const registryRequest = () => ({
    type: userConstants.REGISTRY_REQUEST
});

export const registrySuccess = () => ({
    type: userConstants.REGISTRY_SECCESS
});

export const registryFailure = () => ({
    type: userConstants.REGISTRY_FAILURE,
});



export const alertSuccess = message => ({
    type: alertConstants.SUCCESS,
    message
});


export const alertError = message=>({
    type: alertConstants.ERROR,
    message
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
                dispatch(alertSuccess("Login Successfully"));
            })
            .catch(error => {
              
                dispatch(loginFailure());
                dispatch(alertError(error.message));
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



