import Querystring from 'querystring';
import { fetch } from '../utils/axios';

export function getHelloWorld() {
  return fetch({
    url: '/helloworld',
    method: 'get',
  });
}

export function postHelloWorld(result) {
  return fetch({
    url: '/helloworld',
    method: 'post',
    data: Querystring.stringify(result),
  }, 'application/x-www-form-urlencoded');
}

export default {};
