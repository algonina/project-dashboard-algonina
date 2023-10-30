import { CONNECTION } from '../../Config/Connections';
import { CONFIG_ } from '../../Config/Config';
import { successnotify, warningnotify } from '../../components/ToasNotif/Toast';
import { __openModal } from '../Modal';

var get = '/typesetting';
var post = '/typesetting';
export const actGetDataTypesetting = () => {
  return (dispatch) => {
    let config = CONFIG_({ url: get, method: 'GET' });
    dispatch({ type: 'LOADING_TYPESETTING_SETTING' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_TYPESETTING_SETTING',
            message: 'Success get data',
            data: data,
            code: status,
          });
        }
        return dispatch({ type: 'ERROR_TYPESETTING_SETTING', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_TYPESETTING_SETTING', message: 'Network error..' });
      });
  };
};

export const actPostDataTypesetting = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_TYPESETTING_SETTING' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Type setting has been created');

          dispatch(__openModal({ modal: 'MODAL_ADD_TYPESETTING', open: false }));
          return dispatch(actGetDataTypesetting());
        }

        warningnotify(message);
        return dispatch({ type: 'ERROR_TYPESETTING_SETTING', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_TYPESETTING_SETTING', message: 'Network error..' });
      });
  };
};

export const actUpdateDataTypesetting = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_TYPESETTING_SETTING' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Type setting has been updated!');

          dispatch(__openModal({ modal: 'MODAL_EDIT_TYPESETTING', open: false }));
          return dispatch(actGetDataTypesetting());
        }

        warningnotify(message);
        return dispatch({ type: 'ERROR_TYPESETTING_SETTING', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_TYPESETTING_SETTING', message: 'Network error..' });
      });
  };
};

export const actDetailDataTypesetting = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_TYPESETTING_SETTING' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_TYPESETTING_SETTING', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_TYPESETTING_SETTING', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_TYPESETTING_SETTING', message: 'Network error..' });
      });
  };
};

export const actDeleteDataTypesetting = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_TYPESETTING_SETTING' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Type setting has been deleted!');

          return dispatch(actGetDataTypesetting());
        }

        warningnotify(message);
        return dispatch({ type: 'ERROR_TYPESETTING_SETTING', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_TYPESETTING_SETTING', message: 'Network error..' });
      });
  };
};
