import {
REGISTER_FAILURE,
REGISTER_REQUEST,
REGISTER_SUCCESS,
RESET_REGISTER_PARAMS
  } from './Constants';
  
  
  
  import Api from '../../helpers/ApiHelpers';
  
  const api = new Api();
  
  export const handleRegisterRequestAction = (payload) => dispatch => {

    dispatch({
        type:REGISTER_REQUEST,
        data:{}
    })

    api.post('signup', { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            data: {
              user: {
                "_id": result.data._id,
                "username": result.data.u_name,
                "email": result.data.u_email,
                "role": result.data.u_role,

              },
              token: result.token
            }
          })
  
        
  
        } else {
        
          dispatch({
            type: REGISTER_FAILURE,
            data: {
              errorMessage: result.error,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
            type: REGISTER_FAILURE,
            data: {
              errorMessage: err.error,
            }
          })
      });
  }


  export const resetRegisterStateHandler = () => dispatch => {
    dispatch({
      type:RESET_REGISTER_PARAMS,
      data:{}
  })
  }