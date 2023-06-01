import React, { useContext } from 'react';
import { useScientificList } from '../../hooks/scientific';
import { useArticleList } from '../../hooks/articles';
import { UserContext } from '../../context/userInfo';
import { Table } from 'antd';
import { TYPE_ARTICLESCIENTIFIC } from '../../constants';

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
    title: <div className="text-center uppercase">Mã bài báo</div>,
    dataIndex: "code",
    key: "code",
    render: (_, record) => <> {record.code}</>,
    sortDirections: ["descend", "ascend", "descend"],
    sorter: () => { },
  },
  {
    title: <div className="text-center uppercase">Tên bài báo</div>,
    dataIndex: "name",
    key: "name",
    sortDirections: ["descend", "ascend", "descend"],
    sorter: () => { },
  },
  {
    title: <div className="text-center uppercase">Thể loại</div>,
    dataIndex: "type",
    key: "type",
    sortDirections: ["descend", "ascend", "descend"],
    sorter: () => { },
    render: (_, record) => <p> {
      TYPE_ARTICLESCIENTIFIC.find(type => type.value == record.type).label
    }</p>,
  },
];
function DashboardCard07() {
  const { user } = useContext(UserContext);
  const { data: { data: dataArticles = [], total } = {}, isLoading } = useArticleList({
    pagination: {
      pageSize: 1,
    },
    userId: user?.id,
  });
  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Danh sách bài báo khoa học gần đây</h2>
      </header>
      <div className="p-3">
        <Table
          columns={columns}
          dataSource={dataArticles}
          rowKey={(record) => record.id}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default DashboardCard07;
