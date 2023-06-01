import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useCreateInventions, useInventionList, useInventionsDetail, useUpdateInventions } from '../../hooks/inventions';
import { useDepartmentList } from '../../hooks/departments';
import Select from 'react-select';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useStaffList } from '../../hooks/staffs';
import { POSITION_STAFF, TYPE_INVENTIONS, YEAR_ID, SEMESTER } from '../../constants';
import { useYearList } from '../../hooks/year';
const role = [
  {
    label: "Tác giả chính",
    value: 0
  },
  {
    label: "Thành viên",
    value: 1
  },
];
function AddInvention() {
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const inventionId = searchParams.get('id');
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
           text-white '>{currentLocation.pathname == '/edit-invention' ? 'Cập Nhật bằng sáng chế/giải thưởng' : 'Thêm bằng sáng chế/giải thưởng'}</span></div>
          {currentLocation.pathname == '/edit-invention' ? <FormEdit inventionId={inventionId} /> : <FormCreate />}
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
    data: dataCreate } = useCreateInventions();
  const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
  staffs?.map(staff => {
    staff.label = staff.name
    staff.value = staff.id

    return staff;
  })
  const { data: { data: years = [] } = {}, isLoading: isLoadingYear } = useYearList();
  years?.map(year => {
    year.label = year.name
    year.value = year.id

    return year;
  })  
  const { data: departments } = useDepartmentList();
  departments?.data?.map(department => {
    department.label = department.name
    department.value = department.id
    return department;
  })

  const schema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập tên bẳng sáng chế/giải thưởng'),
    code: yup.string().required('Vui lòng nhập mã tên bẳng sáng chế/giải thưởng').min(4, "Mã tên bẳng sáng chế/giải thưởng không được nhỏ hơn 4 kí tự."),
    date_recognition: yup.date(),
    number_recognition: yup.string(),
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
      date_recognition: '',
      num_person: '',
      number_recognition: '',
      level: '',
      type_inventions: '',
      type: 3
    }
  })

  useEffect(() => {
    console.log(dataCreate);
    if (dataCreate) {
      navigate('/invention-list');
    }
  }, [isSuccess]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-scientific-articles'
          onSubmit={handleSubmit((values) => {
            console.log(values);
            mutate(values)
          })}
        >
          <div className="col-span-full mb-2.5">
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã bằng sáng chế/giải thưởng</label>
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
          <div className="col-span-full mb-2.5">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên bằng sáng chế/giải thưởng</label>
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

          <div className="col-span-full mb-2.5">
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Tác giả</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="roleSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    name="role"
                    isMulti
                    id="role"
                    value={value}
                    placeholder="Lựa chọn"
                    {...register('role')}
                    onChange={(val) => {
                      onChange();
                      let rol = val.map(item => item.value).join(',')
                      setValue('role', rol)
                    }}
                  />
                )}
              />
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="date_recognition" className="block text-sm font-medium leading-6 text-gray-900">Ngày QĐ công nhận</label>
            <div className="mt-2">
              <input
                type="date"
                name="date_recognition"
                id="date_recognition"
                autoComplete="date_recognition"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('date_recognition', { required: true })}
              />
              {errors.date_recognition && <p className="text-red-500">{errors.date_recognition.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="number_recognition" className="block text-sm font-medium leading-6 text-gray-900">Số QĐ công nhận</label>
            <div className="mt-2">
              <input
                type="text"
                name="number_recognition"
                id="number_recognition"
                autoComplete="number_recognition"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('number_recognition', { required: true })}
              />
              {errors.number_recognition && <p className="text-red-500">{errors.number_recognition.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="type_inventions" className="block text-sm font-medium leading-6 text-gray-900">Giải thưởng</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="type_inventions"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={TYPE_INVENTIONS}
                    value={value}
                    name="type_inventions"
                    id="type_inventions"
                    placeholder="Lựa chọn"
                    {...register('type_inventions')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("type_inventions", val.value);
                    }}
                  />
                )}
              />
              {errors.type_inventions && <p className="text-red-500">{errors.type_inventions.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="year_id" className="block text-sm font-medium leading-6 text-gray-900">Năm học</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="year_id"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={years}
                    id="year_id"
                    placeholder="Lựa chọn"
                    {...register('year_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("year_id", val.value);
                    }}
                  />
                )}
              />
              {errors.year_id && <p className="text-red-500">{errors.year_id.message}</p>}
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

