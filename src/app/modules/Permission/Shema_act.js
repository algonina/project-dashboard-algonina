import { CONNECTION } from '../../Config/Connections';
import { CONFIG_ } from '../../Config/Config';
import { successnotify, warningnotify } from '../../components/ToasNotif/Toast';
import { __openModal } from '../Modal';

var get = '/permission-modul';
var post = '/permission-modul';
export const actGetDataPermissionShema = (typeuser, filter = '') => {
  return (dispatch) => {
    let config = CONFIG_({ url: `${get}/${typeuser}?${filter}`, method: 'GET' });
    dispatch({ type: 'LOADING_SHEMA_PERMISSION', id: typeuser });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_SHEMA_PERMISSION',
            message: 'Success get data',
            data: data,
            code: status,
            id: typeuser,
          });
        }
        return dispatch({ type: 'ERROR_SHEMA_PERMISSION', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SHEMA_PERMISSION', message: 'Network error..' });
      });
  };
};

export const actPostDataPermissionShema = (params) => {
  return (dispatch) => {
    const { typeuser } = params;

    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_SHEMA_PERMISSION' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Pemission modul has been created!');
          dispatch(__openModal({ modal: 'FORM_ADD_PERMISSON_MODUL', open: false }));
          return dispatch(actGetDataPermissionShema(typeuser, 'by=typeuser'));
        }

        warningnotify(message || 'Something wrong please try again letter');
        return dispatch({ type: 'ERROR_SHEMA_PERMISSION', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SHEMA_PERMISSION', message: 'Network error..' });
      });
  };
};

export const actUpdatePermissionDataShema = (params) => {
  return (dispatch) => {
    const { id, typeuser } = params;
    let config = CONFIG_({ url: post + '/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_SHEMA_PERMISSION', id: typeuser });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Pemission modul has been updated!');
          dispatch(__openModal({ modal: 'FORM_EDIT_PERMISSON_MODUL', open: false }));

          return dispatch(actGetDataPermissionShema(typeuser, 'by=typeuser'));
        }

        warningnotify(message || 'Something wrong please try again letter');
        return dispatch({ type: 'ERROR_SHEMA_PERMISSION', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SHEMA_PERMISSION', message: 'Network error..' });
      });
  };
};

export const actDetailDataShema = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_SHEMA_PERMISSION' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_SHEMA_PERMISSION', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_SHEMA_PERMISSION', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SHEMA_PERMISSION', message: 'Network error..' });
      });
  };
};

export const actDeletePermisionDataShema = (params) => {
  return (dispatch) => {
    const { id, typeuser } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_SHEMA_PERMISSION', id: id });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Permission Modul has been delete!');

          return dispatch(actGetDataPermissionShema(typeuser, 'by=typeuser'));
        }
        warningnotify(message);
        return dispatch({ type: 'ERROR_SHEMA_PERMISSION', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SHEMA_PERMISSION', message: 'Network error..' });
      });
  };
};
