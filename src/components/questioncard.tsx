import React from "react";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from "antd";
import {
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
type IProps = {
  id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
  deleteQuestion?: (id: string) => void;
  publishQuestion?: (id: string) => void;
  starQuestion?: (id: string) => void;
};

const { confirm } = Modal;

export default function QuestionCard(props: IProps) {
  const {
    id,
    title,
    isPublished,
    isStar,
    answerCount,
    createAt,
    deleteQuestion,
    publishQuestion,
    starQuestion,
  } = props;

  function del(id: string) {
    if (deleteQuestion) {
      confirm({
        title: "确定删除问卷吗？",
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          deleteQuestion(id);
          message.success("删除成功");
        },
      });
    }
  }

  function publish(id: string) {
    if (publishQuestion) {
      publishQuestion(id);
    }
  }

  function star(id: string) {
    if (starQuestion) {
      starQuestion(id);
    }
  }

  return (
    <div key={id} className={" w-full mb-10 bg-white rounded-lg p-2"}>
      <div className="flex mb-3">
        <div className={"flex-1 text-[16px] ml-2"}>
          <Link
            href={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}
          >
            <Space>
              {isStar && <StarOutlined style={{ color: "red" }} />}
              <strong>{title}</strong>
            </Space>
          </Link>
        </div>

        <div className={"flex-1 text-right"}>
          <Space>
            {isPublished ? <Tag color="blue">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷：{answerCount}</span>
            <span>创建时间：{createAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className="flex">
        <div className="flex-1">
          <Space>
            <Button type="text" icon={<EditOutlined />}>
              <Link href={`/question/edit/${id}`}>编辑问卷</Link>
            </Button>
            <Button
              type="text"
              icon={<LineChartOutlined />}
              disabled={!isPublished}
            >
              <Link href={`/question/stat/${id}`}>统计问卷</Link>
            </Button>
          </Space>
        </div>
        <div className="flex-1 text-right">
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              onClick={() => {
                star(id);
              }}
            >
              {isStar ? "取消标星" : "标星"}
            </Button>
            <Popconfirm
              title="确定发布问卷吗"
              okText="确定"
              cancelText="取消"
              onConfirm={() => {
                publish(id);
                message.success("发布成功");
              }}
            >
              <Button
                type="text"
                size="small"
                disabled={isPublished}
                icon={<CopyOutlined />}
              >
                发布
              </Button>
            </Popconfirm>

            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => {
                del(id);
              }}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}
