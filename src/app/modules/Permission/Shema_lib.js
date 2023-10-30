const defaultState = {
  status: 'default',
  data: [],
  code: 500,
  message: '',
  id: '',
};

let response = {};
const Shema_lib = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SUCCESS_SHEMA_PERMISSION':
      response = {
        ...state,
        data: action.data ? action.data : {},
        code: action.code ? action.code : 500,
        status: 'success',
        id: action.id ? action.id : '',
        message: action.message ? action.message : '',
      };

      break;
    case 'LOADING_SHEMA_PERMISSION':
      response = {
        ...state,
        id: action.id ? action.id : '',
        status: 'loading',
      };
      break;
    case 'ERROR_SHEMA_PERMISSION':
      response = {
        ...state,
        status: 'error',
        message: action.message ? action.message : '',
        code: action.code ? action.code : 500,
      };
      break;
    default:
      return {
        ...state,
      };
  }

  return response;
};

export default Shema_lib;
