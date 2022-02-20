import Api from '../../helpers/ApiHelpers';
//   import {getSession} from '../../helpers/session'
import {JOBS_SUCCESS,JOBS_FAILURE} from './Constants'
  
  const api = new Api();

  let id;
  
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