import { CONNECTION } from '../../config/Connections';
import { CONFIG_ } from '../../config/Config';

var get = '/content-mark';
var post = '/content-mark';
export const actGetDataMark = () => {
  return (dispatch) => {
    let config = CONFIG_({ url: get, method: 'GET' });
    dispatch({ type: 'LOADING_MARK_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          return dispatch({
            type: 'SUCCESS_MARK_ROOM',
            message: 'Success get data',
            data: data,
            code: status,
          });
        }
        return dispatch({ type: 'ERROR_MARK_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MARK_ROOM', message: 'Network error..' });
      });
  };
};

export const actPostDataMark = (params) => {
  return (dispatch) => {
    let config = CONFIG_({ url: post, data: params, method: 'POST' });
    dispatch({ type: 'LOADING_MARK_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch(actGetDataMark());
        }
        return dispatch({ type: 'ERROR_MARK_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MARK_ROOM', message: 'Network error..' });
      });
  };
};

export const actUpdateDataMark = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, data: params, method: 'PUT' });
    dispatch({ type: 'LOADING_MARK_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_MARK_ROOM', message: 'Success put data' });
        }
        return dispatch({ type: 'ERROR_MARK_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MARK_ROOM', message: 'Network error..' });
      });
  };
};

export const actDetailDataMark = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'GET' });
    dispatch({ type: 'LOADING_MARK_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_MARK_ROOM', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_MARK_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MARK_ROOM', message: 'Network error..' });
      });
  };
};

export const actDeleteDataMark = (params) => {
  return (dispatch) => {
    const { id } = params;
    let config = CONFIG_({ url: post + '/' + id, method: 'DELETE' });
    dispatch({ type: 'LOADING_MARK_ROOM' });
    CONNECTION(config)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          return dispatch({ type: 'SUCCESS_MARK_ROOM', message: 'Success get data' });
        }
        return dispatch({ type: 'ERROR_MARK_ROOM', message: 'failed' });
      })
      .catch((response) => {
        console.log(response);
        return dispatch({ type: 'ERROR_MARK_ROOM', message: 'Network error..' });
      });
  };
};
