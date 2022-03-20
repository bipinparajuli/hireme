import {
   GETEMPLOYERBYID_FAILURE,
   GETEMPLOYERBYID_SUCCESS
  } from './Constants';
  
  const initialState = {
    hasError: "",
    errorMessage: '',
    isFetching: "",
    hasSuccess:"",
    employer:""

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
       
      default:
        return state;
    }
  }