import {
    JOBS_SUCCESS,
    JOBS_FAILURE,
    JOBBYID_FAILURE,
    JOBBYID_SUCCESS,
    JOBS_REQUEST,
    DELETEJOBS_FAILURE,
    DELETEJOBS_SUCCESS,
    RESET_JOBS_PARAMS
  } from './Constants';
  
  const initialState = {
    hasError: false,
    errorMessage: '',
    jobbyid:[],
    isFetching: false,
    hasSuccess:false,
    jobs:[]

  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case JOBS_SUCCESS:  
        return {
          ...state,
          errorMessage: '',
          jobs: action.data,
          isFetching: false,
          // hasSuccess:true,
          // hasError: false,


        };
      case JOBS_FAILURE:
        return {
          ...state,
          hasError: true,
          ...action.data,
          isFetching: false,
          // hasSuccess:false,


        };
        case JOBBYID_SUCCESS:  
        return {
          ...state,
          errorMessage: '',
          jobbyid: action.data,
          isFetching: false,

        };
      case JOBBYID_FAILURE:
        return {
          ...state,
          hasError: true,
          ...action.data,
          isFetching: false,

        };
        case DELETEJOBS_SUCCESS:
          return {
            ...state,
            isFetching: false,
            hasSuccess:true,
            hasError:false
          };
          case DELETEJOBS_FAILURE:
          return {
            ...state,
            isFetching: false,
            hasSuccess:false,
            hasError:true
          };
        case JOBS_REQUEST:
          return {
            ...state,
            isFetching: true,
          };
          case RESET_JOBS_PARAMS:
            return initialState
      default:
        return state;
    }
  }