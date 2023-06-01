import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useCreateSubject, useSubjectDetail, useUpdateSubject } from '../../hooks/subject';
import { useDepartmentList } from '../../hooks/departments';
import Select from 'react-select';
import { useLoaderData, useLocation, useNavigate, useParams, useRoutes, useSearchParams } from 'react-router-dom';

function AddSubject() {
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('id');
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
           text-white '>{ currentLocation.pathname == '/edit-subject' ? 'Cập nhật Môn Học' : 'Thêm Môn Học' }</span></div>
          {currentLocation.pathname == '/edit-subject' ?
           <FormEdit subjectId={subjectId}/> : <FormCreate />
          }
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
    error,
    data: dataCreate } = useCreateSubject();
  const { data: departments } = useDepartmentList();
  departments?.data?.map(department => {
    department.label = department.name
    department.value = department.id

    return department;
  })

  const schema = yup.object().shape({
    name: yup.string().trim().required('Tên môn học là bắt buộc').max(191, 'Tên không dài quá 191 kí tự'),
    password: yup.string().min(8, "Mật khẩu không được nhỏ hơn 8 kí tự."),
    code: yup.string().required('Mã môn học là bắt buộc.').min(4, "Mã môn học không được nhỏ hơn 4 kí tự."),
    position: yup.string(),
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
      code: '',
    }
  })

  useEffect(() => {
    if (dataCreate) {
      navigate('/list-subject');
    }
  }, [isSuccess]);
  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-staff'
          onSubmit={handleSubmit((values) => {
            console.log(values);
            mutate(values)
          })}
        >
          <div className="col-span-full mb-2">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên môn học</label>
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
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã môn học</label>
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
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button onClick={() => navigate(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormEdit({subjectId}) {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useUpdateSubject(subjectId);
  const {data: subject = {}} = useSubjectDetail(subjectId);
  console.log(subject);
  const { data: departments } = useDepartmentList();
  departments?.data?.map(department => {
    department.label = department.name
    department.value = department.id

    return department;
  })

  const schema = yup.object().shape({
    name: yup.string().trim().required('Tên môn học là bắt buộc').max(191, 'Tên không dài quá 191 kí tự'),
    password: yup.string().min(8, "Mật khẩu không được nhỏ hơn 8 kí tự."),
    code: yup.string().required('Mã môn học là bắt buộc.').min(4, "Mã môn học không được nhỏ hơn 4 kí tự."),
    form_exam: yup.string(),
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
    defaultValues: {
      name: '',
      code: '',
      form_exam: '',
    }
  })

  useEffect(() => {
    if (dataCreate) {
      navigate('/list-subject');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (subject) {
      reset(subject)
    }
  }, [subject]);
  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-staff'
          onSubmit={handleSubmit((values) => {
            console.log(values);
            
            mutate(values)
          })}
        >
          <div className="col-span-full mb-2">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên môn học</label>
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
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã môn học</label>
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
            <label htmlFor="form_exam" className="block text-sm font-medium leading-6 text-gray-900">Hình thức thi</label>
            <div className="mt-2">
              <input
                type="text"
                name="form_exam"
                id="form_exam"
                autoComplete="form_exam"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('form_exam')}
              />
              {errors.form_exam && <p className="text-red-500">{errors.form_exam.message}</p>}
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

export default AddSubject;

