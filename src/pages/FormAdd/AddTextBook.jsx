import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useCreateBooks, useBookList, useBooksDetail, useUpdateBooks } from '../../hooks/book';
import { useDepartmentList } from '../../hooks/departments';
import Select from 'react-select';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useStaffList } from '../../hooks/staffs';
import { POSITION_STAFF, TYPE_BOOK} from '../../constants';
import { data } from 'autoprefixer';
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
function AddBook() {
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get('id');
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
           text-white '>{currentLocation.pathname == '/edit-book' ? 'Cập Nhật Sách/Giáo Trình' : 'Thêm Sách/Giáo Trình'}</span></div>
          {currentLocation.pathname == '/edit-book' ? <FormEdit bookId={bookId} /> : <FormCreate />}
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
    data: dataCreate } = useCreateBooks();
  const { data: departments } = useDepartmentList();
  const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
  staffs?.map(staff => {
    staff.label = staff.name
    staff.value = staff.id

    return staff;
  })
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
    name: yup.string().trim().required('Vui lòng nhập tên sách/giáo trình'),
    code: yup.string().required('Vui lòng nhập mã sách/giáo trình').min(4, "Mã sách/giáo trình không được nhỏ hơn 4 kí tự."),
    num_publish: yup.string(),
    num_page: yup.number(),
    type_book: yup.number()
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
      num_page: '',
      num_publish: '',
      num_person: '',
      type_book: '',
      role: '',
      type: 4,
    }
  })

  useEffect(() => {
    console.log("dataCreate");
    if (dataCreate) {
      navigate('/book-list');
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
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã sách/giáo trình</label>
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
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên sách/giáo trình</label>
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
            <label htmlFor="num_publish" className="block text-sm font-medium leading-6 text-gray-900">Số xuất bản</label>
            <div className="mt-2">
              <input
                type="text"
                name="num_publish"
                id="num_publish"
                autoComplete="num_publish"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_publish', { required: true })}
              />
              {errors.num_publish && <p className="text-red-500">{errors.num_publish.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="type_book" className="block text-sm font-medium leading-6 text-gray-900">Thể loại</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="type_bookSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={TYPE_BOOK}
                    name="type_book"
                    id="type_book"
                    placeholder="Lựa chọn"
                    {...register('type_book')}
                    onChange={(val) => {
                      onChange()
                      setValue('type_book', val.value)
                    }}
                  />
                )}
              />
              {errors.type_book && <p className="text-red-500">{errors.type_book.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="num_page" className="block text-sm font-medium leading-6 text-gray-900">Số trang</label>
            <div className="mt-2">
              <input
                type="number"
                name="num_page"
                id="num_page"
                autoComplete="num_page"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_page', { required: true })}
              />
              {errors.num_page && <p className="text-red-500">{errors.num_page.message}</p>}
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
                    isMulti
                    name="role"
                    id="role"
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
  )
}

function FormEdit({ bookId }) {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useUpdateBooks(bookId);

  const { data: dataBook } = useBooksDetail(bookId);
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
  dataBook?.users?.map(user => {
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
    name: yup.string().trim().required('Vui lòng nhập tên sách/giáo trình'),
    code: yup.string().required('Vui lòng nhập mã sách/giáo trình').min(4, "Mã sách/giáo trình không được nhỏ hơn 4 kí tự."),
    num_publish: yup.string(),
    num_page: yup.number(),
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
      navigate('/book-list');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (dataBook) {
      reset({
        ...dataBook,
        password: '',
        departmentSelected: departments?.find(department => department.id === dataBook.department_id),
        positionSelected: POSITION_STAFF.find(position => position.value == dataBook.position),
        type_bookSelected: TYPE_BOOK.find(book => book.value == dataBook.type),
        roleSelected: dataBook?.users,
        yearSelected: years?.find((year) => year.id == dataBook.year_id),
        role: dataBook?.users?.map(user => user.id).join(','),
        type: 4,
        type_book: dataBook.type,
      })
    }
  }, [dataBook]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-book'
          onSubmit={handleSubmit((values) => {
            console.log(values);
            mutate(values)
          })}
        >
          <div className="col-span-full mb-2.5">
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã sách/giáo trình</label>
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
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên sách/giáo trình</label>
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
            <label htmlFor="num_publish" className="block text-sm font-medium leading-6 text-gray-900">Số xuất bản</label>
            <div className="mt-2">
              <input
                type="text"
                name="num_publish"
                id="num_publish"
                autoComplete="num_publish"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_publish', { required: true })}
              />
              {errors.num_publish && <p className="text-red-500">{errors.num_publish.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="type_bookSelected" className="block text-sm font-medium leading-6 text-gray-900">Thể loại</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="type_bookSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={TYPE_BOOK}
                    value={value}
                    name="type_book"
                    id="type_book"
                    placeholder="Lựa chọn"
                    {...register('type_book')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("type_book", val.value);
                    }}
                  />
                )}
              />
              {errors.type_book && <p className="text-red-500">{errors.type_book.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label htmlFor="num_page" className="block text-sm font-medium leading-6 text-gray-900">Số trang</label>
            <div className="mt-2">
              <input
                type="number"
                name="num_page"
                id="num_page"
                autoComplete="num_page"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_page', { required: true })}
              />
              {errors.num_page && <p className="text-red-500">{errors.num_page.message}</p>}
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

export default AddBook;