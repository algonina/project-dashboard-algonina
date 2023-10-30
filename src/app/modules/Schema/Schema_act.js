import { CONNECTION } from '../../Config/Connections';
import { CONFIG_ } from '../../Config/Config';
import { successnotify, warningnotify } from '../../components/ToasNotif/Toast';
import { __openModal } from '../Modal';

var get = '/modul';
var post = '/modul';
export const actGetDataSchema = () => {
  return (dispatch) => {
    let config = CONFIG_({ url: get, method: 'GET' });
    dispatch({ type: 'LOADING_SCHEMA_SCHEMA' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_SCHEMA_SCHEMA',
            message: 'Success get data',
            data: data,
            code: status,
          });
        }
        return dispatch({ type: 'ERROR_SCHEMA_SCHEMA', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SCHEMA_SCHEMA', message: 'Network error..' });
      });
  };
};

export const actPostDataSchema = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_SCHEMA_SCHEMA' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Modul has been created!');
          dispatch(__openModal({ modal: 'MODAL_ADD_SCHEMA', open: false }));
          return dispatch(actGetDataSchema());
        }
        warningnotify(message);
        return dispatch({ type: 'ERROR_SCHEMA_SCHEMA', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SCHEMA_SCHEMA', message: 'Network error..' });
      });
  };
};

export const actUpdateDataSchema = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_SCHEMA_SCHEMA' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Modul has been updated!');
          dispatch(__openModal({ modal: 'MODAL_EDIT_SCHEMA', open: false }));
          return dispatch(actGetDataSchema());
        }
        warningnotify(message);
        return dispatch({ type: 'ERROR_SCHEMA_SCHEMA', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SCHEMA_SCHEMA', message: 'Network error..' });
      });
  };
};

export const actDetailDataSchema = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_SCHEMA_SCHEMA' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_SCHEMA_SCHEMA', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_SCHEMA_SCHEMA', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SCHEMA_SCHEMA', message: 'Network error..' });
      });
  };
};

export const actDeleteDataSchema = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_SCHEMA_SCHEMA' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 200) {
          successnotify('Modul has been deleted!');
          return dispatch(actGetDataSchema());
        }
        warningnotify(message);
        return dispatch({ type: 'ERROR_SCHEMA_SCHEMA', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_SCHEMA_SCHEMA', message: 'Network error..' });
      });
  };
};
