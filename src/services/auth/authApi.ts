import api from '../apiClient';
import {
  LoginProps,
  LoginResponse,
  RegisterProps,
  RegisterResponse,
  UserInfoResponse,
} from '../../types/authtypes';

const register = async (data: RegisterProps): Promise<RegisterResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
}; // успешно 201

const login = async (data: LoginProps): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
}; //успешно 200

const getUserInfo = async (): Promise<UserInfoResponse> => {
  const response = await api.get('/users/me');
  return response.data;
}; // успешно 201

export default {
  register,
  login,
  getUserInfo,
};
