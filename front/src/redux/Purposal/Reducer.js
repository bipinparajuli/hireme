import {
    GETPURPOSALYID_FAILURE,
    GETPURPOSALYID_SUCCESS,
    PURPOSAL_FAILURE,
     PURPOSAL_REQUEST,
     PURPOSAL_SUCCESS,
     GETEMPLOYEEID_FAILURE,
     GETEMPLOYEEID_SUCCESS
  } from './Constants';
  
  const initialState = {
    hasError: false,
    errorMessage: '',
    pruposalbyjobid:[],
    isFetching: false,
    hasSuccess:false,
    pruposal:[],
    employee:""

  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case PURPOSAL_SUCCESS:  
        return {
          ...state,
          errorMessage: '',
        //   jobs: action.data,
          isFetching: false,
          // hasSuccess:true,
          // hasError: false,


        };
      case PURPOSAL_FAILURE:
        return {
          ...state,
          hasError: true,
          ...action.data,
          isFetching: false,
          // hasSuccess:false,


        };
    //     case POSTJOB_SUCCESS:  
    //     return {
    //       ...state,
    //       errorMessage: '',
    //       isFetching: false,
    //       hasSuccess:true,
    //       hasError: false,


    //     };
    //   case POSTJOB_FAILURE:
    //     return {
    //       ...state,
    //       hasError: true,
    //       ...action.data,
    //       isFetching: false,
    //       hasSuccess:false,


    //     };
        case GETPURPOSALYID_SUCCESS:  
        return {
          ...state,
          errorMessage: '',
          pruposalbyjobid: action.data,
          isFetching: false,

        };
      case GETPURPOSALYID_FAILURE:
        return {
          ...state,
          // hasError: true,
          ...action.data,
          isFetching: false,

        };

        case GETEMPLOYEEID_SUCCESS:  
        return {
          ...state,
          errorMessage: '',
          employee: action.data,
          isFetching: false,

        };
      case GETEMPLOYEEID_FAILURE:
        return {
          ...state,
          // hasError: true,
          ...action.data,
          isFetching: false,

        };
        // case DELETEJOBS_SUCCESS:
        //   return {
        //     ...state,
        //     isFetching: false,
        //     hasSuccess:true,
        //     hasError:false
        //   };
        //   case DELETEJOBS_FAILURE:
        //   return {
        //     ...state,
        //     isFetching: false,
        //     hasSuccess:false,
        //     hasError:true
        //   };
        // case JOBS_REQUEST:
        //   return {
        //     ...state,
        //     isFetching: true,
        //   };
        //   case RESET_JOBS_PARAMS:
        //     return initialState
      default:
        return state;
    }
  }