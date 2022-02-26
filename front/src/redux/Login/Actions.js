import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGIN_REQUEST,
    RESET_LOGIN_PARAMS
  } from './Constants';
  
  
  
  import Api from '../../helpers/ApiHelpers';
  
  const api = new Api();
  
  export const handleLoginRequestAction = (payload) => dispatch => {

    dispatch({
        type:LOGIN_REQUEST,
        data:{}
    })

    api.post('signin', { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            data: {
              user: {
                "_id": result.data._id,
                "role": result.data.u_role,

              },
              token: result.data.token
            }
          })
  
        
  
        } else {
        
          dispatch({
            type: LOGIN_FAILURE,
            data: {
              errorMessage: result.error,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: LOGIN_FAILURE,
          data: {
            errorMessage: err.error,
          }
        })
      });
  }

  export const resetStateHandler = () => dispatch => {
    dispatch({
      type:RESET_LOGIN_PARAMS,
      data:{}
  })
  }

  //logout request

  export const logoutHandler = () => dispatch => {
    dispatch({
      type:LOGOUT_REQUEST,
      data:{}
  })
  }