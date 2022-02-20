import {
    JOBS_SUCCESS,
    JOBS_FAILURE
  } from './Constants';
  
  const initialState = {
    hasError: false,
    errorMessage: '',
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case JOBS_SUCCESS:  
        return {
          ...state,
          errorMessage: '',
          jobs: action.data,
        };
      case JOBS_FAILURE:
        return {
          ...state,
          hasError: true,
          ...action.data,
        };
      default:
        return state;
    }
  }