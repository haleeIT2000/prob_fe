import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useResetPassword } from '../../hooks/useRefreshToken';
import { UserContext } from '../../context/userInfo';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useResetPassword();

  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const schema = yup.object().shape({
    password: yup.string().required('Mật khẩu không được bỏ trống'),
  })
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      token,
    }
  })

  useEffect(() => {
    console.log(dataCreate);
    if (dataCreate?.data.success) {
      toast.success('Đặt lại mật khẩu thành công!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem('user', JSON.stringify(dataCreate?.data.user));
      localStorage.setItem('accessToken', dataCreate?.data.accessToken);
      localStorage.setItem('refreshToken', dataCreate?.data.refreshToken);
      setUser({
        ...user, 
        ...dataCreate?.data.user,
      });
      navigate('/dashboard');
    } else {
      toast.error('Mã xác thực hết hạn!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [dataCreate]);

  return (
    <div className='h-screen flex justify-center items-center max-w-[400px] w-full m-auto'>
      <form
        className='w-full p-4'
        name='send-reset'
        onSubmit={handleSubmit(values => {
          mutate(values)
        })}
      >
        <h2 className='text-4xl font-bold text-center py-8 text-blue-600'>Đặt lại mật khẩu</h2>
        <p className='text-sm'>Nhập mật khẩu mới</p>
        <div className='flex flex-col py-2'>
          <input className='text-sm border border-white' type="password" placeholder='Mật khẩu' {...register('password')} />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button type='submit' className='border w-full mt-5 mb-2 py-2 bg-blue-600 hover:bg-white hover:text-blue-600 hover:border-blue-600 rounded-full text-white font-bold'>Gửi</button>
        <div className='text-sm text-center'>
          {/* <a href='/' className='underline'>Quay lại</a> */}
        </div>
      </form>
    </div>
  )
}