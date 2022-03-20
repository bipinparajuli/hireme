import Api from '../../helpers/ApiHelpers';
//   import {getSession} from '../../helpers/session'
import {
  JOBS_SUCCESS,
  JOBS_FAILURE,
  JOBS_REQUEST,
  JOBBYID_SUCCESS,
  JOBBYID_FAILURE,
  DELETEJOBS_SUCCESS,
  DELETEJOBS_FAILURE,
  RESET_JOBS_PARAMS,
  POSTJOB_FAILURE,
  POSTJOB_SUCCESS

} from './Constants'
  
  const api = new Api();

  
  export const getAllJobs = (payload) => dispatch => {
    console.log(payload);
    api.get('getjobs', { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
            // id=result.data._id
          dispatch({
            type: JOBS_SUCCESS,
            data: result.data
          })
  
        } else {
          
          dispatch({
            type: JOBS_FAILURE,
            data: {
              errorMessage: result.msg,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  // Post job
  export const handleJobRequestAction = (payload,uId) => dispatch => {

    dispatch({
        type:JOBS_REQUEST,
        data:{}
    })

    api.post(`createjob/${uId}`, { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
          dispatch({
            type: POSTJOB_SUCCESS,
            // data: {
              
            // }
          })
  
        
  
        } else {
        
          dispatch({
            type: POSTJOB_FAILURE,
            data: {
              errorMessage: result.error,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
            type: POSTJOB_FAILURE,
            data: {
              errorMessage: err.error,
            }
          })
      });
  }

  //get job by id
  export const getJobById = (payload) => dispatch => {
    console.log(payload);
    api.get(`getjob/${payload}`, { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
            // id=result.data._id
          dispatch({
            type: JOBBYID_SUCCESS,
            data: result.data
          })
  
        } else {
          
          dispatch({
            type: JOBBYID_FAILURE,
            data: {
              errorMessage: result.msg,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: JOBBYID_FAILURE,
          data: {
            errorMessage: err.msg,
          }
        })
      });
  }

  //deleted job 

   export const deleteJob = (uId,jId) => dispatch => {
    // console.log(payload);
    dispatch({
      type:JOBS_REQUEST,
      data:{}
  })
    api.delete(`/deletejob/${uId}/${jId}`,)
      .then((result) => {
        console.log(result)
        if(result.success) {
            // id=result.data._id
          dispatch({
            type: DELETEJOBS_SUCCESS,
            data: result.data
          })
  
        } else {
          
          dispatch({
            type: DELETEJOBS_FAILURE,
            data: {
              errorMessage: result.msg,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: DELETEJOBS_FAILURE,
          data: {
            errorMessage: err.msg,
          }
        })
      });
  }

  export const resetStateHandler = () => dispatch => {
    dispatch({
      type:RESET_JOBS_PARAMS,
      data:{}
  })
  }