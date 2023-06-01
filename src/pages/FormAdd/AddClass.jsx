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
import { Checkbox } from 'antd';
import { FORM_EXAM_SEMESTER, SEMESTER} from '../../constants';
import { useYearList } from '../../hooks/year';
import moment from 'moment/moment';

function AddClass() {
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const classId = searchParams.get('id');
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
           text-white '>{currentLocation.pathname == '/edit-class' ? 'Cập Nhật Lớp Học' : 'Thêm lớp học'}</span></div>
          {currentLocation.pathname == '/edit-class' ? <FormEdit classId={classId} /> : <FormCreate />}
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
    data: dataCreate } = useCreateClass();
  const { data: { data: subjects = [], total } = {}, isLoading: isLoadingSubject } = useSubjectAll();
  subjects?.map(subject => {
    subject.label = subject.name
    subject.value = subject.id

    return subject;
  })
  const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
  const { data: { data: years = [] } = {}, isLoading: isLoadingYear } = useYearList();
  staffs?.map(staff => {
    staff.label = staff.name
    staff.value = staff.id

    return staff;
  })

  years?.map(year => {
    year.label = year.name
    year.value = year.id

    return year;
  })

  const schema = yup.object().shape({
    name: yup.string().trim().required('Tên lớp học là bắt buộc').max(191, 'Tên không dài quá 191 kí tự'),
    code: yup.string().required('Mã lớp học là bắt buộc.').min(4, "Mã lớp học không được nhỏ hơn 4 kí tự."),
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
    }
  })

  useEffect(() => {
    if (dataCreate) {
      navigate('/list-class');
    }
  }, [isSuccess]);
  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-class'
          onSubmit={handleSubmit((values) => {
            mutate(values)
          })}
        >
          <div className="col-span-full mb-2">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên lớp học</label>
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
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã lớp học</label>
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
            <label htmlFor="subject_id" className="block text-sm font-medium leading-6 text-gray-900">Môn học</label>
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
            <label htmlFor="user_id" className="block text-sm font-medium leading-6 text-gray-900">Giảng viên</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="user_id"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    name="user_id"
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
            <label htmlFor="form_teach" className="block text-sm font-medium leading-6 text-gray-900">Hình thức giảng dạy</label>
            <div className="mt-2">
              <input
                type="text"
                name="form_teach"
                id="form_teach"
                autoComplete="form_teach"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('form_teach', { required: true })}
              />
              {errors.form_teach && <p className="text-red-500">{errors.form_teach.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_student" className="block text-sm font-medium leading-6 text-gray-900">Số sinh viên</label>
            <div className="mt-2">
              <input
                type="text"
                name="num_student"
                id="num_student"
                autoComplete="num_student"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_student', { required: true })}
              />
              {errors.num_student && <p className="text-red-500">{errors.num_student.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_lesson" className="block text-sm font-medium leading-6 text-gray-900">Số tiết học</label>
            <div className="mt-2">
              <input
                type="text"
                name="num_lesson"
                id="num_lesson"
                autoComplete="num_lesson"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_lesson', { required: true })}
              />
              {errors.num_lesson && <p className="text-red-500">{errors.num_lesson.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_credit" className="block text-sm font-medium leading-6 text-gray-900">Số tín chỉ</label>
            <div className="mt-2">
              <input
                type="text"
                name="num_credit"
                id="num_credit"
                autoComplete="num_credit"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_credit', { required: true })}
              />
              {errors.num_credit && <p className="text-red-500">{errors.num_credit.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="classroom" className="block text-sm font-medium leading-6 text-gray-900">Phòng học</label>
            <div className="mt-2">
              <input
                type="text"
                name="classroom"
                id="classroom"
                autoComplete="classroom"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('classroom', { required: true })}
              />
              {errors.classroom && <p className="text-red-500">{errors.classroom.message}</p>}
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
          <div className="col-span-full mb-2">
            <label htmlFor="form_exam" className="block text-sm font-medium leading-6 text-gray-900">Hình thức thi giữa kì</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="form_examSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={FORM_EXAM_SEMESTER}
                    id="form_exam"
                    placeholder="Lựa chọn"
                    {...register('form_exam')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("form_exam", val.value);
                    }}
                  />
                )}
              />

              {errors.form_exam && <p className="text-red-500">{errors.form_exam.message}</p>}
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

const FormEdit = ({ classId }) => {
  const navigate = useNavigate();
  const { mutate,
    isSuccess,
    isLoading,
    error,
    data: dataCreate } = useUpdateClass(classId);
  const { data: { data: subjects = [], total } = {}, isLoading: isLoadingSubject } = useSubjectAll();
  subjects?.map(subject => {
    subject.label = subject.name
    subject.value = subject.id

    return subject;
  })
  const { data: { data: staffs = [] } = {}, isLoading: isLoadingStaff } = useStaffList();
  const { data: { data: years = [] } = {}, isLoading: isLoadingYear } = useYearList();
  const { data: classs = {} } = useClassDetail(classId);
  staffs?.map(staff => {
    staff.label = staff.name
    staff.value = staff.id

    return staff;
  })
  years?.map(year => {
    year.label = year.name
    year.value = year.id

    return year;
  })

  const [marking, setMarking] = useState(false);
  const [exam_create, setExamCreate] = useState(false);
  const [exam_supervision, setExamSupervision] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().trim().required('Tên lớp học là bắt buộc').max(191, 'Tên không dài quá 191 kí tự'),
    code: yup.string().required('Mã lớp học là bắt buộc.').min(4, "Mã lớp học không được nhỏ hơn 4 kí tự."),
    position: yup.string(),
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
    }
  })

  useEffect(() => {
    if (dataCreate?.data?.success) {
      navigate('/list-class');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (classs) {
      setMarking(classs.marking == 1 ? true : false);
      setExamCreate(classs.exam_create == 1 ? true : false);
      setExamSupervision(classs.exam_supervision == 1 ? true : false);
      reset({
        ...classs,
        startDate: moment(new Date(classs.startDate)).format('MM/DD/YYYY'),
        endDate: moment(new Date(classs.endDate)).format('MM/DD/YYYY'),
        subjectSelected: subjects?.find((subject) => subject.id === classs.subject_id),
        userSelected: staffs?.find((staff) => staff.id === classs.user_id),
        form_examSelected: FORM_EXAM_SEMESTER?.find((exam) => exam.value === classs.form_exam),
        semesterSelected: SEMESTER?.find((semester) => semester.value == classs.semester),
        yearSelected: years?.find((year) => year.id == classs.year_id),
      })
    }
  }, [classs]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-900/10 pb-12">
        <form
          name='add-class'
          onSubmit={handleSubmit((values) => {
            console.log({ marking, exam_create, exam_supervision });
            mutate({ ...values /*, marking: marking, exam_create: exam_create, exam_supervision: exam_supervision*/ })
          })}
        >
          <div className="col-span-full mb-2">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Tên lớp học</label>
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
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">Mã lớp học</label>
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
            <label htmlFor="subject_id" className="block text-sm font-medium leading-6 text-gray-900">Môn học</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="subjectSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={subjects}
                    value={value}
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
            <label htmlFor="user_id" className="block text-sm font-medium leading-6 text-gray-900">Giảng viên</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="userSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={staffs}
                    value={value}
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
            <label htmlFor="form_teach" className="block text-sm font-medium leading-6 text-gray-900">Hình thức giảng dạy</label>
            <div className="mt-2">
              <input
                type="text"
                name="form_teach"
                id="form_teach"
                autoComplete="form_teach"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('form_teach', { required: true })}
              />
              {errors.form_teach && <p className="text-red-500">{errors.form_teach.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_student" className="block text-sm font-medium leading-6 text-gray-900">Số sinh viên</label>
            <div className="mt-2">
              <input
                type="text"
                name="num_student"
                id="num_student"
                autoComplete="num_student"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_student', { required: true })}
              />
              {errors.num_student && <p className="text-red-500">{errors.num_student.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_lesson" className="block text-sm font-medium leading-6 text-gray-900">Số tiết học</label>
            <div className="mt-2">
              <input
                type="text"
                name="num_lesson"
                id="num_lesson"
                autoComplete="num_lesson"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_lesson', { required: true })}
              />
              {errors.num_lesson && <p className="text-red-500">{errors.num_lesson.message}</p>}
            </div>
          </div>
          <div className="col-span-full mb-2">
            <label htmlFor="num_credit" className="block text-sm font-medium leading-6 text-gray-900">Số tín chỉ</label>
            <div className="mt-2">
              <input
                type="text"
                name="num_credit"
                id="num_credit"
                autoComplete="num_credit"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('num_credit', { required: true })}
              />
              {errors.num_credit && <p className="text-red-500">{errors.num_credit.message}</p>}
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
          <div className="col-span-full mb-2">
            <label htmlFor="form_exam" className="block text-sm font-medium leading-6 text-gray-900">Hình thức thi giữa kì</label>
            <div className="mt-2">
              <Controller
                control={control}
                name="form_examSelected"
                render={({ field: { value, onChange, ref } }) => (
                  <Select
                    options={FORM_EXAM_SEMESTER}
                    value={value}
                    id="form_exam"
                    placeholder="Lựa chọn"
                    {...register('form_exam')}
                    onChange={(val) => {
                      onChange(val);
                      setValue("form_exam", val.value);
                    }}
                  />
                )}
              />

              {errors.form_exam && <p className="text-red-500">{errors.form_exam.message}</p>}
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
          <div className="col-span-full mb-2 flex items-center justify-between">
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                name="exam_create"
                id="exam_create"
                checked={exam_create}
                className='border-gray-300'
                onChange={() => { setExamCreate(!exam_create); setValue('exam_create', !exam_create ? 1 : 0) }}
                autoComplete="exam_create"
              />
              <label htmlFor="exam_create" className="text-sm font-medium leading-6 text-gray-900 pr-2">Ra đề thi giữa kì</label>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                name="exam_supervision"
                id="exam_supervision"
                checked={exam_supervision}
                className='border-gray-300'
                onChange={(e) => { setExamSupervision(!exam_supervision); setValue('exam_supervision', !exam_supervision ? 1 : 0); console.log(e.target, e) }}
                autoComplete="exam_supervision"
              />
              <label htmlFor="exam_supervision" className="text-sm font-medium leading-6 text-gray-900 pr-2">Coi thi giữa kì</label>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                name="marking"
                id="marking"
                className='border-gray-300'
                checked={marking}
                onChange={() => { setMarking(!marking); setValue('marking', !marking ? 1 : 0) }}
                autoComplete="marking"
              />
              <label htmlFor="marking" className="text-sm font-medium leading-6 text-gray-900 pr-2">Chấm thi giữa kì</label>
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

export default AddClass;