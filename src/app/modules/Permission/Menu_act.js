import { CONNECTION } from '../../Config/Connections';
import { CONFIG_ } from '../../Config/Config';
import { successnotify } from '../../components/ToasNotif/Toast';

var get = '/permission-menu';
var post = '/permission-menu';
export const actGetPermissionDataMenu = (id, filter = '') => {
  return (dispatch) => {
    let config = CONFIG_({ url: `${get}/${id}?${filter}`, method: 'GET' });
    dispatch({ type: 'LOADING_MENU_PERMISSION', id: id });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_MENU_PERMISSION',
            message: 'Success get data',
            data: data,
            code: status,
            id: id,
          });
        }
        return dispatch({
          type: 'SUCCESS_MENU_PERMISSION',
          message: 'Success get data',
          data: data,
          code: status,
          id: id,
        });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MENU_PERMISSION', message: 'Network error..' });
      });
  };
};

export const actPostPermissionDataMenu = (params) => {
  return (dispatch) => {
    const { typeuser } = params;
    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_MENU_PERMISSION', id: typeuser });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          // return dispatch({ type: 'SUCCESS_MENU_PERMISSION', message: 'Success post data' });
          successnotify('Permission menu has been updated !');
          return dispatch(actGetPermissionDataMenu(typeuser, 'by=typeuser'));
        }
        return dispatch({ type: 'ERROR_MENU_PERMISSION', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MENU_PERMISSION', message: 'Network error..' });
      });
  };
};

export const actUpdateDataMenu = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_MENU_PERMISSION' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_MENU_PERMISSION', message: 'Success put data' });
        }
        return dispatch({ type: 'ERROR_MENU_PERMISSION', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MENU_PERMISSION', message: 'Network error..' });
      });
  };
};

export const actDetailDataMenu = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_MENU_PERMISSION' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_MENU_PERMISSION', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_MENU_PERMISSION', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MENU_PERMISSION', message: 'Network error..' });
      });
  };
};

export const actDeleteDataMenu = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_MENU_PERMISSION' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_MENU_PERMISSION', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_MENU_PERMISSION', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MENU_PERMISSION', message: 'Network error..' });
      });
  };
};
