import { CONNECTION } from '../../config/Connections';
import { CONFIG_ } from '../../config/Config';
import { actDetailDataRoom, actUpdateDataRoom } from './Room_act';
import { successnotify } from '../../components/ToasNotif/Toast';

var get = '/content';
var post = '/content';
export const actGetDataContent = () => {
  return (dispatch) => {
    let config = CONFIG_({ url: get, method: 'GET' });
    dispatch({ type: 'LOADING_CONTENT_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_CONTENT_ROOM',
            message: 'Success get data',
            data: data,
            code: status,
          });
        }
        return dispatch({ type: 'ERROR_CONTENT_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_CONTENT_ROOM', message: 'Network error..' });
      });
  };
};

export const actPostDataContent = (params) => {
  return (dispatch) => {
    const { room } = params;
    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_CONTENT_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 201) {
          dispatch({ type: 'SUCCESS_CONTENT_ROOM', message: 'Success post data' });
          return dispatch(actUpdateDataRoom({ id: room }));
        }
        return dispatch({ type: 'ERROR_CONTENT_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_CONTENT_ROOM', message: 'Network error..' });
      });
  };
};

export const actUpdateDataContent = (params) => {
  return (dispatch) => {
    const { id, code, room_code } = params;
    let config = CONFIG_({ url: post + '/update/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_CONTENT_ROOM', id: code });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          successnotify('Content has been updated !');
          dispatch(actDetailDataRoom({ id: room_code }));
          return dispatch(actDetailDataContent({ id: code }));
        }
        return dispatch({ type: 'ERROR_CONTENT_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_CONTENT_ROOM', message: 'Network error..' });
      });
  };
};

export const actPublishDataContent = (params) => {
  return (dispatch) => {
    const { id, room_code } = params;
    let config = CONFIG_({ url: post + '/update-publish/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_CONTENT_ROOM', id: id });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          successnotify('Content has been updated !');
          dispatch(actDetailDataRoom({ id: room_code }));
          return dispatch(actDetailDataContent({ id: id }));
        }
        return dispatch({ type: 'ERROR_CONTENT_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_CONTENT_ROOM', message: 'Network error..' });
      });
  };
};

export const actDetailDataContent = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_CONTENT_ROOM', id: id });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'DETAIL_CONTENT_ROOM',
            message: 'Success get data',
            id: id,
            data: data,
          });
        }
        return dispatch({ type: 'ERROR_CONTENT_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_CONTENT_ROOM', message: 'Network error..' });
      });
  };
};

export const actDeleteDataContent = (params) => {
  return (dispatch) => {
    const { id, room_code } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_CONTENT_ROOM', id: id });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          successnotify('Content has been delete!');
          dispatch(actDetailDataRoom({ id: room_code }));

          return dispatch({
            type: 'DETAIL_CONTENT_ROOM',
            message: 'Success get data',
            id: id,
            data: {},
          });
        }
        return dispatch({ type: 'ERROR_CONTENT_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_CONTENT_ROOM', message: 'Network error..' });
      });
  };
};
