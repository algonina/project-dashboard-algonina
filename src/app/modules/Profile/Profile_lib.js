const defaultState = {
  status: 'default',
  data: [],
  code: 500,
  message: '',
  auth: false,
  access_token: localStorage.getItem('access_token'),
};

let response = {};
const Profile_lib = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SUCCESS_PROFILE_PROFILE':
      response = {
        ...state,
        data: action.data ? action.data : {},
        code: action.code ? action.code : 500,
        status: 'success',
        auth: true,
        message: action.message ? action.message : '',
      };

      break;
    case 'LOADING_PROFILE_PROFILE':
      response = {
        ...state,
        status: 'loading',
      };
      break;
    case 'ERROR_PROFILE_PROFILE':
      response = {
        ...state,
        status: 'success',
        auth: false,
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

export default Profile_lib;
