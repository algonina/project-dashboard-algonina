import { CONNECTION } from '../../Config/Connections';
import { CONFIG_ } from '../../config/Config';
import { successnotify, warningnotify } from '../../components/ToasNotif/Toast';
import { __openModal } from '../Modal';

var get = '/typeuser';
var post = '/typeuser';
export const actGetDataTypeuser = () => {
  return (dispatch) => {
    let config = CONFIG_({ url: get, method: 'GET' });
    dispatch({ type: 'LOADING_TYPEUSER_TYPEUSER' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_TYPEUSER_TYPEUSER',
            message: 'Success get data',
            data: data,
            code: status,
          });
        }
        return dispatch({ type: 'ERROR_TYPEUSER_TYPEUSER', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_TYPEUSER_TYPEUSER', message: 'Network error..' });
      });
  };
};

export const actPostDataTypeuser = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_TYPEUSER_TYPEUSER' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          successnotify('Type user has been created!');
          dispatch(__openModal({ modal: 'FORM_ADD_TYPEUSER', open: false }));
          return dispatch(actGetDataTypeuser());
        }
        warningnotify('Somthing wrong please try again');
        return dispatch({ type: 'ERROR_TYPEUSER_TYPEUSER', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_TYPEUSER_TYPEUSER', message: 'Network error..' });
      });
  };
};

export const actUpdateDataTypeuser = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_TYPEUSER_TYPEUSER' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          successnotify('Type user has been updated!');
          dispatch(__openModal({ modal: 'MODAL_EDIT_TYPEUSER', open: false }));
          return dispatch(actGetDataTypeuser());
        }
        warningnotify('Somthing wrong please try again');
        return dispatch({ type: 'ERROR_TYPEUSER_TYPEUSER', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_TYPEUSER_TYPEUSER', message: 'Network error..' });
      });
  };
};

export const actDetailDataTypeuser = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_TYPEUSER_TYPEUSER', id: id });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'DETAIL_TYPEUSER_TYPEUSER',
            message: 'Success get data',
            id: id,
            data: data,
          });
        }
        return dispatch({
          type: 'DETAIL_TYPEUSER_TYPEUSER',
          message: 'Success get data',
          id: id,
          data: {},
        });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_TYPEUSER_TYPEUSER', message: 'Network error..' });
      });
  };
};

export const actDeleteDataTypeuser = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_TYPEUSER_TYPEUSER' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          successnotify('Type user has been updated!');
          dispatch(__openModal({ modal: 'MODAL_EDIT_TYPEUSER', open: false }));
          return dispatch(actGetDataTypeuser());
        }
        warningnotify('Somthing wrong please try again');
        return dispatch({ type: 'ERROR_TYPEUSER_TYPEUSER', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_TYPEUSER_TYPEUSER', message: 'Network error..' });
      });
  };
};
