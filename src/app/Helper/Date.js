import moment from 'moment';

export const convertDate = (date, format = 'MMMM Do YYYY, h:mm:ss a') => {
  return moment(date).format(format);
};
