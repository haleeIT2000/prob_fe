import React, { useContext } from 'react';
import { LEVEL_TOPIC, RESULT_TOPIC } from '../../constants';
import { Table } from 'antd';
import { useTopicList } from '../../hooks/topic';
import { UserContext } from '../../context/userInfo';

const columns = [
  {
    title: <div className="text-center">STT</div>,
    dataIndex: "index",
    key: "index",
    width: "1%",
    render: (text, t, index) => (
      <p className="text-center">
        {index + 1}
      </p>
    ),
  },
  {
    title: <div className="text-center">Mã dự án</div>,
    dataIndex: "code",
    key: "code",
    render: (_, record) => <> {record.code}</>,
    sortDirections: ["descend", "ascend", "descend"],
    sorter: () => { },
  },
  {
    title: <div className="text-center">Tên đề tài/dự án</div>,
    dataIndex: "name",
    key: "name",
    sortDirections: ["descend", "ascend", "descend"],
    sorter: () => { },
  },
  {
    title: <div className="text-center">Số người tham gia</div>,
    dataIndex: "num_person",
    key: "num_person",
    sortDirections: ["descend", "ascend", "descend"],
    sorter: () => { },
  },
  {
    title: <div className="text-center">Cấp</div>,
    dataIndex: "level",
    key: "level",
    sortDirections: ["descend", "ascend", "descend"],
    sorter: () => { },
    render: (_, record) => <p> {
      LEVEL_TOPIC.find(level => level.value == record.level).label
    }</p>,
  },
  {
    title: <div className="text-center">Kết quả đạt được</div>,
    dataIndex: "result",
    key: "result",
    sortDirections: ["descend", "ascend", "descend"],
    sorter: () => { },
    render: (_, record) => <p> {
      RESULT_TOPIC.find(result => result.value == record.result).label
    }</p>,
  },
];
function DashboardCard10() {
  const { user } = useContext(UserContext);
  const { data: { data: dataTopics = [], total } = {}, isLoading } = useTopicList({
    pagination: {
      pageSize: 1,
    },
    userId: user?.id,
  });
  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Danh sách nghiên cứu khoa học gần đây</h2>
      </header>
      <div className="p-3">
        <Table
          columns={columns}
          dataSource={dataTopics}
          rowKey={(record) => record.id}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default DashboardCard10;
