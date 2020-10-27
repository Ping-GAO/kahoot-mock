import { userConstants } from "./actionTypes";

// this file constains all the action creators used in this project
export const loginRequest = () => ({
  type: userConstants.LOGIN_REQUEST,
});

export const loginSuccess = () => ({
  type: userConstants.LOGIN_SECCESS,
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
