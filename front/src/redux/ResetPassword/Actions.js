import {
RESET_SUCCESS,
RESET_REQUEST,
RESETEMAIL_FAILURE,
RESETEMAIL_SUCCESS,
RESET_FAILURE,
RESET_RESET_PASSWORD_PARAMS
  } from './Constants';
  
  
  
  import Api from '../../helpers/ApiHelpers';
  
  const api = new Api();

export const handleResetPasswordRequestAction = (payload,uId) => dispatch => {

    dispatch({
        type:RESET_REQUEST,
        data:{}
    })

    api.post(`/change-password/${uId}`, { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
          dispatch({
            type: RESET_SUCCESS,
            data: {
              
            }
          })
  
        
  
        } else {
        
          dispatch({
            type: RESET_FAILURE,
            data: {
              errorMessage: result.error,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: RESET_FAILURE,
          data: {
            errorMessage: err.error,
          }
        })
      });
  }

  export const handleResetPasswordEmailRequestAction = (payload,uId) => dispatch => {

    dispatch({
        type:RESET_REQUEST,
        data:{}
    })

    api.post(`/request-password-reset`, { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
          dispatch({
            type: RESETEMAIL_SUCCESS,
            data: {
              
            }
          })
  
        
  
        } else {
        
          dispatch({
            type: RESETEMAIL_FAILURE,
            data: {
              errorMessage: result.error,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: RESETEMAIL_FAILURE,
          data: {
            errorMessage: err.error,
          }
        })
      });
  }

  export const resetStateHandler = () => dispatch => {
    dispatch({
      type:RESET_RESET_PASSWORD_PARAMS,
      data:{}
  })
  }