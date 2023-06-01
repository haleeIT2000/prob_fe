import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../partials/actions/FilterButton';
import Search from '../components/Search';
function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const onChangeSearch = (search) => {
    setTableParams({
      ...tableParams,
      search: search
    })
    console.log(search);
  }
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
            <div className="container max-w-7xl mx-auto mt-3">
              <div className="mb-4">
                <h1 className="w-fit text-2xl pb-1 mb-8 mx-auto text-center font-bold uppercase border-b border-gray-300">Danh sách đánh giá  học phần</h1>
                <div className="flex justify-between flex-row-reverse gap-4">
                <div className='flex gap-2'>
                  <Search onChangeSearch={onChangeSearch} />
                  <FilterButton />
                </div>
                  <NavLink end to="/add-term-exam" className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="ml-2">
                      Thêm đánh giá học phần
                    </span>
                  </NavLink>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="w-full inline-block overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th
                            className="px-4 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            ID</th>
                          <th
                            className="px-4 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Học Kỳ</th>
                          <th
                            className="px-4 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Hệ đào tạo</th>
                          <th
                            className="px-4 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Tên học phần</th>
                          <th
                            className="px-4 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Lớp học phần</th>
                          <th
                            className="px-4 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Số sinh viên</th>
                          <th
                            className="px-4 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Số đề</th>
                          <th
                            className="px-4 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Công việc</th>
                          <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50" colspan="3">
                            Action</th>
                        </tr>
                      </thead>

                      <tbody className="bg-white  text-sm">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              3
                            </div>

                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5">Create CURD with NodeJS
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </a>

                          </td>
                          <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </a>

                          </td>
                          <td className="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200 ">
                            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600 hover:text-red-800"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg></a>

                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              3
                            </div>

                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5">Create CURD with NodeJS
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td><td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                            <a href="#" title='edit' className="text-indigo-600 hover:text-indigo-900">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </a>

                          </td>
                          <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                            <a href="#" title='view' className="text-gray-600 hover:text-gray-900">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </a>

                          </td>
                          <td className="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200 ">
                            <a href="#" title='delete'><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600 hover:text-red-800"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg></a>

                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              3
                            </div>

                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5">Create CURD with NodeJS
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p>Lorem ipsum dolor</p>
                          </td><td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                            <a href="#" title='edit' className="text-indigo-600 hover:text-indigo-900">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </a>

                          </td>
                          <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                            <a href="#" title='view' className="text-gray-600 hover:text-gray-900">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </a>

                          </td>
                          <td className="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200 ">
                            <a href="#" title='delete'><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600 hover:text-red-800"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg></a>

                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;