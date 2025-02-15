"use client";
import React, { useState } from "react";

import { Typography, Empty, Table, Tag, Space, Button, Modal } from "antd";

const { Title } = Typography;
const { confirm } = Modal;

export default function QuestionList() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const questionList = [
    {
      _id: "q1",
      title: "问卷1",
      isPublished: true,
      isStar: false,
      createAt: "2025-02-15",
      answerCount: 1,
    },
    {
      _id: "q3",
      title: "问卷3",
      isPublished: true,
      isStar: false,
      createAt: "2025-02-15",
      answerCount: 1,
    },
    {
      _id: "q2",
      title: "问卷2",
      isPublished: false,
      isStar: true,
      createAt: "2025-02-15",
      answerCount: 1,
    },
    {
      _id: "q4",
      title: "问卷4",
      isPublished: true,
      isStar: true,
      createAt: "2025-02-15",
      answerCount: 1,
    },
  ];

  const QuestionColumns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      key: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="blue">已发布</Tag> : <Tag>未发布</Tag>;
      },
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "答卷数量",
      dataIndex: "answerCount",
      key: "answerCount",
    },
  ];

  function Del() {
    confirm({
      title: "确定删除吗？",
      content: "删除后无法恢复",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        console.log("删除", selectedRowKeys);
      },
    });
  }
  const TableElement = (
    <>
      <div className="mb-4">
        <Space>
          <Button type="primary">恢复</Button>
          <Button danger onClick={Del}>
            删除
          </Button>
        </Space>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys as string[]);
          },
        }}
        dataSource={questionList}
        columns={QuestionColumns}
        rowKey="_id"
      />
    </>
  );

  return (
    <>
      <header className="flex items-center">
        <div className="flex-1 ">
          <Title level={3}>我的问卷</Title>
        </div>
        <div className="flex-1 text-right">搜素</div>
      </header>
      <main>
        {questionList.length === 0 ? (
          <Empty description="暂无资源" />
        ) : (
          TableElement
        )}
      </main>
      <footer className="text-center">分页</footer>
    </>
  );
}
