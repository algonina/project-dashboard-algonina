import { CONNECTION } from '../../Config/Connections';
import { CONFIG_ } from '../../Config/Config';
import { actGetDataProfile } from '../Profile';
import { errornotify } from '../../components/ToasNotif/Toast';

var get = '/auth/login';
var post = '/auth/login';
export const actGetDataAuth = () => {
  return (dispatch) => {
    let config = CONFIG_({ url: get, method: 'GET' });
    dispatch({ type: 'LOADING_AUTH' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_AUTH',
            message: 'Success get data',
            data: data,
            code: status,
          });
        }
        return dispatch({ type: 'ERROR_AUTH', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_AUTH', message: 'Network error..' });
      });
  };
};

export const actPostDataAuth = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_AUTH' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;

        if (status === 201) {
          const { access_token } = data;
          localStorage.setItem('access_token', access_token);
          dispatch({ type: 'SUCCESS_AUTH', message: 'Success post data' });
          return dispatch(actGetDataProfile(access_token));
        }
        errornotify('Login is failed!');
        return dispatch({ type: 'ERROR_AUTH', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_AUTH', message: 'Network error..' });
      });
  };
};

export const actUpdateDataAuth = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_AUTH' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_AUTH', message: 'Success put data' });
        }
        return dispatch({ type: 'ERROR_AUTH', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_AUTH', message: 'Network error..' });
      });
  };
};

export const actDetailDataAuth = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_AUTH' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_AUTH', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_AUTH', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_AUTH', message: 'Network error..' });
      });
  };
};

export const actDeleteDataAuth = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_AUTH' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_AUTH', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_AUTH', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_AUTH', message: 'Network error..' });
      });
  };
};
