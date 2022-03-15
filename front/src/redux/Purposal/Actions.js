import {
    PURPOSAL_REQUEST,
    PURPOSAL_FAILURE,
    PURPOSAL_SUCCESS,
    GETPURPOSALYID_FAILURE,
    GETPURPOSALYID_SUCCESS,
    GETEMPLOYEEID_FAILURE,
    GETEMPLOYEEID_SUCCESS,
    SUBIT_REMARKS_FAILURE,
    SUBIT_REMARKS_SUCCESS,
    GETPURPOSALBYEMPLOYEE_FAILURE,
    GETPURPOSALBYEMPLOYEE_SUCCESS,
    UPDATEPURPOSAL_FAILURE,
    UPDATEPURPOSAL_SUCCESS,
    UPDATEONGOINGPERCENTAGE_FAILURE,
    UPDATEONGOINGPERCENTAGE_SUCCESS,
    RESET_PURPOSAL_PARAMS

  } from './Constants';
  
  
  
  import Api from '../../helpers/ApiHelpers';
  
  const api = new Api();

export const handlePurposalRequestAction = (payload,uId,Jid) => dispatch => {
console.log(payload);
    dispatch({
        type:PURPOSAL_REQUEST,
        data:{}
    })

    api.post(`postpurposal/${uId}/${Jid}`, { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
          dispatch({
            type: PURPOSAL_SUCCESS,
            data: {
              descriptin:result.data
            }
          })
  
        
  
        } else {
        
          dispatch({
            type: PURPOSAL_FAILURE,
            data: {
              errorMessage: result.error,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: PURPOSAL_FAILURE,
          data: {
            errorMessage: err.error,
          }
        })
      });
  }

  //get Purposal By Job

   //get job by id
   export const getPurposalByJobId = (payload) => dispatch => {
    console.log(payload);
    api.get(`getpurposalbyjob/${payload}`, { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
            // id=result.data._id
          dispatch({
            type: GETPURPOSALYID_SUCCESS,
            data: result.data
          })
  
        } else {
          
          dispatch({
            type: GETPURPOSALYID_FAILURE,
            data: {
              errorMessage: result.msg,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: GETPURPOSALYID_FAILURE,
          data: {
            errorMessage: err.msg,
          }
        })
      });
  }

  //get employee by id
  export const getEmployeeById = (payload) => dispatch => {
    console.log(payload);
    api.get(`getEmployee/${payload}`, { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
            // id=result.data._id
          dispatch({
            type: GETEMPLOYEEID_SUCCESS,
            data: result.data
          })
  
        } else {
          
          dispatch({
            type: GETEMPLOYEEID_FAILURE,
            data: {
              errorMessage: result.msg,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: GETEMPLOYEEID_FAILURE,
          data: {
            errorMessage: err.msg,
          }
        })
      });
  }


  //submitting remarks
  export const handleRemarksRequestAction = (payload,uId) => dispatch => {
    console.log(payload);
        dispatch({
            type:PURPOSAL_REQUEST,
            data:{}
        })
    
        api.put(`updateEmployee/${uId}`, { data: payload })
          .then((result) => {
            console.log(result)
            if(result.success) {
              dispatch({
                type: SUBIT_REMARKS_SUCCESS,
                data: {
                  description:result.data
                }
              })
      
            
      
            } else {
            
              dispatch({
                type: SUBIT_REMARKS_FAILURE,
                data: {
                  errorMessage: result.error,
                }
              })
            }
          })
          .catch((err) => {
            console.log('err', err);
            dispatch({
              type: SUBIT_REMARKS_FAILURE,
              data: {
                errorMessage: err.error,
              }
            })
          });
      }
      // 
       //get job by id
   export const getPurposalByEmployeeId = (payload) => dispatch => {
    console.log(payload);
    api.get(`/getpurposalbyemployee/${payload}`, { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
            // id=result.data._id
          dispatch({
            type: GETPURPOSALBYEMPLOYEE_SUCCESS,
            data: result.data
          })
  
        } else {
          
          dispatch({
            type: GETPURPOSALBYEMPLOYEE_FAILURE,
            data: {
              errorMessage: result.msg,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: GETPURPOSALBYEMPLOYEE_FAILURE,
          data: {
            errorMessage: err.msg,
          }
        })
      });
  }


  export const updatePurposalStatus = (jid,pid) => dispatch => {
            
        api.post(`updatepurposalstatus/${jid}/${pid}`,)
          .then((result) => {
            console.log(result)
            if(result.success) {
              dispatch({
                type: UPDATEPURPOSAL_SUCCESS,
                data: {
                  // descriptin:result.data
                }
              })
      
            
      
            } else {
            
              dispatch({
                type: UPDATEPURPOSAL_FAILURE,
                data: {
                  errorMessage: result.error,
                }
              })
            }
          })
          .catch((err) => {
            console.log('err', err);
            dispatch({
              type: UPDATEPURPOSAL_FAILURE,
              data: {
                errorMessage: err.error,
              }
            })
          });
      }

      export const updateOngoingPercentage = (jid,pid,payload) => dispatch => {
            
        api.post(`updateongoingpercentage/${jid}/${pid}`,{ data: payload })
          .then((result) => {
            console.log(result)
            if(result.success) {
              dispatch({
                type: UPDATEONGOINGPERCENTAGE_SUCCESS,
                data: {
                  // descriptin:result.data
                }
              })
      
            
      
            } else {
            
              dispatch({
                type: UPDATEONGOINGPERCENTAGE_FAILURE,
                data: {
                  errorMessage: result.error,
                }
              })
            }
          })
          .catch((err) => {
            console.log('err', err);
            dispatch({
              type: UPDATEONGOINGPERCENTAGE_FAILURE,
              data: {
                errorMessage: err.error,
              }
            })
          });
      }

      
      export const resetStateHandler = () => dispatch => {
        dispatch({
          type:RESET_PURPOSAL_PARAMS,
          data:{}
      })
      }