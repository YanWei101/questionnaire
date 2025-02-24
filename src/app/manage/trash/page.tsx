"use client";
import React, { useState } from "react";

import {Typography, Empty, Table, Tag, Space, Button, Modal, Spin} from "antd";
import ListSearch from "@/components/ListSearch";
import useLoadQuestionListData from "@/hooks/useLoadQuestionListData";
const { Title } = Typography;
const { confirm } = Modal;

export default function QuestionList() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const {list = {},loading} = useLoadQuestionListData()


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
        dataSource={list}
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
        <div className="flex-1 text-right">
          <ListSearch/>
        </div>
      </header>
      <main className={'h-min-[calc(100vh-135px)]'}>
        {loading && <div className={'text-center mb-4'}>
          <Spin/>
        </div>}
        {!loading && list.length === 0 && <Empty description="暂无资源" />}
        {list.length > 0 && TableElement}

      </main>
      <footer className="text-center">分页</footer>
    </>
  );
}
