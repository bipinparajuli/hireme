import Api from '../../helpers/ApiHelpers';
//   import {getSession} from '../../helpers/session'
import {
  GETEMPLOYERBYID_FAILURE,
  GETEMPLOYERBYID_SUCCESS,
  GETEMPLOYEE_FAILURE,
  GETEMPLOYEE_SUCCESS,
  GETEMPLOYER_FAILURE,
  GETEMPLOYER_SUCCESS,
  DELETEEMPLOYEE_FAILURE,
  DELETEEMPLOYEE_SUCCESS,
  DELETEEMPLOYER_FAILURE,
  DELETEEMPLOYER_SUCCESS

} from './Constants'
  
  const api = new Api();
 //get employer by id
 export const getEmployerById = (payload) => dispatch => {
    console.log(payload);
    api.get(`getEmployer/${payload}`, { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
            // id=result.data._id
          dispatch({
            type: GETEMPLOYERBYID_SUCCESS,
            data: result.data
          })
  
        } else {
          
          dispatch({
            type: GETEMPLOYERBYID_FAILURE,
            data: {
              errorMessage: result.error,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: GETEMPLOYERBYID_FAILURE,
          data: {
            errorMessage: err.error,
          }
        })
      });
  }


  export const getEmployeeById = (payload) => dispatch => {
    console.log(payload);
    api.get(`getEmployee/${payload}`, { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
            // id=result.data._id
          dispatch({
            type: GETEMPLOYERBYID_SUCCESS,
            data: result.data
          })
  
        } else {
          
          dispatch({
            type: GETEMPLOYERBYID_FAILURE,
            data: {
              errorMessage: result.error,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: GETEMPLOYERBYID_FAILURE,
          data: {
            errorMessage: err.error,
          }
        })
      });
  }

  export const getEmployer = (payload) => dispatch => {
    api.get(`getemployer`, { data: payload })
      .then((result) => {
        if(result.success) {
            // id=result.data._id
          dispatch({
            type: GETEMPLOYER_SUCCESS,
            data: result.data
          })
  
        } else {
          
          dispatch({
            type: GETEMPLOYER_FAILURE,
            data: {
              errorMessage: result.error,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: GETEMPLOYER_FAILURE,
          data: {
            errorMessage: err.error,
          }
        })
      });
  }


  export const getEmployee = (payload) => dispatch => {
    api.get(`getemployee`, { data: payload })
      .then((result) => {
        if(result.success) {
            // id=result.data._id
          dispatch({
            type: GETEMPLOYEE_SUCCESS,
            data: result.data
          })
  
        } else {
          
          dispatch({
            type: GETEMPLOYEE_FAILURE,
            data: {
              errorMessage: result.error,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: GETEMPLOYEE_FAILURE,
          data: {
            errorMessage: err.error,
          }
        })
      });
  }

  //deleted emplyee 
  export const deleteEmployee = (empid) => dispatch => {
    // console.log(payload);
  //   dispatch({
  //     type:JOBS_REQUEST,
  //     data:{}
  // })
    api.delete(`/deleteemployee/${empid}`,)
      .then((result) => {
        console.log(result)
        if(result.success) {
            // id=result.data._id
          dispatch({
            type: DELETEEMPLOYEE_SUCCESS,
            data: result.data
          })
  
        } else {
          
          dispatch({
            type: DELETEEMPLOYEE_FAILURE,
            data: {
              errorMessage: result.msg,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: DELETEEMPLOYEE_FAILURE,
          data: {
            errorMessage: err.msg,
          }
        })
      });
  }

    //deleted emplyee 
  export const deleteEmployer = (empid) => dispatch => {
      // console.log(payload);
    //   dispatch({
    //     type:JOBS_REQUEST,
    //     data:{}
    // })
      api.delete(`/deleteemployer/${empid}`,)
        .then((result) => {
          console.log(result)
          if(result.success) {
              // id=result.data._id
            dispatch({
              type: DELETEEMPLOYER_SUCCESS,
              data: result.data
            })
    
          } else {
            
            dispatch({
              type: DELETEEMPLOYER_FAILURE,
              data: {
                errorMessage: result.msg,
              }
            })
          }
        })
        .catch((err) => {
          console.log('err', err);
          dispatch({
            type: DELETEEMPLOYER_FAILURE,
            data: {
              errorMessage: err.msg,
            }
          })
        });
    }