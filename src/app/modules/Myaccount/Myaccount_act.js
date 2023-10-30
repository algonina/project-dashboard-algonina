import { CONNECTION } from '../../config/Connections';
import { CONFIG_ } from '../../config/Config';
import { actGetDataProfile } from '../Profile';
import { successnotify, warningnotify } from '../../components/ToasNotif/Toast';
import { __openModal } from '../Modal';

var get = '/profile';
var post = '/profile';
export const actGetDataMyaccount = () => {
  return (dispatch) => {
    let config = CONFIG_({ url: get, method: 'GET' });
    dispatch({ type: 'LOADING_MYACCOUNT_MYACCOUNT' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          dispatch({ type: 'SUCCESS_MYACCOUNT_MYACCOUNT', message: 'Success' });
          return dispatch({
            type: 'SUCCESS_PROFILE_PROFILE',
            message: 'Success get data',
            data: data,
            code: status,
          });
        }
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'Network error..' });
      });
  };
};

export const actUpdatePhotoMyaccount = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: '/update-photo', data: params, method: 'POST', path: post });
    dispatch({ type: 'LOADING_MYACCOUNT_MYACCOUNT' });
    warningnotify('loading...');
    CONNECTION(config)
      .then((response) => {
        const { status } = response;

        if (status === 200) {
          return dispatch(actGetDataMyaccount());
        }
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'Network error..' });
      });
  };
};

/**
 * @description
 * To update image
 */
export const actPostDataMyaccount = (params) => {
  return (dispatch) => {
    const { file } = params;
    const data = new FormData();
    data.append('file', file);
    let config = CONFIG_({ url: '/update-photo', data: data, method: 'POST', path: post });

    dispatch({ type: 'LOADING_MYACCOUNT_MYACCOUNT' });
    warningnotify('loading...');

    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch(actGetDataMyaccount());
        }
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'Network error..' });
      });
  };
};

/**
 * @description
 * To update information
 */
export const actUpdateDataMyaccount = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: post + '/update', data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_MYACCOUNT_MYACCOUNT' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Account has been updated');
          dispatch({ type: 'SUCCESS_MYACCOUNT_MYACCOUNT', message: 'Success put data' });
          dispatch(__openModal({ modal: 'MODAL_PROFILE_UPDATEUSERNAME', open: false }));
          return dispatch(actGetDataMyaccount());
        }

        errornotify(message);
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'Network error..' });
      });
  };
};

/**
 * @description
 * To update information
 */
export const actUpdateDataMyaccountPassword = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: post + '/update-password', data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_MYACCOUNT_MYACCOUNT' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Account has been updated');
          dispatch(__openModal({ modal: 'MODAL_PROFILE_UPDATEPASSWORD', open: false }));
          return dispatch({ type: 'SUCCESS_MYACCOUNT_MYACCOUNT', message: 'Success put data' });
        }

        errornotify(message);
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'Network error..' });
      });
  };
};

export const actDetailDataMyaccount = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_MYACCOUNT_MYACCOUNT' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_MYACCOUNT_MYACCOUNT', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'Network error..' });
      });
  };
};

export const actDeleteDataMyaccount = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_MYACCOUNT_MYACCOUNT' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_MYACCOUNT_MYACCOUNT', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MYACCOUNT_MYACCOUNT', message: 'Network error..' });
      });
  };
};
