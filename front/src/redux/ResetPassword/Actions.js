import {
RESET_SUCCESS,
RESET_REQUEST,
RESET_FAILURE
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