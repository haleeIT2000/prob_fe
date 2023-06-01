import { useMutation } from "@tanstack/react-query"
import axios from '../config/axios';
import { API_ROOT } from "../constants/api";
import API from '../constants/api';

export const useLogin = () => {
  return useMutation(async (data) => {
    const res = await axios.post(`${API.API_ROOT}${API.AUTH.LOGIN}`, data);

    return res.data;
  })
}

export const useRefresh = () => {
  return useMutation(async () => {
    const res = await axios.get(`${API.API_ROOT}${API.AUTH.REFRESH}`);

    return res.data;
  })
}

export const useLogout = () => {
  return useMutation(async () => {
    const res = await axios.post(`${API.API_ROOT}${API.AUTH.LOGOUT}`);

    return res.data;
  })
}