import {
   GETTOKEN_FAILURE,
   GETTOKEN_SUCCESS,
   PAYENT_FAILURE,
    PAYENT_SUCCESS
  } from './Constants';
  
  const initialState = {
    isFetching: false,
    hasError: false,
    hasSuccess:false,
    errorMessage: '',
    clientToken: "",
    instance:{}
  };
  
  export default (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
      case GETTOKEN_SUCCESS:
  
        return {
          ...state,
          isFetching: false,
            hasSuccess:true,
          errorMessage: '',
          clientToken: action.data,
        };
      case GETTOKEN_FAILURE:
        return {
          ...state,
          isFetching: false,
          hasError: true,
          ...action.data,
        };
    //   case LOGOUT_REQUEST:
    //     deleteSession();
    //     return {
    //       ...state,
    //       isFetching: false,
    //       isAuthenticated: false,
    //       user: undefined,
    //     };
    //     case LOGIN_REQUEST:
    //       console.log("hi");
    //         return{
    //           ...state,
    //             isFetching:true,
               
    //         }
    // //   case RESEND_MAIL_SUCCESS:
    //   case RESET_LOGIN_PARAMS:
    //     return initialState
      default:
        return state;
    }
  }