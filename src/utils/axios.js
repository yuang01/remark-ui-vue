import axios from 'axios';

export async function fetch(options) {
  const instance = await axios.create({
    baseURL: '/api/',
    timeout: 30 * 1000,
  });

  instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  instance.defaults.headers.get['Content-Type'] = 'application/json';
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  instance.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded';

  return instance(options);
}

export default {};
