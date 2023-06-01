import React, { useContext, useEffect } from 'react'
// import loginImg from '../images/logohv.png'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { setDefaultHeaders } from '../config/axios';
import { UserContext } from '../context/userInfo';
import useRefreshToken from '../hooks/useRefreshToken';
import { toast } from 'react-toastify';

export default function Login() {
    const navigate = useNavigate();
    const refreshToken = useRefreshToken();
    const { setUser } = useContext(UserContext);
    const { mutate,
        isSuccess,
        isLoading,
        error,
        data: dataLogin } = useLogin();
    const schema = yup.object().shape({
        username: yup.string().trim().required('Email là bắt buộc'),
        password: yup.string().required('Mật khẩu là bắt buộc.'),
    })
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        model: 'onChange'
    })

    useEffect(() => {
        if (dataLogin?.success) {
            toast.success('Đăng nhập thành công!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(dataLogin.user, {...dataLogin.user});
            setDefaultHeaders({
                Authorization: 'Bearer ' + dataLogin.accessToken,
            });
            localStorage.setItem('user', JSON.stringify(dataLogin.user));
            localStorage.setItem('accessToken', dataLogin.accessToken);
            localStorage.setItem('refreshToken', dataLogin.refreshToken);
            setUser({
                ...dataLogin.user,
                accessToken: dataLogin.accessToken,
                refreshToken: dataLogin.refreshToken,
            });
            navigate('/dashboard');
        }
    }, [dataLogin])

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/dashboard');
        }
    }, [])

    return (
        <div className='relative h-screen flex justify-center items-center max-w-[400px] w-full m-auto'>
            <div
                className="absolute max-h-[400px] m-auto inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <form onSubmit={handleSubmit((data) => {
                mutate(data)
            })} className='relative bg-white w-full p-4 rounded-3xl'>
                <h2 className='text-4xl font-bold text-center py-8 text-blue-600'>LOGIN</h2>
                <div className='flex flex-col py-2'>
                    <input className='text-sm border border-gray-200' required type="text" placeholder='Email'  {...register('username', { required: true })} />
                </div>
                <div className='flex flex-col py-2'>

                    <input className='text-sm border border-gray-200' required type="password" placeholder='Mật Khẩu' {...register('password', { required: true })} />
                </div>
                <button type='submit' className='border w-full mt-5 mb-2 py-2 bg-blue-600 hover:bg-white hover:text-blue-600 hover:border-blue-600 rounded-full text-white font-bold'>
                    Đăng Nhập</button>
                <div className='text-sm '>
                    <a href='/forgotpassword' className='underline'>Quên mật khẩu</a>
                </div>
            </form>
        </div>
    )
}