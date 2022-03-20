import Api from '../../helpers/ApiHelpers';
//   import {getSession} from '../../helpers/session'
import {
  GETEMPLOYERBYID_FAILURE,
  GETEMPLOYERBYID_SUCCESS

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
