import { CONNECTION } from '../../Config/Connections';
import { CONFIG_ } from '../../Config/Config';
import { successnotify, warningnotify } from '../../components/ToasNotif/Toast';
import { __openModal } from '../Modal';

var get = '/menu';
var post = '/menu';
export const actGetDataMenu = () => {
  return (dispatch) => {
    let config = CONFIG_({ url: get, method: 'GET' });
    dispatch({ type: 'LOADING_MENU_SCHEMA' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_MENU_SCHEMA',
            message: 'Success get data',
            data: data,
            code: status,
          });
        }
        return dispatch({ type: 'ERROR_MENU_SCHEMA', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MENU_SCHEMA', message: 'Network error..' });
      });
  };
};

export const actPostDataMenu = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_MENU_SCHEMA' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          successnotify('Menu has been created!');
          dispatch(__openModal({ modal: 'MODAL_ADD_SCHEMA_MENU', open: false }));
          return dispatch(actGetDataMenu());
        }
        warningnotify('Something wrong, try again latter!');

        return dispatch({ type: 'ERROR_MENU_SCHEMA', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MENU_SCHEMA', message: 'Network error..' });
      });
  };
};

export const actUpdateDataMenu = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: '/update/' + id, data: params, method: 'PUT', path: post });
    dispatch({ type: 'LOADING_MENU_SCHEMA' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          successnotify('Menu has been update!');
          dispatch(__openModal({ modal: 'MODAL_EDIT_SCHEMA_MENU', open: false }));
          return dispatch(actGetDataMenu());
        }
        warningnotify('Something wrong, try again latter!');

        return dispatch({ type: 'ERROR_MENU_SCHEMA', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MENU_SCHEMA', message: 'Network error..' });
      });
  };
};

export const actUpdateDataMenuStructur = (params) => {
  return (dispatch) => {
    let config = CONFIG_({
      url: '/update-structur',
      data: { menu: params },
      method: 'PUT',
      path: post,
    });
    dispatch({ type: 'LOADING_MENU_SCHEMA' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          successnotify('Menu has been update!');
          return dispatch(actGetDataMenu());
        }
        warningnotify('Something wrong, try again latter!');

        return dispatch({ type: 'ERROR_MENU_SCHEMA', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MENU_SCHEMA', message: 'Network error..' });
      });
  };
};

export const actDetailDataMenu = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_MENU_SCHEMA' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_MENU_SCHEMA', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_MENU_SCHEMA', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MENU_SCHEMA', message: 'Network error..' });
      });
  };
};

export const actDeleteDataMenu = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_MENU_SCHEMA' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          successnotify('Menu has been delete!');
          return dispatch(actGetDataMenu());
        }

        warningnotify('Something wrong, try again latter!');
        return dispatch({ type: 'ERROR_MENU_SCHEMA', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MENU_SCHEMA', message: 'Network error..' });
      });
  };
};
