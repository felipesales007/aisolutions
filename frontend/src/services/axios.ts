import axios from 'axios';

const { BASE_URL, VITE_APP_MODO, VITE_APP_BASE_URL } = import.meta.env;
let baseURL = BASE_URL;

if (VITE_APP_MODO === 'preview') {
  baseURL = `${VITE_APP_BASE_URL}/preview`;
} else if (VITE_APP_MODO === 'test') {
  baseURL = `${VITE_APP_BASE_URL}/api`;
} else {
  baseURL = '/api';
}

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    const rewrite = config;
    const url = rewrite.url as string;

    if (VITE_APP_MODO === 'preview' && url.search('.json') === -1) {
      const split = url.split('?');

      if (split.length > 1) {
        rewrite.url = `${split[0]}.json`;
      } else {
        rewrite.url += '.json';
      }
    }

    return rewrite;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const logout = 'token';
    const hash = location.hash.includes('#');

    if (error.response?.status === 403) {
      location.hash = hash ? `#/${logout}` : `/${logout}`;
    }

    return Promise.reject(error);
  },
);

export default instance;
