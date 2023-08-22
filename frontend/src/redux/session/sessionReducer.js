import {
  SIGN_IN,
  SIGN_OUT,
  CLEAR_SESSION,
  USER_CREATED_SUCCESS,
  USER_RESET_PASSWORD_SUCCESS,
  USER_DATA,
  SIGNUP_DATA,
  ALL_USERS,
  IS_LOADING,
  ALL_DEVICES,
  ALL_ISSUES
} from "./sessionTypes";

const initialState = {
  isLoggedIn: false,
  userCreatedSuccess: {'is_created': false, 'message_type': ''},
  resetPasswordSuccess: false,
  userData: {},
  signUpData:{},
  allUsers:[],
  isLoading:false,
  allDevices: [],
  allIssues: []
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case SIGN_OUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    case CLEAR_SESSION:
      return {
          isLoggedIn: false,
          userCreatedSuccess: {'is_created': false, 'message_type': ''},
          resetPasswordSuccess:false,
          userData: {},
          signUpData:{},
          allUsers:[],
          allDevices: [],
          allIssues: [],
          isLoading:false
      };
    case USER_CREATED_SUCCESS:
      return {
        ...state,
        userCreatedSuccess: {'is_created': true, 'message_type': action.payload }
      };
    case USER_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: true
      };
    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case SIGNUP_DATA:
      return {
        ...state,
        signUpData: action.payload,
      };
    case ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ALL_DEVICES:
      return {
        ...state,
        allDevices: action.payload,
      };
    case ALL_ISSUES:
      return {
        ...state,
        allIssues: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
