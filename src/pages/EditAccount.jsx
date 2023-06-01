import React, { useContext, useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { UserContext } from '../context/userInfo';
import { useStaffDetail, useUpdateStaff } from '../hooks/staffs';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { POSITION_STAFF } from '../constants';
import moment from 'moment/moment';
import { useUpdatePassword } from '../hooks/useRefreshToken';
import { toast } from 'react-toastify';

function EditAccount() {
    const { user } = useContext(UserContext)
    const { setUser } = useContext(UserContext);
    const { data: dataUser } = useStaffDetail(user?.id)
    const [avatar, setAvatar] = useState('');

    const { mutate,
        isSuccess,
        isLoading,
        error,
        data: dataUpdate } = useUpdateStaff(user?.id);
    const { mutate: mutatePass,
        isSuccess: isSuccessPass,
        isLoading: isLoadingPass,
        error: errorPass,
        data: dataUpdatePass } = useUpdatePassword();
    const schema = yup.object().shape({});
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isSubmitted, errors },
        setValue,
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    })
    const {
        register: registerFormPass,
        handleSubmit: handleSubmitFormPass,
        formState: { isSubmittingFormPass, isSubmittedFormPass, errorsFormPass },
        setValue: setValueFormPass,
        control: controlFormPass,
        reset: resetFormPass,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    })

    useEffect(() => {
        if (dataUser) {
            setAvatar({ preview: dataUser.avatar });
            reset({
                ...dataUser,
                position: POSITION_STAFF.find(position => position.value == dataUser.position)?.label,
                birthday: moment(dataUser.birthday).format("YYYY-MM-DD"),
            }),
                resetFormPass({
                    email: dataUser.email,
                })
        }
    }, [dataUser])
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        if (dataUpdate?.data) {
            localStorage.setItem('user', JSON.stringify(dataUpdate.data))
            setUser(dataUpdate.data);
        }
    }, [dataUpdate])
    useEffect(() => {
        if (dataUpdatePass) {
            console.log(errorPass);
            toast.success('Đổi mật khẩu thành công!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [dataUpdatePass])
    const handleSubmitInfo = (values) => {
        console.log(values);

        let formData = new FormData();
        let file = values.avatarUpload[0];

        formData.append('avatar', file);
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('birthday', values.birthday);

        mutate(formData)
    }
    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="my-10 mx-auto container max-w-2xl md:w-3/4 shadow-md">
                        {/* <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
                            <div className="max-w-sm mx-auto md:w-full md:mx-0">
                                <div className="inline-flex items-center space-x-4">
                                    <img
                                        className="w-10 h-10 object-cover rounded-full"
                                        alt="User avatar"
                                        src={dataUser?.avatar}
                                    />
                                    <h1 className="text-gray-600">{dataUser?.name}</h1>
                                </div>
                            </div>
                        </div> */}
                        <div className="bg-white space-y-6 pt-4">
                            <form
                                name='update-staff'
                                onSubmit={handleSubmit((values) => {
                                    handleSubmitInfo(values);
                                })}>
                                <div className='mt-4 flex justify-center'>
                                    <label htmlFor='avatarUpload'>
                                        <img
                                            className="w-[180px] h-[180px] object-cover rounded-full"
                                            alt="User avatar"
                                            src={avatar.preview}
                                        />
                                    </label>
                                    <input type="file" hidden id='avatarUpload' name='avatarUpload' {...register('avatarUpload')} onChange={(e) => {
                                        if (e.target.files.length) {
                                            setAvatar({
                                                preview: URL.createObjectURL(e.target.files[0]),
                                                raw: e.target.files[0],
                                            });
                                        }
                                    }} />
                                </div>
                                <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
                                    <h2 className="md:w-1/3 mx-auto max-w-sm">Tài khoản</h2>
                                    <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                                        <div>
                                            <label className="text-sm text-gray-400">Email</label>
                                            <div className="w-full inline-flex border">

                                                <input
                                                    type="email"
                                                    name='email'
                                                    className="w-full focus:outline-none focus:text-gray-600 p-2"
                                                    placeholder="email"
                                                    {...register('email')}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400">Mã nhân viên</label>
                                            <div className="w-full inline-flex border">
                                                <input
                                                    type="text"
                                                    className="w-full bg-slate-100 focus:outline-none focus:text-gray-600 p-2"
                                                    placeholder="Mã nhân viên"
                                                    {...register('code')}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />
                                <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
                                    <h2 className="md:w-1/3 mx-auto max-w-sm">Thông tin cá nhân</h2>
                                    <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                                        <div>
                                            <label className="text-sm text-gray-400">Họ Tên</label>
                                            <div className="w-full inline-flex border">

                                                <input
                                                    type="text"
                                                    className="w-full bg-slate-100 focus:outline-none focus:text-gray-600 p-2"
                                                    placeholder="Tên nhân viên"
                                                    {...register('name')}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="text-sm text-gray-400">Học hàm/học vị</label>
                                            <div className="w-full inline-flex border">

                                                <input
                                                    type="text"
                                                    className="w-full focus:outline-none focus:text-gray-600 p-2"
                                                    placeholder="Học hàm/học vị"
                                                    {...register('degree')}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400">Chức vụ</label>
                                            <div className="w-full inline-flex border">

                                                <input
                                                    type="text"
                                                    className="w-full focus:outline-none focus:text-gray-600 p-2"
                                                    placeholder="Chức vụ"
                                                    {...register('position')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full p-4 text-right text-gray-500">
                                    <button type='submit' className='bg-blue-600 rounded-md p-2 text-white'>
                                        Cập nhật
                                    </button>
                                </div>
                            </form>

                            <hr />
                            <form
                                name='updatePass'
                                onSubmit={handleSubmitFormPass((values) => {
                                    mutatePass(values);
                                })}
                            >
                                <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
                                    <h2 className="md:w-4/12 max-w-sm mx-auto">Thay đổi mật khẩu</h2>

                                    <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 pl-2">
                                        <div className="w-full inline-flex border-b">
                                            <input
                                                type="password"
                                                className="w-full focus:outline-none focus:text-gray-600 p-2"
                                                placeholder="Mật khẩu cũ"
                                                {...registerFormPass('password')}
                                            />
                                        </div>
                                        <div className="w-full inline-flex border-b">

                                            <input
                                                type="newPassword"
                                                className="w-full focus:outline-none focus:text-gray-600 p-2"
                                                placeholder="Mật khẩu mới"
                                                {...registerFormPass('newPassword')}
                                            />
                                        </div>
                                        <div className="w-full inline-flex border-b">

                                            <input
                                                type="confirmPassword"
                                                className="w-full focus:outline-none focus:text-gray-600 p-2"
                                                placeholder="Nhập lại khẩu mới"
                                                {...registerFormPass('confirmPassword')}
                                            />
                                        </div>
                                    </div>

                                    <div className="md:w-3/12 text-center md:pl-6">
                                        <button className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-blue-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right">
                                            <svg
                                                fill="none"
                                                className="w-4 text-white mr-2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                />
                                            </svg>
                                            Cập nhật
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <hr />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
};

export default EditAccount;