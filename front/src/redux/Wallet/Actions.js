// /payment/braintree/gettoken/:employerId
import {
 GETTOKEN_FAILURE,
 GETTOKEN_SUCCESS,
  PAYENT_FAILURE,
  PAYENT_SUCCESS
  } from './Constants';
  
  
  
  import Api from '../../helpers/ApiHelpers';
  
  const api = new Api();

 //get job by id
 export const getBraintreeToken = (payload) => dispatch => {
    console.log(payload);
    api.get(`payment/braintree/gettoken/${payload}`, { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
            // id=result.data._id
          dispatch({
            type: GETTOKEN_SUCCESS,
            data: result.data.clientToken
          })
  
        } else {
          
          dispatch({
            type: GETTOKEN_FAILURE,
            data: {
              errorMessage: result.msg,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: GETTOKEN_FAILURE,
          data: {
            errorMessage: err.msg,
          }
        })
      });
  }


  //process payment
  export const processPayment = (payload,id) => dispatch => {
    console.log(payload);
    api.post(`/payment/braintree/${id}`, { data: payload })
      .then((result) => {
        console.log(result)
        if(result.success) {
            // id=result.data._id
          dispatch({
            type: PAYENT_SUCCESS,
            data: result.data
          })
  
        } else {
          
          dispatch({
            type: PAYENT_FAILURE,
            data: {
              errorMessage: result.msg,
            }
          })
        }
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: PAYENT_FAILURE,
          data: {
            errorMessage: err.msg,
          }
        })
      });
  }

