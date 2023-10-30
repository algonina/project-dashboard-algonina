export const __openModal = (data) => {
  if (data) {
    return (dispatch) => {
      return dispatch({
        type: 'MODAL_SUCCESS',
        modal: data.modal,
        open: data.open,
        data: data.data ? data.data : [],
      });
    };
  }
};
