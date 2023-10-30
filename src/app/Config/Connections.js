import axios from 'axios';

// const timeout = {
//   timeout: 2000 * 5
// };

export const CONNECTION = async (config) => {
  return axios({ ...config })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err && err.response) {
        if (err.response.data.code === 401) {
          return {
            code: 401,
            message: 'Your session is not valid, please relogin!',
          };
        } else {
          return err.response.data;
        }
      }
      return { code: 500, message: 'Network error!!' };
    });
};
