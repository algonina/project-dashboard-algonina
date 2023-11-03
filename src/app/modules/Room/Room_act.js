import { CONNECTION } from '../../config/Connections';
import { CONFIG_ } from '../../config/Config';
import { successnotify } from '../../components/ToasNotif/Toast';
import { __openModal } from '../Modal';

var get = '/rooms';
var post = '/rooms';
export const actGetDataRoom = () => {
  return (dispatch) => {
    let config = CONFIG_({ url: get, method: 'GET' });
    dispatch({ type: 'LOADING_ROOM_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_ROOM_ROOM',
            message: 'Success get data',
            data: data,
            code: status,
          });
        }
        return dispatch({ type: 'ERROR_ROOM_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_ROOM_ROOM', message: 'Network error..' });
      });
  };
};

export const actPostDataRoom = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_ROOM_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 201) {
          successnotify(message);
          dispatch(__openModal({ modal: 'MODAL_ADD_ROOM', open: false }));
          return dispatch(actGetDataRoom());
        }
        return dispatch({ type: 'ERROR_ROOM_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_ROOM_ROOM', message: 'Network error..' });
      });
  };
};

export const actUpdateDataRoom = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_ROOM_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status, message } = response;
        if (status === 201) {
          successnotify(message);
          dispatch(__openModal({ modal: 'MODAL_EDIT_ROOM', open: false }));
          return dispatch(actGetDataRoom());
        }
        return dispatch({ type: 'ERROR_ROOM_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_ROOM_ROOM', message: 'Network error..' });
      });
  };
};

export const actDetailDataRoom = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_ROOM_ROOM', id: id });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'DETAIL_ROOM_ROOM',
            message: 'Success get data',
            id: id,
            data: data,
          });
        }
        return dispatch({ type: 'ERROR_ROOM_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_ROOM_ROOM', message: 'Network error..' });
      });
  };
};

export const actDeleteDataRoom = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_ROOM_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_ROOM_ROOM', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_ROOM_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_ROOM_ROOM', message: 'Network error..' });
      });
  };
};
