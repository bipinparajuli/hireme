import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    RESET_REGISTER_PARAMS
  } from './Constants';
  
  const initialState = {
    hasSuccess: false,
    successMessage: '',
    hasError: false,
    errorMessage: '',
    user: undefined,
    isFetching:false
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          hasSuccess: true,
          successMessage: "Successfully Registered",
          hasError: false,
          errorMessage: '',
          isFetching:false
        }
      case REGISTER_FAILURE:
        return {
          ...state,
          hasError: true,
          errorMessage: action.data.errorMessage,
          isFetching:false
        }
      case REGISTER_REQUEST:
        return {
            ...state,
            isFetching:true
        }
      case RESET_REGISTER_PARAMS:
          return initialState
      default:
        return state
    }
  }
  