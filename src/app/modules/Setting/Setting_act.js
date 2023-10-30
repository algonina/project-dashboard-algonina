import { CONNECTION } from '../../Config/Connections';
import { CONFIG_ } from '../../Config/Config';
import { successnotify, warningnotify } from '../../components/ToasNotif/Toast';
import { __openModal } from '../Modal';

var get = '/setting';
var post = '/setting';
export const actGetDataSetting = () => {
  return (dispatch) => {
    let config = CONFIG_({ url: get, method: 'GET' });
    dispatch({ type: 'LOADING_SETTING_SETTING' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_SETTING_SETTING',
            message: 'Success get data',
            data: data,
            code: status,
          });
        }
        return dispatch({ type: 'ERROR_SETTING_SETTING', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SETTING_SETTING', message: 'Network error..' });
      });
  };
};

export const actPostDataSetting = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_SETTING_SETTING' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Setting has been created!');
          dispatch(__openModal({ modal: 'MODAL_ADD_TYPEUSER', open: false }));
          return dispatch(actGetDataSetting());
        }
        warningnotify(message);
        return dispatch({ type: 'ERROR_SETTING_SETTING', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SETTING_SETTING', message: 'Network error..' });
      });
  };
};

export const actUpdateDataSetting = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_SETTING_SETTING' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Setting has been updated!');
          dispatch(__openModal({ modal: 'MODAL_EDIT_TYPEUSER', open: false }));
          return dispatch(actGetDataSetting());
        }
        warningnotify(message);
        return dispatch({ type: 'ERROR_SETTING_SETTING', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SETTING_SETTING', message: 'Network error..' });
      });
  };
};

export const actDetailDataSetting = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_SETTING_SETTING' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_SETTING_SETTING', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_SETTING_SETTING', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SETTING_SETTING', message: 'Network error..' });
      });
  };
};

export const actDeleteDataSetting = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_SETTING_SETTING' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Setting has been deleted!');
          return dispatch(actGetDataSetting());
        }
        warningnotify(message);
        return dispatch({ type: 'ERROR_SETTING_SETTING', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SETTING_SETTING', message: 'Network error..' });
      });
  };
};
