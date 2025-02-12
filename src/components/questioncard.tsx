import React from "react";

type IProps = {
  id: string;
  title: string;
  isPublished: boolean;
  deleteQuestion?: (id: string) => void;
  publishQuestion?: (id: string) => void;
};

function QuestionCard(props: IProps) {
  const { id, title, isPublished, deleteQuestion, publishQuestion } = props;

  function del(id: string) {
    if (deleteQuestion) {
      deleteQuestion(id);
    }
  }

  function publish(id: string) {
    if (publishQuestion) {
      publishQuestion(id);
    }
  }

  return (
    <div key={id} className={" w-full h-20 mb-10 bg-white rounded-lg p-2"}>
      <div className="flex mb-3">
        <div className={"flex-1"}>
          <strong>{title}</strong>
        </div>

        <div className={"flex-1 text-right"}>
          {isPublished ? (
            <span className="mr-2 text-green-500">已发布</span>
          ) : (
            <span className="mr-2">未发布</span>
          )}
        </div>
      </div>
      <div className="flex">
        <div className="flex-1">
          <button
            className="mr-2 border border-gray-500 rounded-md px-2 py-1"
            onClick={() => {
              publish(id);
            }}
          >
            发布问卷
          </button>
          <button
            className="border border-gray-500 rounded-md px-2 py-1"
            onClick={() => {
              del(id);
            }}
          >
            删除问卷
          </button>
        </div>
        <div className="flex-1 text-right">
          <button className="mr-2 border border-gray-500 rounded-md px-2 py-1">
            标星
          </button>
          <button className="mr-2 border border-gray-500 rounded-md px-2 py-1">
            复制
          </button>
          <button className="border border-gray-500 rounded-md px-2 py-1">
            删除
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
