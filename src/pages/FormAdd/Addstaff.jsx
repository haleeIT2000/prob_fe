import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useCreateStaff, useStaffDetail, useUpdateStaff } from '../../hooks/staffs';
import { useDepartmentList } from '../../hooks/departments';
import Select from 'react-select';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { POSITION_STAFF } from '../../constants';

function AddStaff() {
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const staffId = searchParams.get('id');
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
           text-white '>{currentLocation.pathname == '/edit-staff' ? 'Cập Nhật Nhân Viên' : 'Thêm Nhân Viên'}</span></div>
          {currentLocation.pathname == '/edit-staff' ? <FormEdit staffId={staffId} /> : <FormCreate />}
        </main>
      </div>
    </div>
  );
}

function FormCreate() {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error: errorStaff,
    data: dataCreate } = useCreateStaff();
  const { data: { data: departments = [], total } = {}, isLoading: isLoadingDepartment } = useDepartmentList();
  departments?.map(department => {
    department.label = department.name
    department.value = department.id

    return department;
  })
  const schema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập tên nhân viên').max(191, 'Tên không dài quá 191 kí tự'),
    email: yup.string().trim().required('Vui lòng nhập email').matches(
      /^([a-z0-9_+.-]+)(\.[a-z0-9_-]+)*@([a-z0-9_-]+\.)+[a-z]{2,6}$/,
      "Email không đúng định dạng"
    ).max(191, 'Email không quá 191 kí tự'),
    password: yup.string().min(8, "Mật khẩu không được nhỏ hơn 8 kí tự."),
    code: yup.string().required('Vui lòng nhập mã nhân viên').min(4, "Mã nhân viên không được nhỏ hơn 4 kí tự."),
    time_per_year: yup.number(),
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
      email: '',
      password: '',
      code: '',
      number_salary: '',
    }
  })

  useEffect(() => {
    if (dataCreate?.data.success) {
      navigate('/list-staff');
    } else {
      console.log("lỗi : ", dataCreate);
      console.log("lỗi staff: ", errorStaff);
    }
  }, [isSuccess]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-staff'
          onSubmit={handleSubmit((values) => {
            mutate(values)
          })}
        >
          <div className="col-span-full mb-2">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên Nhân Viên</label>
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
            <label htmlFor="department_id" className="block text-sm font-medium leading-6 text-gray-900">Phòng ban</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="category_id"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={departments}
                    name="department_id"
                    id="department_id"
                    placeholder="Lựa chọn"
                    {...register('department_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("department_id", val.id);
                    }}
                  />
                )}
              />

              {errors.department_id && <p className="text-red-500">{errors.department_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã nhân viên</label>
            <div className="mt-2">
              <input
                type="text"
                name="code"
                id="code"
                autoComplete="code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('code', { required: true })}
              />
              {errors.code && <p className="text-red-500">{errors.code.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div className="mt-2">
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('email', { required: true })}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Mật khẩu</label>
            <div className="mt-2">
              <input
                type="text"
                name="password"
                id="password"
                autoComplete="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('password', { required: true })}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">Vị trí</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="positionSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={POSITION_STAFF}
                    name="position"
                    id="position"
                    placeholder="Lựa chọn"
                    {...register('position')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("position", val.value);
                    }}
                  />
                )}
              />
              {errors.position && <p className="text-red-500">{errors.position.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="number_salary" className="block text-sm font-medium leading-6 text-gray-900">Hệ số lương</label>
            <div className="mt-2">
              <input
                type="number"
                name="number_salary"
                id="number_salary"
                autoComplete="number_salary"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('number_salary', { required: true })}
              />
              {errors.number_salary && <p className="text-red-500">{errors.number_salary.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="income" className="block text-sm font-medium leading-6 text-gray-900">Thu nhập</label>
            <div className="mt-2">
              <input
                type="text"
                name="income"
                id="income"
                autoComplete="income"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('income', { required: true })}
              />
              {errors.income && <p className="text-red-500">{errors.income.message}</p>}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button onClick={() => navigate(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormEdit({ staffId }) {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error: errorStaff,
    data: dataCreate } = useUpdateStaff(staffId);
  const { data: dataStaff } = useStaffDetail(staffId);
  const { data: { data: departments = [], total } = {}, isLoading: isLoadingDepartment } = useDepartmentList();
  departments?.map(department => {
    department.label = department.name
    department.value = department.id

    return department;
  })
  const schema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập tên nhân viên').max(191, 'Tên không dài quá 191 kí tự'),
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
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  })

  useEffect(() => {
    if (dataCreate?.data.success) {
      navigate('/list-staff');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (dataStaff) {
      reset({
        ...dataStaff,
        password: '',
        departmentSelected: departments?.find(department => department.id === dataStaff.department_id),
        positionSelected: POSITION_STAFF.find(position => position.value == dataStaff.position)
      })
    }
  }, [dataStaff]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-staff'
          onSubmit={handleSubmit((values) => {
            mutate(values)
          })}
        >
          <div className="col-span-full mb-2">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên Nhân Viên</label>
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
            <label htmlFor="department_id" className="block text-sm font-medium leading-6 text-gray-900">Phòng ban</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="departmentSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={departments}
                    name="department_id"
                    value={value}
                    id="department_id"
                    placeholder="Lựa chọn"
                    {...register('department_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("department_id", val.id);
                    }}
                  />
                )}
              />

              {errors.department_id && <p className="text-red-500">{errors.department_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã nhân viên</label>
            <div className="mt-2">
              <input
                type="text"
                name="code"
                id="code"
                autoComplete="code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('code', { required: true })}
              />
              {errors.code && <p className="text-red-500">{errors.code.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div className="mt-2">
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('email', { required: true })}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Mật khẩu</label>
            <div className="mt-2">
              <input
                type="text"
                name="password"
                id="password"
                autoComplete="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('password', { required: true })}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">Vị trí</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="positionSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={POSITION_STAFF}
                    name="position"
                    id="position"
                    value={value}
                    placeholder="Lựa chọn"
                    {...register('position')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("position", val.value);
                    }}
                  />
                )}
              />
              {errors.position && <p className="text-red-500">{errors.position.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="number_salary" className="block text-sm font-medium leading-6 text-gray-900">Hệ số lương</label>
            <div className="mt-2">
              <input
                type="number"
                name="number_salary"
                id="number_salary"
                autoComplete="number_salary"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('number_salary', { required: true })}
              />
              {errors.number_salary && <p className="text-red-500">{errors.number_salary.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="income" className="block text-sm font-medium leading-6 text-gray-900">Thu nhập</label>
            <div className="mt-2">
              <input
                type="text"
                name="income"
                id="income"
                autoComplete="income"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('income', { required: true })}
              />
              {errors.income && <p className="text-red-500">{errors.income.message}</p>}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button onClick={() => navigate(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStaff;