import {
   GETEMPLOYERBYID_FAILURE,
   GETEMPLOYERBYID_SUCCESS,
   GETEMPLOYEE_FAILURE,
  GETEMPLOYEE_SUCCESS,
  GETEMPLOYER_FAILURE,
  GETEMPLOYER_SUCCESS
  } from './Constants';
  
  const initialState = {
    hasError: "",
    errorMessage: '',
    isFetching: "",
    hasSuccess:"",
    employer:"",
    allemployee:[],
    allemployer:[],


  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
    

        case GETEMPLOYERBYID_SUCCESS:  
        return {
          ...state,
          errorMessage: '',
          employer: action.data,
          isFetching: false,
          hasSuccess:true

        };
      case GETEMPLOYERBYID_FAILURE:
        return {
          ...state,
          // hasError: true,
          ...action.data,
          isFetching: false,
          errorMessage:action.errorMessage,
          hasError:true

        };

        case GETEMPLOYER_SUCCESS:  
        return {
          ...state,
          errorMessage: '',
          allemployer: action.data,
          isFetching: false,
          hasSuccess:true

        };
      case GETEMPLOYER_FAILURE:
        return {
          ...state,
          // hasError: true,
          ...action.data,
          isFetching: false,
          errorMessage:action.errorMessage,
          hasError:true

        };
        case GETEMPLOYEE_SUCCESS:  
        return {
          ...state,
          errorMessage: '',
          allemployee: action.data,
          isFetching: false,
          hasSuccess:true

        };
      case GETEMPLOYEE_FAILURE:
        return {
          ...state,
          // hasError: true,
          ...action.data,
          isFetching: false,
          errorMessage:action.errorMessage,
          hasError:true

        };
       
      default:
        return state;
    }
  }