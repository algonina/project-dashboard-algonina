const defaultState = {
  status: 'default',
  data: [],
  code: 500,
  message: '',
  detail: {},
  id: '',
};

let response = {};
const Content_lib = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SUCCESS_CONTENT_ROOM':
      response = {
        ...state,
        data: action.data ? action.data : {},
        code: action.code ? action.code : 500,
        status: 'success',
        message: action.message ? action.message : '',
      };

      break;
    case 'DETAIL_CONTENT_ROOM':
      response = {
        ...state,
        detail: action.data ? action.data : {},
        code: action.code ? action.code : 500,
        id: action.id ? action.id : '',
        status: 'success',
        message: action.message ? action.message : '',
      };

      break;
    case 'LOADING_CONTENT_ROOM':
      response = {
        ...state,
        status: 'loading',
        id: action.id ? action.id : '',
      };
      break;
    case 'ERROR_CONTENT_ROOM':
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

export default Content_lib;
