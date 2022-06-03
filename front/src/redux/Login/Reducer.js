import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGIN_REQUEST,
    RESET_LOGIN_PARAMS
  } from './Constants';
  import { hasToken, deleteSession, persistSession, getUserData } from './../../helpers/Session';
  
  const initialState = {
    isFetching: false,
    isAuthenticated: hasToken(),//fase
    hasError: false,
    hasSuccess:false,
    errorMessage: '',
    user: getUserData(),
  };
  
  export default (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
      case LOGIN_SUCCESS:
        console.log(action.data);
  
        persistSession(action.data);
        return {
          ...state,
          isFetching: false,
            hasSuccess:true,
          isAuthenticated: true,
          errorMessage: '',
          user: action.data.user,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          isFetching: false,
          isAuthenticated: false,
          hasError: true,
          ...action.data,
        };
      case LOGOUT_REQUEST:
        deleteSession();
        return {
          ...state,
          isFetching: false,
          isAuthenticated: false,
          user: undefined,
        };
        case LOGIN_REQUEST:
          console.log("hi");
            return{
              ...state,
                isFetching:true,
               
            }
    //   case RESEND_MAIL_SUCCESS:
      case RESET_LOGIN_PARAMS:
        return initialState
      default:
        return state;
    }
  }