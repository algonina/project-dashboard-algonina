const defaultState = {
  status: 'default',
  data: [],
  code: 500,
  message: '',
  id: '',
  detail: {},
};

let response = {};
const Typeuser_lib = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SUCCESS_TYPEUSER_TYPEUSER':
      response = {
        ...state,
        data: action.data ? action.data : [],
        code: action.code ? action.code : 500,
        status: 'success',
        message: action.message ? action.message : '',
      };

      break;
    case 'LOADING_TYPEUSER_TYPEUSER':
      response = {
        ...state,
        status: 'loading',
        id: action.id ? action.id : '',
        detail: {},
      };
      break;
    case 'DETAIL_TYPEUSER_TYPEUSER':
      response = {
        ...state,
        status: 'detail',
        detail: action.data ? action.data : {},
        code: action.code ? action.code : 500,
      };
      break;
    case 'ERROR_TYPEUSER_TYPEUSER':
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

export default Typeuser_lib;