function FormEdit({ inventionId }) {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useUpdateInventions(inventionId);

  const { data: dataInvention } = useInventionsDetail(inventionId);
  const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
  staffs?.map(staff => {
    staff.label = staff.name
    staff.value = staff.id

    return staff;
  });
  const { data: { data: years = [] } = {}, isLoading: isLoadingYear } = useYearList();
  years?.map(year => {
    year.label = year.name
    year.value = year.id

    return year;
  })
  dataInvention?.users?.map(user => {
    user.label = user.name
    user.value = user.id

    return user;
  });
  const { data: { data: departments = [], total } = {}, isLoading: isLoadingDepartment } = useDepartmentList();
  departments?.map(department => {
    department.label = department.name
    department.value = department.id

    return department;
  });
  dataInvention?.users?.map(user => {
    user.label = user.name
    user.value = user.id

    return user;
  });
  const schema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập tên bẳng sáng chế/giải thưởng'),
    code: yup.string().required('Vui lòng nhập mã tên bẳng sáng chế/giải thưởng').min(4, "Mã tên bẳng sáng chế/giải thưởng không được nhỏ hơn 4 kí tự."),
    date_recognition: yup.date(),
    number_recognition: yup.string(),
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
      navigate('/invention-list');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (dataInvention) {
      reset({
        ...dataInvention,
        password: '',
        departmentSelected: departments?.find(department => department.id === dataInvention.department_id),
        positionSelected: POSITION_STAFF.find(position => position.value == dataInvention.position),
        yearSelected: years?.find((year) => year.id == dataInvention.year_id),
        roleSelected: dataInvention?.users,
        role: dataInvention?.users?.map(user => user.id).join(','),
        type_inventionsSelected: TYPE_INVENTIONS.find(invention => invention.value == dataInvention.level),
        type: 3
      })
    }
  }, [dataInvention]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-scientific-articles'
          onSubmit={handleSubmit((values) => {
            console.log(values);
            mutate(values)
          })}
        >
          <div className="col-span-full mb-2.5">
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã bằng sáng chế/giải thưởng</label>
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
          <div className="col-span-full mb-2.5">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên bằng sáng chế/giải thưởng</label>
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

          <div className="col-span-full mb-2.5">
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Tác giả</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="roleSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    name="role"
                    isMulti
                    id="role"
                    value={value}
                    placeholder="Lựa chọn"
                    {...register('role')}
                    onChange={(val) => {
                      onChange();
                      let rol = val.map(item => item.value).join(',')
                      setValue('role', rol);
                    }}
                  />
                )}
              />
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="date_recognition" className="block text-sm font-medium leading-6 text-gray-900">Ngày QĐ công nhận</label>
            <div className="mt-2">
              <input
                type="date"
                name="date_recognition"
                id="date_recognition"
                autoComplete="date_recognition"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('date_recognition', { required: true })}
              />
              {errors.date_recognition && <p className="text-red-500">{errors.date_recognition.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="number_recognition" className="block text-sm font-medium leading-6 text-gray-900">Số QĐ công nhận</label>
            <div className="mt-2">
              <input
                type="text"
                name="number_recognition"
                id="number_recognition"
                autoComplete="number_recognition"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('number_recognition', { required: true })}
              />
              {errors.number_recognition && <p className="text-red-500">{errors.number_recognition.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="type_inventionsSelected" className="block text-sm font-medium leading-6 text-gray-900">Giải thưởng</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="type_inventionsSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={TYPE_INVENTIONS}
                    value={value}
                    name="type_inventions"
                    id="type_inventions"
                    placeholder="Lựa chọn"
                    {...register('type_inventions')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("type_inventions", val.value);
                    }}
                  />
                )}
              />
              {errors.type_inventions && <p className="text-red-500">{errors.type_inventions.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="year_id" className="block text-sm font-medium leading-6 text-gray-900">Năm học</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="yearSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={years}
                    value={value}
                    id="year_id"
                    placeholder="Lựa chọn"
                    {...register('year_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("year_id", val.value);
                    }}
                  />
                )}
              />
              {errors.year_id && <p className="text-red-500">{errors.year_id.message}</p>}
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

export default AddInvention;
