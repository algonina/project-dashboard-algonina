import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const option = {
  title: 'Confirm to submit',
  message: 'Are you sure to do this.',
  buttons: [
    {
      label: 'Yes',
      onClick: () => alert('Click Yes'),
    },
    {
      label: 'No',
      onClick: () => alert('Click No'),
    },
  ],
};

export const Confirm = (newOption = {}) => {
  var confrimOption = {
    ...option,
    ...newOption,
  };
  confirmAlert(confrimOption);
};
