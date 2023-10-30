import { toast } from 'react-toastify';

const defaultnotify = () =>
  toast('Welcome Back! This is a Toast Notification', {
    position: 'top-right',
    hideProgressBar: true,
    className: 'bg-primary text-white',
  });

const successnotify = (message) =>
  toast(message, {
    position: 'top-right',
    hideProgressBar: true,
    closeOnClick: false,
    className: 'bg-success text-white',
  });

const warningnotify = (message) =>
  toast(`${message}`, {
    position: 'top-right',
    hideProgressBar: true,
    closeOnClick: false,
    className: 'bg-warning text-white',
  });

const errornotify = (message) =>
  toast(message || 'Error ! An error occurred.', {
    position: 'top-right',
    hideProgressBar: true,
    closeOnClick: false,
    className: 'bg-danger text-white',
  });

export { defaultnotify, successnotify, warningnotify, errornotify };
