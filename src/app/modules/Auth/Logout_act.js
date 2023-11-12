import { CONNECTION } from '../../Config/Connections';
import { CONFIG_ } from '../../Config/Config';
import { actGetDataProfile } from '../Profile/Profile_act';

var get = '/auth/logout';
// var post = '';
export const actLogout = () => {
  return (dispatch) => {
    let config = CONFIG_({ url: get, method: 'GET' });
    dispatch({ type: 'LOADING_LOGOUT_AUTH' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_LOGOUT_AUTH', message: 'success' });

          // return dispatch(actGetDataProfile());
        }
        return dispatch({ type: 'ERROR_LOGOUT_AUTH', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);

        return dispatch({ type: 'ERROR_LOGOUT_AUTH', message: 'Network error..' });
      });
  };
};
