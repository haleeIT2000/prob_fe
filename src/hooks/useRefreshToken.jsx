import { useContext } from 'react';
import axios from '../config/axios';
import { UserContext } from '../context/userInfo';
import { useRefresh } from './useAuth';
import API from '../constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useRefreshToken = () => {
  const { setUser } = useContext(UserContext)
  
  const refreshToken = async () => {
    const res = await axios.get(`${API.API_ROOT}${API.AUTH.REFRESH}`);

    setUser(prev => {
      console.log(prev.accessToken);
      console.log(res.data.accessToken);
      return {
      ...prev,
        accessToken: res.data.accessToken,
      };
    });

    return res.data.accessToken;
  }
  return refreshToken;
}

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  return useMutation(
      async (data) => {
          return await axios.post(`${API.API_ROOT}${API.AUTH.CHANGE_PASSWORD}`, data);
      },
      {
          onSuccess: () => {
              // queryClient.invalidateQueries(ARTICLE_LIST);
          },
      }
  );
}

export const useSendMail = () => {
  const queryClient = useQueryClient();
  return useMutation(
      async (data) => {
          return await axios.post(`${API.API_ROOT}${API.AUTH.SEND_MAIL}`, data);
      },
      {
          onSuccess: () => {
              // queryClient.invalidateQueries(ARTICLE_LIST);
          },
      }
  );
}

export const useResetPassword = () => {
  const queryClient = useQueryClient();
  return useMutation(
      async (data) => {
          return await axios.post(`${API.API_ROOT}${API.AUTH.RESET_PASSWORD}`, data);
      },
      {
          onSuccess: () => {
              // queryClient.invalidateQueries(ARTICLE_LIST);
          },
      }
  );
}

export default useRefreshToken;