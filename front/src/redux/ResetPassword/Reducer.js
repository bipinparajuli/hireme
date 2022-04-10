import {
  RESETEMAIL_FAILURE,
  RESETEMAIL_SUCCESS,
  RESET_FAILURE,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_RESET_PASSWORD_PARAMS
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
       case RESET_SUCCESS:
   
         return {
           ...state,
           isFetching: false,
             hasSuccess:true,
           errorMessage: '',
           clientToken: action.data,
         };
       case RESET_FAILURE:
         return {
           ...state,
           isFetching: false,
           hasError: true,
           ...action.data,
         };
         case RESET_REQUEST:
            return {
              ...state,
              isFetching: true,
            //   hasError: true,
              ...action.data,
            };
            case RESETEMAIL_SUCCESS:
   
         return {
           ...state,
           isFetching: false,
             hasSuccess:true,
           errorMessage: '',
           clientToken: action.data,
         };
       case RESETEMAIL_FAILURE:
         return {
           ...state,
           isFetching: false,
           hasError: true,
           ...action.data,
         };
   
                
     // //   case RESEND_MAIL_SUCCESS:
       case RESET_RESET_PASSWORD_PARAMS:
         return initialState
       default:
         return state;
     }
   }