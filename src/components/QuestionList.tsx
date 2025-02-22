"use client";
import React, { useState } from "react";
import QuestionCard from "@/components/QuestionCard";
import { produce } from "immer";
import { Typography } from "antd";
import ListSearch from "./ListSearch";
const { Title } = Typography;

export default function QuestionList() {
  const [questionList, setQuestionList] = useState([
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
  ]);

  function deleteQuestion(id: string) {
    // setQuestionList(questionList.filter((q) => {
    //     return q.id !== id;
    // }))

    // immer 方法
    setQuestionList(
      produce((draft) => {
        const index = draft.findIndex((q) => q._id === id);
        draft.splice(index, 1);
      })
    );
  }

  function publishQuestion(id: string) {
    // setQuestionList(questionList.map((q) => {
    //     if (q.id === id) {
    //         q.isPublished = true
    //     }
    //     return q
    // }))

    // immer 方法
    setQuestionList(
      produce((draft) => {
        const q = draft.find((q) => q._id === id);
        if (q) {
          q.isPublished = true;
        }
      })
    );
  }

  function starQuestion(id: string) {
    setQuestionList(
      produce((draft) => {
        const q = draft.find((q) => q._id === id);
        if (q) {
          q.isStar = !q.isStar;
        }
      })
    );
  }
  //   function add() {
  //     const r = Math.random().toString().slice(-3);
  //     // setQuestionList(questionList.concat(
  //     //     {
  //     //         id: 'q' + r,
  //     //         title: '问卷' + r,
  //     //         isPublished: false
  //     //     }
  //     // ))
  //     //immer 方法
  //     setQuestionList(
  //       produce((draft) => {
  //         draft.push({
  //           id: "q" + r,
  //           title: "问卷" + r,
  //           isPublished: false,
  //         });
  //       })
  //     );
  //   }

  return (
    <div className="flex flex-col ">
      <header className="flex items-center mb-4">
        <div className="flex-1">
          <Title level={3}>我的问卷</Title>
        </div>
        <div className="flex-1 text-right">
          <ListSearch />
        </div>
      </header>
      <main className="flex-1">
        {questionList.map((q) => {
          return (
            <QuestionCard
              key={q._id}
              id={q._id}
              deleteQuestion={deleteQuestion}
              publishQuestion={publishQuestion}
              starQuestion={starQuestion}
              {...q}
            />
          );
        })}
      </main>
      <footer className="text-center py-4">Loading More....</footer>
    </div>
  );
}
