import axios from 'axios';
import { BASE_URL } from '../constants';

import {
  LoginProps,
  LoginResponse,
  RegisterProps,
  RegisterResponse,
  UserInfoProps,
  UserInfoResponse,
} from './Authtypes';

export const register = async (
  props: RegisterProps,
): Promise<RegisterResponse> => {
  return axios
    .post(`${BASE_URL}/auth/register`, props)
    .then((response) => response.data);
}; // успешно 201

export const login = async (props: LoginProps): Promise<LoginResponse> => {
  return axios
    .post(`${BASE_URL}/auth/login`, props)
    .then((response) => response.data);
}; //успешно 200

export const getUserInfo = async (
  props: UserInfoProps,
): Promise<UserInfoResponse> => {
  return axios
    .get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    })
    .then((response) => response.data);
};
