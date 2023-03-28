import axios from 'axios';
import {apiVersion, siteUrl} from '../constants';

const instance = axios.create({
  baseURL: siteUrl + '/api/',
});

export const getClientObjects = (tbl: string) => {
  return instance
    .get('client' + apiVersion + '/object/' + tbl)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const getPhoneVerify = (phone: string, code: string, type: string) => {
  return instance
    .post('users/' + type + '/verify', {
      phone: phone,
      code: code,
    })
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const loginCheck = (login: string) => {
  return instance
    .post('users/valid', {
      login: login,
    })
    .then(res => {
      return true;
    })
    .catch(err => {
      return false;
    });
};

export const getSMS = (phone: string, type: string) => {
  return instance
    .get('users/' + type + '/' + phone)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const userRegister = (
  login: string,
  psw: string | undefined,
  name: string | undefined,
  email: string | null | undefined,
  oktmo: string,
) => {
  return instance
    .post('users/signup', {
      login: login,
      psw: psw,
      name: name,
      email: email,
      oktmo: oktmo,
    })
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const loginRegister = (
  login: string,
  psw: string,
  type: string,
  model: string | undefined,
) => {
  return instance
    .post('users/auth', {
      login: login,
      psw: psw,
      type: type,
      model: model,
    })
    .then(res => {
      return true;
    })
    .catch(err => {
      return false;
    });
};

export const forgotPassword = (login: string, psw: string, code: string) => {
  return instance
    .post('users/forgot', {
      login: login,
      psw: psw,
      code: code,
    })
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const getBanners = (cmd: string) => {
  return instance
    .post('clientv7', {
      cmd: cmd,
    })
    .then(res => res.data)
    .catch(err => console.log(err));
};
