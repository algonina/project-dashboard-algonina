const defaultState = {
  status: 'default',
  data: [],
  code: 500,
  message: '',
};

let response = {};
const Auth_lib = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SUCCESS_AUTH':
      response = {
        ...state,
        data: action.data ? action.data : {},
        code: action.code ? action.code : 500,
        status: 'success',

        message: action.message ? action.message : '',
      };

      break;
    case 'LOADING_AUTH':
      response = {
        ...state,
        status: 'loading',
      };
      break;
    case 'ERROR_AUTH':
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

export default Auth_lib;
