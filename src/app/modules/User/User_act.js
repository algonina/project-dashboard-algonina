import { CONNECTION } from '../../Config/Connections';
import { CONFIG_ } from '../../Config/Config';
import { successnotify, warningnotify } from '../../components/ToasNotif/Toast';
import { __openModal } from '../Modal';

var get = '/user';
var post = '/user';
export const actGetDataUser = () => {
  return (dispatch) => {
    let config = CONFIG_({ url: get, method: 'GET' });
    dispatch({ type: 'LOADING_USER' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_USER',
            message: 'Success get data',
            data: data,
            code: status,
          });
        }
        return dispatch({ type: 'ERROR_USER', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_USER', message: 'Network error..' });
      });
  };
};

export const actPostDataUser = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_USER' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('User has been created!');
          dispatch(__openModal({ modal: 'MODAL_ADD_USER', open: false }));
          return dispatch(actGetDataUser());
        }
        warningnotify(message);
        return dispatch({ type: 'ERROR_USER', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_USER', message: 'Network error..' });
      });
  };
};

export const actUpdateDataUser = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_USER' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('User has been updated!');
          dispatch(__openModal({ modal: 'MODAL_EDIT_USER', open: false }));
          return dispatch(actGetDataUser());
        }
        warningnotify(message);
        return dispatch({ type: 'ERROR_USER', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_USER', message: 'Network error..' });
      });
  };
};

export const actDetailDataUser = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_USER' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_USER', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_USER', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_USER', message: 'Network error..' });
      });
  };
};

export const actDeleteDataUser = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_USER' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          successnotify('User has been deleted!');
          return dispatch(actGetDataUser());
        }

        warningnotify('Something wrong, Failed to delete user!');
        return dispatch({ type: 'ERROR_USER', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_USER', message: 'Network error..' });
      });
  };
};
