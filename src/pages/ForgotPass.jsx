import React, { useEffect } from 'react'
import { useSendMail } from '../hooks/useRefreshToken'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useSendMail();

  const schema = yup.object().shape({
    email: yup.string().trim().required('Vui lòng nhập email').matches(
      /^([a-z0-9_+.-]+)(\.[a-z0-9_-]+)*@([a-z0-9_-]+\.)+[a-z]{2,6}$/,
      "Email không đúng định dạng"
    ).max(191, 'Email không quá 191 kí tự'),
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
    }
  })

  useEffect(() => {
    console.log(dataCreate);
    if (dataCreate?.data.success) {
      toast.success('Gửi mail thành công!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate('/');
    }
  }, dataCreate);
  return (
    <div className='h-screen flex justify-center items-center max-w-[400px] w-full m-auto'>
      <form
        className='w-full p-4'
        name='send-mail'
        onSubmit={handleSubmit(values => mutate(values))}
      >
        <h2 className='text-4xl font-bold text-center py-8 text-blue-600'>Quên Mật Khẩu</h2>
        <p className='text-sm'>Vui lòng nhập lại email đã đăng kí để lấy lại mật khẩu của bạn!</p>
        <div className='flex flex-col py-2'>
          <input className='text-sm border border-white' type="text" placeholder='Email' {...register('email')} />
        </div>
        <button type='submit' className='border w-full mt-5 mb-2 py-2 bg-blue-600 hover:bg-white hover:text-blue-600 hover:border-blue-600 rounded-full text-white font-bold'>Gửi email</button>
        <div className='text-sm text-center'>
          <a href='/' className='underline'>Quay lại</a>
        </div>
      </form>
    </div>
  )
}