import {
    GETPURPOSALYID_FAILURE,
    GETPURPOSALYID_SUCCESS,
    PURPOSAL_FAILURE,
     PURPOSAL_REQUEST,
     PURPOSAL_SUCCESS,
     GETEMPLOYEEID_FAILURE,
     GETEMPLOYEEID_SUCCESS,
     GETPURPOSALBYEMPLOYEE_FAILURE,
     GETPURPOSALBYEMPLOYEE_SUCCESS,
     RESET_PURPOSAL_PARAMS,
     UPDATEONGOINGPERCENTAGE_FAILURE,
     UPDATEONGOINGPERCENTAGE_SUCCESS,
     UPDATEPURPOSAL_SUCCESS,
     UPDATEPURPOSAL_FAILURE
  } from './Constants';
  
  const initialState = {
    hasError: "",
    errorMessage: '',
    pruposalbyjobid:[],
    isFetching: "",
    hasSuccess:"",
    pruposal:[],
    mypurposal:[],
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
          hasSuccess:true,
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
        case UPDATEONGOINGPERCENTAGE_FAILURE:  
        return {
          ...state,
          errorMessage: '',
        //   jobs: action.data,
          isFetching: false,
          hasError:true,
          errorMessage:action.data.errorMessage
          // hasError: false,


        };
      case UPDATEONGOINGPERCENTAGE_SUCCESS:
        return {
          ...state,
          hasSuccess:true,
          ...action.data,
          isFetching: false,
          // hasSuccess:false,


        };
        case UPDATEPURPOSAL_SUCCESS:  
        return {
          ...state,
          errorMessage: '',
        //   jobs: action.data,
          isFetching: false,
          hasSuccess:true,
          errorMessage:action.data.errorMessage
          // hasError: false,


        };
      case UPDATEPURPOSAL_FAILURE:
        return {
          ...state,
          ...action.data,
          hasError:true,
          isFetching: false,
          // hasSuccess:false,


        };
        case PURPOSAL_REQUEST:
          return {
            ...state,
            // hasError: true,
            ...action.data,
            isFetching: true,
            // hasSuccess:false,
  
  
          };

        case GETPURPOSALBYEMPLOYEE_SUCCESS:  
        return {
          ...state,
          errorMessage: '',
        //   jobs: action.data,
          isFetching: false,
          mypurposal:action.data
          // hasSuccess:true,
          // hasError: false,


        };
      case GETPURPOSALBYEMPLOYEE_FAILURE:
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
          case RESET_PURPOSAL_PARAMS:
            return initialState
      default:
        return state;
    }
  }