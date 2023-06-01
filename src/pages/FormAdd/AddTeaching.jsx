import React, { useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
function Dashboard() {

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
           text-white '>Thêm học phần giảng dạy</span></div>
          <div className="w-full">
            <div className="border-b border-gray-900/10 pb-12">
            <div className="col-span-full mb-2 my-3">
                <label for="CountPerson" className="block text-sm font-medium leading-6 text-gray-900 capitalize">Chọn học kì</label>
                <div className="mt-2">
                <select className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="Kì 1 (2022-2023)">Kì 1 (2022 202 3)</option>
                  <option value="Kì 2 (2022-2023)">Kì 2 (2022-2023)</option>
                  <option value="Kì 1 (2023-2024)">Kì 1 (2023-2024)</option>
                </select>
                                </div>
              </div>
              <fieldset>
                <legend className=" text-sm font-semibold leading-6 text-gray-900 capitalize">Chọn loại hình đào tạo</legend>
                <div className="mt-2 space-y-2">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input id="main" name="main" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    </div>
                    <div className="text-sm leading-6">
                      <label for="main" className="font-medium text-gray-900">Đào tạo hệ đóng học phí</label>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input id="common" name="common" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    </div>
                    <div className="text-sm leading-6">
                      <label for="common" className="font-medium text-gray-900"> Đào tạo chuyên ngành Kỹ thuật mật mã</label>

                    </div>
                  </div>
                </div>
              </fieldset>
              <div className="col-span-full mb-2 my-3">
                <label for="CountPerson" className="block text-sm font-medium leading-6 text-gray-900 capitalize">Tên học phần</label>
                <div className="mt-2">
                  <input type="number" name="CountPerson" id="CountPerson" autocomplete="CountPerson" className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="col-span-full mb-2 my-3">
                <label for="name" className="block text-sm font-medium leading-6 text-gray-900 capitalize">số tín chỉ</label>
                <div className="mt-2">
                  <input type="text" name="name" id="name" autocomplete="name" className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="col-span-full mb-2 my-3">
                <label for="course" className="block text-sm font-medium leading-6 text-gray-900 capitalize">Lớp học</label>
                <div className="mt-2">
                  <input type="text" name="course" id="course" autocomplete="course" className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="col-span-full mb-2 my-3">
                <label for="numberDecide" className="block text-sm font-medium leading-6 text-gray-900 capitalize">loại hình thức</label>
                <div className="mt-2">
                  <input type="text" name="numberDecide" id="numberDecide" autocomplete="numberDecide" className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="col-span-full mb-2 my-3">
                <label for="numberDecide" className="block text-sm font-medium leading-6 text-gray-900 capitalize">số tiết theo thời khóa biểu</label>
                <div className="mt-2">
                  <input type="text" name="numberDecide" id="numberDecide" autocomplete="numberDecide" className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="col-span-full mb-2 my-3">
                <label for="numberStandard" className="block text-sm font-medium leading-6 text-gray-900 capitalize">số tiết quy chuẩn</label>
                <div className="mt-2">
                  <input type="text" name="numberStandard" id="numberStandard" autocomplete="numberStandard" className="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div>

          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">Hủy</button>
            <button type="submit" className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lưu</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;