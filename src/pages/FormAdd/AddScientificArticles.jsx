import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useCreateArticle, useArticleDetail, useArticleList, useUpdateArticle } from '../../hooks/articles';
import { useDepartmentList } from '../../hooks/departments';
import Select from 'react-select';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useStaffList } from '../../hooks/staffs';
import { POSITION_STAFF, TYPE_ARTICLESCIENTIFIC } from '../../constants';
import { useYearList } from '../../hooks/year';
const type_article = [
  {
    label: "Tạp chí",
    value: 0
  },
  {
    label: "Hội nghị",
    value: 1
  },
]
function AddArticle() {
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get('id');
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
           text-white '>{currentLocation.pathname == '/edit-article' ? 'Cập Nhật Bài Báo' : 'Thêm Bài Báo'}</span></div>
          {currentLocation.pathname == '/edit-article' ? <FormEdit articleId={articleId} /> : <FormCreate />}
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
    data: dataCreate } = useCreateArticle();
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
    name: yup.string().trim().required('Vui lòng nhập tên bài báo'),
    code: yup.string().required('Vui lòng nhập mã bài báo').min(4, "Mã bài báo không được nhỏ hơn 4 kí tự."),
    index_article: yup.string(),
    // total_time: yup.number(),
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
      type_article: '',
      code: '',
      index_article: '',
      total_time: '',
      num_person: '',
      role: '',
      type: 2,
    }
  })

  useEffect(() => {
    if (dataCreate?.data.success) {
      navigate('/list-article');
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
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã bài báo</label>
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
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 capitalize">Tên bài báo</label>
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
            <label htmlFor="type_article" className="block text-sm font-medium leading-6 text-gray-900">Thể loại</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="type_article"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={type_article}
                    name="type_article"
                    id="type_article"
                    placeholder="Lựa chọn"
                    {...register('type_article')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("type_article", val.value);
                    }}
                  />
                )}
              />
              {errors.type_article && <p className="text-red-500">{errors.type_article.message}</p>}
            </div>
          </div>

          <div className="col-span-full mb-2.5">
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
                      setValue('role', rol);
                    }}
                  />
                )}
              />
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="index_article" className="block text-sm font-medium leading-6 text-gray-900">Chỉ số tạp chí/ hội nghị</label>
            <div className="mt-2">
              <input
                type="text"
                name="index_article"
                id="index_article"
                autoComplete="index_article"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('index_article', { required: true })}
              />
              {errors.index_article && <p className="text-red-500">{errors.index_article.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="type_articlescientific" className="block text-sm font-medium leading-6 text-gray-900">Loại tạp chí</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="TYPE_ARTICLESCIENTIFIC"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={TYPE_ARTICLESCIENTIFIC}
                    name="type_articlescientific"
                    id="type_articlescientific"
                    placeholder="Lựa chọn"
                    {...register('type_articlescientific')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("type_articlescientific", val.value);
                    }}
                  />
                )}
              />
              {errors.type_articlescientific && <p className="text-red-500">{errors.type_articlescientific.message}</p>}
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
          <div className="col-span-full mb-2.5">
            <div className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="open_access"
                id="open_access"
                autoComplete="open_access"
                value={0}
                className="block border-gray-300"
                onChange={(e) => {
                  console.log(e.target.checked)
                  setValue('open_access', 1)
                }}
              // {...register('open_access', { required: true })}
              />
              <label htmlFor="open_access">Open Access</label>
              {errors.open_access && <p className="text-red-500">{errors.open_access.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <div className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="open_access"
                id="open_access_scopus"
                value={1}
                autoComplete="open_access_scopus"
                className="block border-gray-300"
                onChange={(e) => {
                  setValue('open_access_scopus', 1)
                }}
              // {...register('open_access_scopus', { required: true })}
              />
              <label htmlFor="open_access_scopus">Open Access Scopus</label>
              {errors.open_access_scopus && <p className="text-red-500">{errors.open_access_scopus.message}</p>}
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

function FormEdit({ articleId }) {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useUpdateArticle(articleId);

  const { data: dataArticle } = useArticleDetail(articleId);
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
  dataArticle?.users?.map(user => {
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

  const schema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập tên đề tài/dự án'),
    code: yup.string().required('Vui lòng nhập mã đề tài/dự án').min(4, "Mã đề tài/dự án không được nhỏ hơn 4 kí tự."),
    endDate: yup.date(),
    startDate: yup.date(),
  });
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
      navigate('/list-article');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (dataArticle) {
      reset({
        ...dataArticle,
        password: '',
        departmentSelected: departments?.find(department => department.id === dataArticle.department_id),
        positionSelected: POSITION_STAFF.find(position => position.value == dataArticle.position),
        roleSelected: dataArticle?.users,
        yearSelected: years?.find((year) => year.id == dataArticle.year.id),
        // articleSelected: type_article.find(article => article.value == dataArticle.type_article),
        type_articlescientificSelected: TYPE_ARTICLESCIENTIFIC.find(article => article.value == dataArticle.type),
        role: dataArticle?.users?.map(user => user.id).join(','),
        type: 2,
      })
    }
  }, [dataArticle, years]);

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
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã bài báo</label>
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
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 capitalize">Tên bài báo</label>
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
            <label htmlFor="type_article" className="block text-sm font-medium leading-6 text-gray-900">Thể loại</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="type_article"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={type_article}
                    name="type_article"
                    id="type_article"
                    placeholder="Lựa chọn"
                    {...register('type_article')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("type_article", val.id);
                    }}
                  />
                )}
              />
              {errors.type_article && <p className="text-red-500">{errors.type_article.message}</p>}
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
            <label htmlFor="index_article" className="block text-sm font-medium leading-6 text-gray-900">Chỉ số tạp chí/ hội nghị</label>
            <div className="mt-2">
              <input
                type="text"
                name="index_article"
                id="index_article"
                autoComplete="index_article"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('index_article', { required: true })}
              />
              {errors.index_article && <p className="text-red-500">{errors.index_article.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="type_articlescientificSelected" className="block text-sm font-medium leading-6 text-gray-900">Loại tạp chí</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="type_articlescientificSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={TYPE_ARTICLESCIENTIFIC}
                    value={value}
                    name="type_articlescientificSelected"
                    id="type_articlescientific"
                    placeholder="Lựa chọn"
                    {...register('type_articlescientific')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("type_articlescientific", val.value);
                    }}
                  />
                )}
              />
              {errors.type_articlescientific && <p className="text-red-500">{errors.type_articlescientific.message}</p>}
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
          <div className="col-span-full mb-2.5">
            <div className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="open_access"
                id="open_access"
                autoComplete="open_access"
                className="block border-gray-300"
                onChange={(e) => {
                  console.log(e.target.checked)
                  setValue('open_access', 1)
                }}
              />
              <label htmlFor="open_access">Open Access</label>
              {errors.open_access && <p className="text-red-500">{errors.open_access.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <div className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="open_access"
                id="open_access_scopus"
                autoComplete="open_access_scopus"
                className="block border-gray-300"
                onChange={(e) => {
                  console.log(e.target.checked)
                  setValue('open_access_scopus', 1)
                }}
              />
              <label htmlFor="open_access_scopus">Open Access Scopus</label>
              {errors.open_access_scopus && <p className="text-red-500">{errors.open_access_scopus.message}</p>}
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

export default AddArticle;