import {
  SIGN_IN,
  SIGN_OUT,
  CLEAR_SESSION,
  USER_CREATED_SUCCESS,
  USER_DATA,
  SIGNUP_DATA,
  USER_RESET_PASSWORD_SUCCESS,
  ALL_USERS,
  IS_LOADING,
  ALL_DEVICES,
  ALL_ISSUES
} from "./sessionTypes";

export const sign_in = () => {
  return {
    type: SIGN_IN,
  };
};

export const sign_out = () => {
  return {
    type: SIGN_OUT,
  };
};

export const clear_session = () => {
  return {
    type: CLEAR_SESSION,
  };
};

export const user_created_success = (message_type='') => {
  return {
    type: USER_CREATED_SUCCESS,
    payload: message_type
  };
};

export const user_password_reset_success = (message_type='') => {
  return {
    type: USER_RESET_PASSWORD_SUCCESS,
    payload: message_type
  };
};

export const user_data = (user_data = {}) => {
  return {
    type: USER_DATA,
    payload: user_data,
  };
};

export const signup_data = (signup_data = {}) => {
  return {
    type: SIGNUP_DATA,
    payload: signup_data,
  };
};

export const all_users = (all_users = []) => {
  return {
    type: ALL_USERS,
    payload: all_users,
  };
}

export const is_loading = (is_loading = false) => {
  return {
    type: IS_LOADING,
    payload: is_loading,
  };
}

export const all_devices = (devices = []) => {
  return {
    type: ALL_DEVICES,
    payload: devices,
  };
};

export const all_issues = (issues = []) => {
  return {
    type: ALL_ISSUES,
    payload: issues,
  };
};