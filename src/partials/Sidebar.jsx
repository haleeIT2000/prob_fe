import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-60 lg:w-20 lg:sidebar-expanded:!w-60 2xl:!w-64 shrink-0 bg-slate-800 p-2 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between gap-2 items-center mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          <span className='text-white text-center'>Học Viện Kĩ Thuật Mật Mã</span>

        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup activecondition={pathname === '/' || pathname.includes('dashboard')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        end
                        to="/dashboard"
                        className={`block text-slate-200 truncate transition duration-150 ${pathname === '/' || pathname.includes('dashboard') ? 'hover:text-slate-200' : 'hover:text-white'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${pathname === '/' || pathname.includes('dashboard') ? 'text-indigo-500' : 'text-slate-400'
                                  }`}
                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                              />
                              <path
                                className={`fill-current ${pathname === '/' || pathname.includes('dashboard') ? 'text-indigo-600' : 'text-slate-600'
                                  }`}
                                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                              />
                              <path
                                className={`fill-current ${pathname === '/' || pathname.includes('dashboard') ? 'text-indigo-200' : 'text-slate-400'
                                  }`}
                                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Dashboard
                            </span>
                          </div>

                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Community */}
              <SidebarLinkGroup activecondition={pathname.includes('community')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        end
                        to="/list-staff"
                        className={`block text-slate-200 truncate transition duration-150 ${pathname.includes('community') ? 'hover:text-slate-200' : 'hover:text-white'
                          }`}

                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${pathname.includes('community') ? 'text-indigo-500' : 'text-slate-600'}`}
                                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('community') ? 'text-indigo-300' : 'text-slate-400'}`}
                                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Nhân Viên
                            </span>
                          </div>

                        </div>
                      </NavLink>

                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup activecondition={pathname.includes('teaching')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${pathname.includes('teaching') ? 'hover:text-slate-200' : 'hover:text-white'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${pathname.includes('teaching') ? 'text-indigo-300' : 'text-slate-400'}`}
                                d="M13 6.068a6.035 6.035 0 0 1 4.932 4.933H24c-.486-5.846-5.154-10.515-11-11v6.067Z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('teaching') ? 'text-indigo-500' : 'text-slate-700'}`}
                                d="M18.007 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('teaching') ? 'text-indigo-600' : 'text-slate-600'}`}
                                d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Quản lý giảng dạy
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </NavLink>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/list-subject"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Quản lí môn học
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/list-class"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Quản lí lớp học
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup activecondition={pathname.includes('job')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="/list-course"
                        className={`block text-slate-200 truncate transition duration-150 ${pathname.includes('job') ? 'hover:text-slate-200' : 'hover:text-white'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${pathname.includes('job') ? 'text-indigo-600' : 'text-slate-700'}`}
                                d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('job') ? 'text-indigo-500' : 'text-slate-600'}`}
                                d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('job') ? 'text-indigo-300' : 'text-slate-400'}`}
                                d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Đánh giá học phần
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/list-exam"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Quản lí đề thi
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/list-room"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Quản lí coi thi
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/list-mark"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Quản lí chấm thi
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup activecondition={pathname.includes('tasks')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink end to="/list-thesis"
                        className={`block text-slate-200 truncate transition duration-150 ${open ? 'hover:text-slate-200' : 'hover:text-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${pathname.includes('tasks') ? 'text-indigo-500' : 'text-slate-600'}`}
                                d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('tasks') ? 'text-indigo-500' : 'text-slate-600'}`}
                                d="M1 1h22v23H1z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('tasks') ? 'text-indigo-300' : 'text-slate-400'}`}
                                d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Quản lý luận án luận <br /> văn
                            </span>
                          </div>
                          {/* Icon */}
                          {/* <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div> */}
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Tasks */}
              <SidebarLinkGroup activecondition={pathname.includes('tasks')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink end to="/list-topic"
                        className={`block text-slate-200 truncate transition duration-150 ${open ? 'hover:text-slate-200' : 'hover:text-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path className={`fill-current ${pathname.includes('calendar') ? 'text-indigo-500' : 'text-slate-600'}`} d="M1 3h22v20H1z" />
                              <path className={`fill-current ${pathname.includes('calendar') ? 'text-indigo-300' : 'text-slate-400'}`}
                                d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z" />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Quản lý nghiên cứu <br /> khoa học
                            </span>
                          </div>
                          {/* Icon */}
                          {/* <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div> */}
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup activecondition={pathname.includes('settings')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink end to="/list-article"
                        className={`block text-slate-200 truncate transition duration-150 ${open ? 'hover:text-slate-200' : 'hover:text-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${pathname.includes('settings') ? 'text-indigo-500' : 'text-slate-600'}`}
                                d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('settings') ? 'text-indigo-300' : 'text-slate-400'}`}
                                d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('settings') ? 'text-indigo-500' : 'text-slate-600'}`}
                                d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('settings') ? 'text-indigo-300' : 'text-slate-400'}`}
                                d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Quản lý bài báo <br /> khoa học
                            </span>
                          </div>
                          {/* Icon */}
                          {/* <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div> */}
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup activecondition={pathname.includes('utility')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink end to="/book-list"
                        className={`block text-slate-200 truncate transition duration-150 ${open ? 'hover:text-slate-200' : 'hover:text-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${pathname.includes('campaigns') ? 'text-indigo-500' : 'text-slate-600'}`}
                                d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('campaigns') ? 'text-indigo-300' : 'text-slate-400'}`}
                                d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Quản lý sách giáo <br /> trình xuất bản
                            </span>
                          </div>
                          {/* Icon */}
                          {/* <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div> */}
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup activecondition={pathname.includes('utility')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink end to="/invention-list"
                        className={`block text-slate-200 truncate transition duration-150 ${open ? 'hover:text-slate-200' : 'hover:text-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <circle
                                className={`fill-current ${pathname.includes('utility') ? 'text-indigo-300' : 'text-slate-400'}`}
                                cx="18.5"
                                cy="5.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current ${pathname.includes('utility') ? 'text-indigo-500' : 'text-slate-600'}`}
                                cx="5.5"
                                cy="5.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current ${pathname.includes('utility') ? 'text-indigo-500' : 'text-slate-600'}`}
                                cx="18.5"
                                cy="18.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current ${pathname.includes('utility') ? 'text-indigo-300' : 'text-slate-400'}`}
                                cx="5.5"
                                cy="18.5"
                                r="4.5"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Quản lý bằng sáng<br /> chế, giải thưởng
                            </span>
                          </div>
                          {/* Icon */}
                          {/* <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div> */}
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Onboarding */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink end to="/instruction-list"
                        className={`block text-slate-200 truncate transition duration-150 ${open ? 'hover:text-slate-200' : 'hover:text-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <circle
                                className={`fill-current ${pathname.includes('component') ? 'text-indigo-500' : 'text-slate-600'}`}
                                cx="16"
                                cy="8"
                                r="8"
                              />
                              <circle
                                className={`fill-current ${pathname.includes('component') ? 'text-indigo-300' : 'text-slate-400'}`}
                                cx="8"
                                cy="16"
                                r="8"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Quản lý hướng dẫn <br /> nghiên cứu khoa học
                            </span>
                          </div>
                          {/* Icon */}
                          {/* <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div> */}
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink end to="/build-program-list"
                        className={`block text-slate-200 truncate transition duration-150 ${open ? 'hover:text-slate-200' : 'hover:text-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path className="fill-current text-slate-600" d="M8.07 16H10V8H8.07a8 8 0 110 8z" />
                              <path className="fill-current text-slate-400" d="M15 12L8 6v5H0v2h8v5z" />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Quản lý xây dựng <br /> chương trình đào tạo
                            </span>
                          </div>
                          {/* Icon */}
                          {/* <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div> */}
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink end to="/list-compilation"
                        className={`block text-slate-200 truncate transition duration-150 ${open ? 'hover:text-slate-200' : 'hover:text-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className="fill-current text-slate-600"
                                d="M19 5h1v14h-2V7.414L5.707 19.707 5 19H4V5h2v11.586L18.293 4.293 19 5Z"
                              />
                              <path
                                className="fill-current text-slate-400"
                                d="M5 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM5 23a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Quản lý biên soạn<br /> giáo trình, bài giảng
                            </span>
                          </div>
                          {/* Icon */}
                          {/* <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div> */}
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink end to="/list-year"
                        className={`block text-slate-200 truncate transition duration-150 ${open ? 'hover:text-slate-200' : 'hover:text-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className="fill-current text-slate-600"
                                d="M19 5h1v14h-2V7.414L5.707 19.707 5 19H4V5h2v11.586L18.293 4.293 19 5Z"
                              />
                              <path
                                className="fill-current text-slate-400"
                                d="M5 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM5 23a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Quản lý năm học
                            </span>
                          </div>
                          {/* Icon */}
                          {/* <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div> */}
                        </div>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
          {/* More group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">More</span>
            </h3>
            <ul className="mt-3">

              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink end to="/personal-infor"
                        className={`block text-slate-200 truncate transition duration-150 ${open ? 'hover:text-slate-200' : 'hover:text-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path className="fill-current text-slate-600" d="M8.07 16H10V8H8.07a8 8 0 110 8z" />
                              <path className="fill-current text-slate-400" d="M15 12L8 6v5H0v2h8v5z" />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Tài khoản cá nhân
                            </span>
                          </div>
                          {/* Icon */}
                          {/* <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div> */}
                        </div>
                      </NavLink>

                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
