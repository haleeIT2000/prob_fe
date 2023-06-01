import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../partials/actions/FilterButton';
import { PAGE_SIZE } from '../constants';
import { Button, Modal, Space, Table, Tooltip } from 'antd';
import Loading from '../components/Loading';
import { useRoomDelete, useRoomDetail, useRoomList } from '../hooks/room';
import Search from '../components/Search';
import { debounce } from 'lodash';
import moment from 'moment/moment';

function RoomList() {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: PAGE_SIZE,
      locale: { items_per_page: "/ trang" },
    },
    sorter: {
      // sortColumn: null,
      // sort: null,
    },
    search: '',
  });
  const [page, setPage] = useState(1);
  const pageSizeRef = useRef(PAGE_SIZE);
  const changeDebounce = debounce((search) => {
    setTableParams({
      ...tableParams,
      search: search
    })
  }, 1000);

  const onChangeSearch = (search) => {
    changeDebounce(search);
  }
  const columns = [
    {
      title: <div className="text-center">STT</div>,
      dataIndex: "index",
      key: "index",
      width: "1%",
      render: (text, t, index) => (
        <p className="text-center">
          {(page - 1) * pageSizeRef.current + index + 1}
        </p>
      ),
    },
    {
      title: <div className="text-center">Mã coi thi</div>,
      dataIndex: "code",
      key: "code",
      sortDirections: ["descend", "ascend", "descend"],
      sorter: () => { },
    },
    {
      title: <div className="text-center">Môn thi</div>,
      dataIndex: "subject_id",
      key: "subject_id",
      sortDirections: ["descend", "ascend", "descend"],
      // sorter: () => { },
      render: (_, record) => {
        return (
          <div className="text-center">
            {record?.subject?.name}
          </div>
        )
      }
    },
    {
      title: <div className="text-center">Người coi thi</div>,
      dataIndex: "user_id",
      key: "user_id",
      sortDirections: ["descend", "ascend", "descend"],
      // sorter: () => { },
      render: (_, record) => {
        return (
          <div className="text-center">
            {record?.user?.name}
          </div>
        )
      }
    },
    {
      title: <div className="text-center">Số ca coi thi</div>,
      dataIndex: "num_exam_session",
      key: "num_exam_session",
      sortDirections: ["descend", "ascend", "descend"],
      sorter: () => { },
    },
    {
      title: <div className="text-center">Ngày coi thi</div>,
      dataIndex: "startDate",
      key: "startDate",
      sortDirections: ["descend", "ascend", "descend"],
      sorter: () => { },
      render: (_, record) => {
        return (
          <>{moment(new Date(record?.startDate)).format("DD-MM-YYYY")}</>
        )
      }
    },
    {
      title: <div className="text-center">Hành động</div>,
      key: "action",
      width: "150px",
      render: (_, record) => {
        return (
          <Space size="middle" className="flex justify-center">
            <Tooltip placement="top" title='Sửa'>
              <NavLink
                end
                to={`/edit-room?id=${record.id}`}
                className={({ isActive }) =>
                  'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokewith="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </NavLink>
            </Tooltip>
            <Tooltip placement="top" title='Chi tiết' onClick={() => {
              setShowModal(true);
              setRoomDetailId(record.id)
            }}>
              <a href="#" className="text-gray-600 hover:text-gray-900" title='view'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokewith="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokewith="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </a>
            </Tooltip>
            <Tooltip placement='top' title='Xoá'>
              <span title='delete'><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600 hover:text-red-800"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => showDeleteModal(record.id)}>
                <path strokeLinecap="round" strokeLinejoin="round" strokewith="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg></span>
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  const [showModal, setShowModal] = React.useState(false);
  const [roomDetailId, setRoomDetailId] = React.useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roomIdDelete, setRoomIdDelete] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isLoadingg, setIsLoading] = useState(false);
  const { data: { data: dataRoom = [], total } = {}, isLoading } = useRoomList(tableParams);
  console.log(dataRoom);
  const { mutate, isLoading: isLoadingDelete, isSuccess } = useRoomDelete();
  const onChangeTableParams = (pagination, filters, sorter, extra) => {
    setPage(pagination.current);
    pageSizeRef.current = pagination.pageSize;
    setTableParams({
      ...tableParams,
      pagination: {
        ...pagination,
      },
      sorter: {
        sort: sorter?.order === "ascend" ? "asc" : "desc",
        sortColumn: sorter?.columnKey,
      },
    });
  };

  const showDeleteModal = (classId) => {
    setOpenDeleteModal(true);
    setRoomIdDelete(classId);
  };
  const handleDeleteOk = () => {
    handleDelete();
    setOpenDeleteModal(false);
  };
  const handleDeleteCancel = () => {
    setRoomIdDelete(null);
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    if (dataRoom.length === 1) {
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          current: tableParams.pagination.current - 1,
        },
      });
    }
    mutate(roomIdDelete);
  };

  useEffect(() => {
    if (isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoading]);
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="container max-w-7xl mx-auto mt-3">
              <div className="mb-4">
                <h1 className="font-serif w-fit text-2xl pb-1 mb-8 mx-auto text-center font-bold uppercase border-b border-gray-300">Danh sách coi thi</h1>
                <div className="flex justify-between flex-row-reverse gap-4">
                  <div className='flex gap-2'>
                    <Search onChangeSearch={onChangeSearch} />
                    <FilterButton />
                  </div>
                  <NavLink end to="/add-room" className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="ml-2">
                      Thêm coi thi
                    </span>
                  </NavLink>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="w-full inline-block overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    {isLoadingg ? (
                      <Loading />
                    ) : (
                      <Table
                        columns={columns}
                        dataSource={dataRoom}
                        onChange={onChangeTableParams}
                        rowKey={(record) => record.id}
                        pagination={{
                          ...tableParams.pagination,
                          total: total,
                          showSizeChanger: true,
                          position: ["bottomRight"],
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Modal
        title="Bạn có chắc chắn muốn xoá ?"
        open={openDeleteModal}
        onOk={handleDeleteOk}
        centered
        onCancel={handleDeleteCancel}
        footer={[
          <Button
            onClick={handleDeleteCancel}
            className="bg-blue mr-3"
            key="cancel"
          >
            Huỷ
          </Button>,
          <Button
            onClick={handleDeleteOk}
            className="bg-danger mr-3"
            key="confirm"
          >
            Đồng ý
          </Button>,
        ]}
      />
      <>
        {showModal ? (
          <ModalDetail setShowModal={setShowModal} roomId={roomDetailId} />
        ) : null}
      </>
    </div>
  );
}

const ModalDetail = ({ roomId, setShowModal }) => {
  const { data: dataRoom } = useRoomDetail(roomId);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden 
            overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto mx-5 my-6 md:mx-auto max-w-3xl md:w-[500px]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full p-6 bg-white outline-none focus:outline-none">
            <button
              className="flex items-center justify-end"
              type="button"
              onClick={() => setShowModal(false)}
            >
              <svg viewPort="0 0 12 12" version="1.1" height="30" width="13"
                xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="11"
                  x2="11" y2="1"
                  stroke="black"
                  strokeWidth="2" />
                <line x1="1" y1="1"
                  x2="11" y2="11"
                  stroke="black"
                  strokeWidth="2" />
              </svg>
            </button>

            <div className="relative border">
              <div className="flex justify-between py-2 pl-2 border-b">
                <p className="w-1/2 break-words">Mã coi thi:</p>
                <p className="w-1/2 break-words">{dataRoom?.code}</p>
              </div>
              <div className="flex justify-between py-2 pl-2 border-b">
                <p className="w-1/2 break-words">Môn thi:</p>
                <p className="w-1/2 break-words">{dataRoom?.subject_id}</p>
              </div>
              <div className="flex justify-between py-2 pl-2 border-b">
                <p className="w-1/2 break-words">Người coi thi:</p>
                <p className="w-1/2 break-words">{dataRoom?.user_id}</p>
              </div>
              <div className="flex justify-between py-2 pl-2 border-b">
                <p className="w-1/2 break-words">Số ca coi thi:</p>
                <p className="w-1/2 break-words">{dataRoom?.num_exam_session}</p>
              </div>
              <div className="flex justify-between py-2 pl-2">
                <p className="w-1/2 break-words">Thời gian làm bài:</p>
                <p className="w-1/2 break-words">{dataRoom?.time}</p>
              </div>
              <div className="flex justify-between py-2 pl-2">
                <p className="w-1/2 break-words">Ngày coi thi:</p>
                <p className="w-1/2 break-words">{dataRoom?.startDate}</p>
              </div>
              <div className="flex justify-between py-2 pl-2">
                <p className="w-1/2 break-words">Kì học:</p>
                <p className="w-1/2 break-words">{dataRoom?.semester}</p>
              </div>
              <div className="flex justify-between py-2 pl-2">
                <p className="w-1/2 break-words">Năm học:</p>
                <p className="w-1/2 break-words">{dataRoom?.year_id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default RoomList;