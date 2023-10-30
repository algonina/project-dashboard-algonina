import { CONNECTION } from '../../config/Connections';
import { CONFIG_ } from '../../config/Config';

var get = '/profile';
var post = '';
export const actGetDataProfile = (params = '') => {
  return (dispatch) => {
    let config = CONFIG_({
      url: get,
      method: 'GET',
    });
    if (params !== '') {
      config = CONFIG_({
        url: get,
        method: 'GET',
        headers: {
          Authorization: `Bearer ` + params,
        },
      });
    }

    dispatch({ type: 'LOADING_PROFILE_PROFILE' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_PROFILE_PROFILE',
            message: 'Success get data',
            data: data,
            code: status,
          });
        }
        // localStorage.removeItem('access_token');
        return dispatch({ type: 'ERROR_PROFILE_PROFILE', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_PROFILE_PROFILE', message: 'Network error..' });
      });
  };
};

export const actPostDataProfile = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_PROFILE_PROFILE' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 201) {
          return dispatch({ type: 'SUCCESS_PROFILE_PROFILE', message: 'Success post data' });
        }
        return dispatch({ type: 'ERROR_PROFILE_PROFILE', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_PROFILE_PROFILE', message: 'Network error..' });
      });
  };
};

export const actUpdateDataProfile = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_PROFILE_PROFILE' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_PROFILE_PROFILE', message: 'Success put data' });
        }
        return dispatch({ type: 'ERROR_PROFILE_PROFILE', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_PROFILE_PROFILE', message: 'Network error..' });
      });
  };
};

export const actDetailDataProfile = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_PROFILE_PROFILE' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_PROFILE_PROFILE', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_PROFILE_PROFILE', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_PROFILE_PROFILE', message: 'Network error..' });
      });
  };
};

export const actDeleteDataProfile = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_PROFILE_PROFILE' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_PROFILE_PROFILE', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_PROFILE_PROFILE', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_PROFILE_PROFILE', message: 'Network error..' });
      });
  };
};
