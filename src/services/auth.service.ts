import axios from "axios";
import http from "axios";
import { AuthResponse } from "../models/auth/auth-response";
import { AuthUser } from "../models/auth/auth-user";
import { AuthRegister } from "../models/auth/auth-register";

export const ACCESS_TOKEN_KEY = 'access_token_medix';
export const USER_ID_KEY = 'user_id_medix';

const authUrl = `${process.env.REACT_APP_API_URL}/api/auth`;

export const setTokenForHttpClient = (token: string) => {
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

export const getToken = async (authUser: AuthUser): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(`${authUrl}/login`, authUser);
    return data;
}

export const registerUser = async (registerUser: AuthRegister): Promise<any> => {
  const { data } = await axios.post(`${authUrl}/register`, registerUser);
  return data;
}