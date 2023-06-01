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
import { useYearList } from '../../hooks/year';
function AddThesis() {
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const thesisId = searchParams.get('id');
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
           text-white '>{currentLocation.pathname == '/edit-thesis' ? 'Cập Nhật luận án/luận văn' : 'Thêm luận án/luận văn'}</span></div>
          {currentLocation.pathname == '/edit-thesis' ? <FormEdit thesisId={thesisId} /> : <FormCreate />}
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
    data: dataCreate } = useCreateThesis();
  const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
  staffs?.map(staff => {
    staff.label = staff.name
    staff.value = staff.id

    return staff;
  })
  const { data: departments } = useDepartmentList();
  departments?.data?.map(department => {
    department.label = department.name
    department.value = department.id

    return department;
  })
  const { data: { data: years = [] } = {}, isLoading: isLoadingYear } = useYearList();
  years?.map(year => {
    year.label = year.name
    year.value = year.id

    return year;
  })  
  const schema = yup.object().shape({
    name_student: yup.string().trim().required('Vui lòng nhập tên sinh viên'),
    // code: yup.string().required('Vui lòng nhập mã đề tài').min(4, "Mã đề tài không được nhỏ hơn 4 kí tự."),
    course: yup.string(),
    // number_recognition: yup.string(),
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
      name_student: '',
      num_person: '',
      // number_recognition: '',
      type_thesis: '',
    }
  })

  useEffect(() => {
    console.log(dataCreate);
    if (dataCreate) {
      navigate('/list-thesis');
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
            <label htmlFor="name_student" className="block text-sm font-medium leading-6 text-gray-900">Họ tên nghiên cứu sinh </label>
            <div className="mt-2">
              <input
                type="text"
                name="name_student"
                id="name_student"
                autoComplete="name_student"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('name_student', { required: true })}
              />
              {errors.name_student && <p className="text-red-500">{errors.name_student.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_decision" className="block text-sm font-medium leading-6 text-gray-900">Số QĐ giao nhiệm vụ</label>
            <div className="mt-2">
              <input
                type="text"
                name="num_decision"
                id="num_decision"
                autoComplete="num_decision"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_decision', { required: true })}
              />
              {errors.num_decision && <p className="text-red-500">{errors.num_decision.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="course" className="block text-sm font-medium leading-6 text-gray-900">Khóa đào tạo</label>
            <div className="mt-2">
              <input
                type="text"
                name="course"
                id="course"
                autoComplete="course"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('course', { required: true })}
              />
              {errors.course && <p className="text-red-500">{errors.course.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_year" className="block text-sm font-medium leading-6 text-gray-900">Số năm làm luận án tiến sĩ</label>
            <div className="mt-2">
              <input
                type="text"
                name="num_year"
                id="num_year"
                autoComplete="num_year"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_year', { required: true })}
              />
              {errors.num_year && <p className="text-red-500">{errors.num_year.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="type_thesis" className="block text-sm font-medium leading-6 text-gray-900">Thể loại </label>
            <div className="mt-2">
              <Controller
                control={control}
                name="type_thesis"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={TYPE_THESIS}
                    name="type_thesis"
                    id="type_thesis"
                    // isMulti
                    placeholder="Lựa chọn"
                    {...register('type_thesis')}
                    onChange={(val) => {
                      // let rol = val.map(item => item.value).join(',')
                      setValue('type', val.value)
                    }}
                  />
                )}
              />
              {errors.type_thesis && <p className="text-red-500">{errors.type_thesis.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Tác giả</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="role"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    name="role"
                    id="role"
                    isMulti
                    placeholder="Lựa chọn"
                    {...register('role')}
                    onChange={(val) => {
                      let rol = val.map(item => item.value).join(',')
                      setValue('role', rol)
                    }}
                  />
                )}
              />
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
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
function FormEdit({ thesisId }) {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useUpdateThesis(thesisId);

  const { data: dataThesis } = useThesisDetail(thesisId);
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
  dataThesis?.users?.map(user => {
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
  dataThesis?.users?.map(user => {
    user.label = user.name
    user.value = user.id

    return user;
  });
  const schema = yup.object().shape({
    // name: yup.string().trim().required('Vui lòng nhập tên đề tài'),
    // code: yup.string().required('Vui lòng nhập mã đề tài').min(4, "Mã đề tài không được nhỏ hơn 4 kí tự."),
    course: yup.string(),
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
      navigate('/list-thesis');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (dataThesis) {
      reset({
        ...dataThesis,
        password: '',
        departmentSelected: departments?.find(department => department.id === dataThesis.department_id),
        positionSelected: POSITION_STAFF.find(position => position.value == dataThesis.position),
        yearSelected: years?.find((year) => year.id == dataThesis.year.id),
        roleSelected: dataThesis?.users,
        role: dataThesis?.users?.map(user => user.id).join(','),
        typeSelected: TYPE_THESIS.find(type => type.value === dataThesis.type)
      })
    }
  }, [dataThesis], years);

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
            <label htmlFor="name_student" className="block text-sm font-medium leading-6 text-gray-900">Họ tên nghiên cứu sinh </label>
            <div className="mt-2">
              <input
                type="text"
                name="name_student"
                id="name_student"
                autoComplete="name_student"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('name_student', { required: true })}
              />
              {errors.name_student && <p className="text-red-500">{errors.name_student.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_decision" className="block text-sm font-medium leading-6 text-gray-900">Số QĐ giao nhiệm vụ</label>
            <div className="mt-2">
              <input
                type="text"
                name="num_decision"
                id="num_decision"
                autoComplete="num_decision"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_decision', { required: true })}
              />
              {errors.num_decision && <p className="text-red-500">{errors.num_decision.message}</p>}
            </div>
          </div>

          <div className="col-span-full mb-2">
            <label htmlFor="course" className="block text-sm font-medium leading-6 text-gray-900">Khóa đào tạo</label>
            <div className="mt-2">
              <input
                type="text"
                name="course"
                id="course"
                autoComplete="course"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('course', { required: true })}
              />
              {errors.course && <p className="text-red-500">{errors.course.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="type_thesis" className="block text-sm font-medium leading-6 text-gray-900">Thể loại </label>
            <div className="mt-2">
              <Controller
                control={control}
                name="typeSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={TYPE_THESIS}
                    name="type_thesis"
                    id="type_thesis"
                    value={value}
                    placeholder="Lựa chọn"
                    {...register('type_thesis')}
                    onChange={(val) => {
                      onChange(val)
                      setValue('type', val.value)
                    }}
                  />
                )}
              />
              {errors.type_thesis && <p className="text-red-500">{errors.type_thesis.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Tác giả</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="roleSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    name="role"
                    id="role"
                    isMulti
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
          <div className="col-span-full mb-2">
            <label htmlFor="year_id" className="block text-sm font-medium leading-6 text-gray-900">Năm học</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="yearSelected"
                render={({ field: { value, onChange, ref } }) => {
                  return (
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
                  )
                }}
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
export default AddThesis;