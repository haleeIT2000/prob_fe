import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useCreateThesis, useThesisDetail, useUpdateThesis } from '../../hooks/thesis';
import { useDepartmentList } from '../../hooks/departments';
import Select from 'react-select';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useStaffList } from '../../hooks/staffs';
import { POSITION_STAFF, TYPE_THESIS, YEAR_ID, SEMESTER } from '../../constants';
import { useCreateYear, useUpdateYear, useYearDelete, useYearDetail, useYearList } from '../../hooks/year';
function AddYear() {
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('id');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className='bg-white w-9/12 mx-auto p-8 shadow-md my-4'>
          <div className='py-5 mb-4 w-auto text-center'><span className='p-3 rounded-lg bg-slate-800 border
           text-white hover:text-slate-800 hover:bg-white hover:border-slate-800'>{currentLocation.pathname == '/edit-year' ? 'Cập Nhật năm học' : 'Thêm năm học'}</span></div>
          {currentLocation.pathname == '/edit-year' ? <FormEdit yearId={yearId} /> : <FormCreate />}
        </main>
      </div>
    </div>
  );
}
function FormCreate() {

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useCreateYear();
  const { data: { data: years = [] } = {}, isLoading: isLoadingYear } = useYearList();
  years?.map(year => {
    year.label = year.name
    year.value = year.id

    return year;
  })  
  const schema = yup.object().shape({
   // name: yup.string().trim().required('Tên năm học bắt buộc').matches(/^2[0-9]{3} - 2[0-9]{3}$/, 'Tên năm học không hợp lệ.'),
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
      name: '',
    }
  })

  useEffect(() => {
    console.log(dataCreate);
    if (dataCreate) {
      navigate('/list-year');
    }
  }, [isSuccess]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-thesis'
          onSubmit={handleSubmit((values) => {
            console.log(values);
            mutate(values)
          })}
        >
          <div className="col-span-full mb-2">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên năm học</label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('name', { required: true })}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">Ngày bắt đầu</label>
            <div className="mt-2">
              <input
                type="date"
                name="startDate"
                id="startDate"
                autoComplete="startDate"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('startDate', { required: true })}
              />
              {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">Ngày kết thúc</label>
            <div className="mt-2">
              <input
                type="date"
                name="endDate"
                id="endDate"
                autoComplete="endDate"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('endDate', { required: true })}
              />
              {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button onClick={() => navigate(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
          </div>
        </form>
      </div>

    </div>
  );
}
function FormEdit({ yearId }) {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useUpdateYear(yearId);

  const { data: dataYear } = useYearDetail(yearId);
  const { data: { data: years = [] } = {}, isLoading: isLoadingYear } = useYearList();
  years?.map(year => {
    year.label = year.name
    year.value = year.id

    return year;
  })
  const schema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập tên năm học'),
  })
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

  useEffect(() => {
    if (dataCreate?.data.success) {
      navigate('/list-year');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (dataYear) {
      reset({
        ...dataYear,
      })
    }
  }, [dataYear]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-year'
          onSubmit={handleSubmit((values) => {
            console.log(values);
            mutate(values)
          })}
        >
          
          <div className="col-span-full mb-2">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên năm học</label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('name', { required: true })}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">Ngày bắt đầu</label>
            <div className="mt-2">
              <input
                type="date"
                name="startDate"
                id="startDate"
                autoComplete="startDate"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('startDate', { required: true })}
              />
              {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">Ngày kết thúc</label>
            <div className="mt-2">
              <input
                type="date"
                name="endDate"
                id="endDate"
                autoComplete="endDate"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('endDate', { required: true })}
              />
              {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button onClick={() => navigate(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
          </div>
        </form>
      </div>

    </div>
  );
}
export default AddYear;