import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useClassDelete, useClassDetail, useCreateClass, useUpdateClass } from '../../hooks/class';
import Select from 'react-select';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSubjectAll, useSubjectList } from '../../hooks/subject';
import { useStaffList } from '../../hooks/staffs';
import { FORM_EXAM, SEMESTER, TYPE_EXAM, YEAR_ID } from '../../constants';
import { useCreateExam, useExamDetail, useExamList, useUpdateExam } from '../../hooks/exam';
import { useCreateRoom, useRoomDetail, useUpdateRoom } from '../../hooks/room';
import { useYearList } from '../../hooks/year';
function AddRoom() {
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('id');
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
           text-white '>{currentLocation.pathname == '/edit-room' ? 'Cập Nhật Coi Thi' : 'Thêm Coi Thi'}</span></div>
          {currentLocation.pathname == '/edit-room' ? <FormEdit roomId={roomId} /> : <FormCreate />}
        </main>
      </div>
    </div>
  );
}

const FormCreate = () => {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useCreateRoom();
  const { data: { data: subjects = [], total } = {}, isLoading: isLoadingsubject } = useSubjectAll();
  subjects?.map(subject => {
    subject.label = subject.name
    subject.value = subject.id

    return subject;
  })
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
  const schema = yup.object().shape({
    subject_id: yup.string().trim().required('Môn học là bắt buộc'),
    code: yup.string().required('Mã môn học là bắt buộc.').min(4, "Mã môn học không được nhỏ hơn 4 kí tự."),
    // position: yup.string(),
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
    if (dataCreate) {
      navigate('/list-room');
    }
  }, [isSuccess]);
  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-class'
          onSubmit={handleSubmit((values) => {
            mutate(values)
            console.log(values)
          })}
        >
          <div className="col-span-full mb-2">
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã coi thi</label>
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
            <label htmlFor="subject_id" className="block text-sm font-medium leading-6 text-gray-900">Môn thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="subject_id"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={subjects}
                    id="subject_id"
                    placeholder="Lựa chọn"
                    {...register('subject_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("subject_id", val.id);
                    }}
                  />
                )}
              />
              {errors.subject_id && <p className="text-red-500">{errors.subject_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="user_id" className="block text-sm font-medium leading-6 text-gray-900">Người coi thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="user_id"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    id="user_id"
                    placeholder="Lựa chọn"
                    {...register('user_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("user_id", val.id);
                    }}
                  />
                )}
              />
              {errors.user_id && <p className="text-red-500">{errors.user_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_exam_session" className="block text-sm font-medium leading-6 text-gray-900">Số ca coi thi</label>
            <div className="mt-2">
              <input
                type="number"
                name="num_exam_session"
                id="num_exam_session"
                autoComplete="num_exam_session"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_exam_session', { required: true })}
              />
              {errors.num_exam_session && <p className="text-red-500">{errors.num_exam_session.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="time" className="block text-sm font-medium leading-6 text-gray-900">Thời gian làm bài</label>
            <div className="mt-2">
              <input
                type="number"
                name="time"
                id="time"
                autoComplete="time"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('time', { required: true })}
              />
              {errors.time && <p className="text-red-500">{errors.time.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">Ngày coi thi</label>
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
          <div className="col-span-full mb-2">
            <label htmlFor="semester" className="block text-sm font-medium leading-6 text-gray-900">Kỳ học</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="semester"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={SEMESTER}
                    id="semester"
                    placeholder="Lựa chọn"
                    {...register('semester')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("semester", val.value);
                    }}
                  />
                )}
              />
              {errors.semester && <p className="text-red-500">{errors.semester.message}</p>}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button onClick={() => navigate(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const FormEdit = ({ roomId }) => {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useUpdateRoom(roomId);
  const { data: { data: subjects = [], total } = {}, isLoading: isLoadingSubject } = useSubjectAll();
  subjects?.map(subject => {
    subject.label = subject.name
    subject.value = subject.id

    return subject;
  })
  const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
  const { data: room = {} } = useRoomDetail(roomId);
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
  const schema = yup.object().shape({})

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
    }
  })

  useEffect(() => {
    if (dataCreate) {
      navigate('/list-room');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (room) {
      reset({
        ...room,
        subjectSelected: subjects?.find((subject) => subject.id === room.subject_id),
        userSelected: staffs?.find((user) => user.id === room.user_id),
        semesterSelected: SEMESTER?.find((semester) => semester.value == room.semester),
        yearSelected: years?.find((year) => year.id == room.year_id),
      })
    }
  }, [room]);
  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-class'
          onSubmit={handleSubmit((values) => {
            mutate(values)
            console.log(values)
          })}
        >

          <div className="col-span-full mb-2">
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã coi thi</label>
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
            <label htmlFor="subject_id" className="block text-sm font-medium leading-6 text-gray-900">Đề thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="subjectSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={subjects}
                    id="subject_id"
                    value={value}
                    placeholder="Lựa chọn"
                    {...register('subject_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("subject_id", val.id);
                    }}
                  />
                )}
              />

              {errors.subject_id && <p className="text-red-500">{errors.subject_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="user_id" className="block text-sm font-medium leading-6 text-gray-900">Người coi thi</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="userSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    id="user_id"
                    value={value}
                    placeholder="Lựa chọn"
                    {...register('user_id')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("user_id", val.id);
                    }}
                  />
                )}
              />

              {errors.user_id && <p className="text-red-500">{errors.user_id.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_exam_session" className="block text-sm font-medium leading-6 text-gray-900">Số ca coi thi</label>
            <div className="mt-2">
              <input
                type="number"
                name="num_exam_session"
                id="num_exam_session"
                autoComplete="num_exam_session"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_exam_session', { required: true })}
              />
              {errors.num_exam_session && <p className="text-red-500">{errors.num_exam_session.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="time" className="block text-sm font-medium leading-6 text-gray-900">Thời gian làm bài</label>
            <div className="mt-2">
              <input
                type="number"
                name="time"
                id="time"
                autoComplete="time"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('time', { required: true })}
              />
              {errors.time && <p className="text-red-500">{errors.time.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">Ngày coi thi</label>
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
          <div className="col-span-full mb-2">
            <label htmlFor="semester" className="block text-sm font-medium leading-6 text-gray-900">Kỳ học</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="semesterSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={SEMESTER}
                    id="semester"
                    placeholder="Lựa chọn"
                    value={value}
                    {...register('semester')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("semester", val.value);
                    }}
                  />
                )}
              />
              {errors.semester && <p className="text-red-500">{errors.semester.message}</p>}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button onClick={() => navigate(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddRoom;