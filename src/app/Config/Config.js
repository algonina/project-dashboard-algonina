export const ENDPOINT = process.env.REACT_APP_ENDPOINT;
export const CUSTOME_ID = '';

export const __userID = (key = 'access_token') => {
  return getSessionID(key);
};

function getSessionID(key) {
  return localStorage.getItem(key);
}
export const HEADER = {
  apiKey: process.env.REACT_APP_API_KEY,
  Authorization: `Bearer ` + __userID('access_token'),
};
export const AUTH = {
  auth: {
    username: 'algonina_dev',
    password: 'uUuIUOXBmfGeXBqpIlJUchkEch0YjL5nf8wEGOZH',
  },
};
// IDEA: FALSE IS LOCALHOST, TRUE IS ENDPOINT
// !parseInt(process.env.REACT_APP_API_LIVE)

export const CONFIG_ = ({
  url = '',
  method = 'GET',
  data = {},
  port = '8000',
  live = true,
  headers = {},
  path = '',
}) => {
  if (__userID()) {
    return {
      url: ENDPOINT + path + url,
      data: data,
      method: method,
      headers: {
        ...HEADER,
        ...headers,
      },
    };
    // ...AUTH
  }
  return {
    url: ENDPOINT + path + url,
    data: data,
    method: method,
    headers: {
      ...HEADER,
      ...headers,
    },
  };
};
