"use client";
import React from "react";
import QuestionCard from "@/components/QuestionCard";
// import {produce} from "immer";
import {Typography, Empty, Spin} from "antd";
import ListSearch from "@/components/ListSearch";
import useLoadQuestionListData from "@/hooks/useLoadQuestionListData";

const {Title} = Typography;

export default function QuestionList() {
    const {list, loading} = useLoadQuestionListData({isStar:true})

    // function deleteQuestion(id: string) {
        // setQuestionList(questionList.filter((q) => {
        //     return q.id !== id;
        // }))

        // immer 方法
        //   setQuestionList(
        //     produce((draft) => {
        //       const index = draft.findIndex((q) => q._id === id);
        //       draft.splice(index, 1);
        //     })
        //   );
        // }

        // function publishQuestion(id: string) {
        // setQuestionList(questionList.map((q) => {
        //     if (q.id === id) {
        //         q.isPublished = true
        //     }
        //     return q
        // }))

        // immer 方法
        //   setQuestionList(
        //     produce((draft) => {
        //       const q = draft.find((q) => q._id === id);
        //       if (q) {
        //         q.isPublished = true;
        //       }
        //     })
        //   );
        // }

        // function starQuestion(id: string) {
        //   setQuestionList(
        //     produce((draft) => {
        //       const q = draft.find((q) => q._id === id);
        //       if (q) {
        //         q.isStar = !q.isStar;
        //       }
        //     })
        //   );
        // }
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
            <>
                <header className="flex items-center mb-4">
                    <div className="flex-1">
                        <Title level={3}>我的问卷</Title>
                    </div>
                    <div className="flex-1 text-right">
                        <ListSearch/>
                    </div>
                </header>
                <main>
                    {loading && <div className={'text-center mb-4'}>
                        <Spin/>
                    </div>}
                    {!loading && list.length === 0 ? (
                        <Empty description="暂无数据"/>
                    ) : (
                        list.map((q) => {
                            return (
                                <QuestionCard
                                    key={q._id}
                                    id={q._id}
                                    // deleteQuestion={deleteQuestion}
                                    // publishQuestion={publishQuestion}
                                    // starQuestion={starQuestion}
                                    {...q}
                                />
                            );
                        })
                    )}
                </main>
                <footer className="text-center">分页</footer>
            </>
        );
    }
