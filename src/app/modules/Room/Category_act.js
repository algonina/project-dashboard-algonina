import { CONNECTION } from '../../Config/Connections';
import { CONFIG_ } from '../../Config/Config';
import { __openModal } from '../Modal';
import { successnotify } from '../../components/ToasNotif/Toast';

var get = '/categories';
var post = '/categories';
export const actGetDataCategory = () => {
  return (dispatch) => {
    let config = CONFIG_({ url: get, method: 'GET' });
    dispatch({ type: 'LOADING_CATEGORY_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_CATEGORY_ROOM',
            message: 'Success get data',
            data: data,
            code: status,
          });
        }
        return dispatch({ type: 'ERROR_CATEGORY_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_CATEGORY_ROOM', message: 'Network error..' });
      });
  };
};

export const actPostDataCategory = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_CATEGORY_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 201) {
          successnotify(message);
          dispatch(__openModal({ modal: 'MODAL_ADD_CATEGORY', open: false }));

          return dispatch(actGetDataCategory());
        }
        return dispatch({ type: 'ERROR_CATEGORY_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_CATEGORY_ROOM', message: 'Network error..' });
      });
  };
};

export const actUpdateDataCategory = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_CATEGORY_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 201) {
          successnotify(message);
          dispatch(__openModal({ modal: 'MODAL_EDIT_CATEGORY', open: false }));
          return dispatch(actGetDataCategory());
        }
        return dispatch({ type: 'ERROR_CATEGORY_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_CATEGORY_ROOM', message: 'Network error..' });
      });
  };
};

export const actDetailDataCategory = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_CATEGORY_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_CATEGORY_ROOM', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_CATEGORY_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_CATEGORY_ROOM', message: 'Network error..' });
      });
  };
};

export const actDeleteDataCategory = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_CATEGORY_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 201) {
          successnotify('Category has been delete');
          return dispatch(actGetDataCategory());
          // return dispatch({ type: 'SUCCESS_CATEGORY_ROOM', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_CATEGORY_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_CATEGORY_ROOM', message: 'Network error..' });
      });
  };
};
