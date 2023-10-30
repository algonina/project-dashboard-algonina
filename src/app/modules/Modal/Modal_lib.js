const initialState = {
  dataModal: [],
};

let response = {};

const Modal_lib = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'MODAL_SUCCESS':
      response = {
        ...state,
        [action.modal ? action.modal : 'modal_1']: action.open ? action.open : false,
        dataModal: action.data ? action.data : [],
      };
      break;
    case 'ERROR_MODAL':
      response = {
        ...state,
      };
      break;
    default:
      return state;
  }

  return response;
};

export default Modal_lib;
