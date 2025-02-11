'use client'
import React, {useState} from 'react';
import QuestionCard from "@/component/questioncard";
import {produce} from "immer";

export default function QuestionList() {

    const [questionList, setQuestionList] = useState([
        {id: 'q1', title: '问卷1', isPublished: true},
        {id: 'q2', title: '问卷2', isPublished: false},
        {id: 'q3', title: '问卷3', isPublished: true},
        {id: 'q4', title: '问卷4', isPublished: true},
    ])

    function deleteQuestion(id: string) {
        // setQuestionList(questionList.filter((q) => {
        //     return q.id !== id;
        // }))

        // immer 方法
        setQuestionList(produce(draft => {
            const index = draft.findIndex((q) => q.id === id)
            draft.splice(index, 1)
        }))
    }

    function publishQuestion(id: string) {
        // setQuestionList(questionList.map((q) => {
        //     if (q.id === id) {
        //         q.isPublished = true
        //     }
        //     return q
        // }))

        // immer 方法
        setQuestionList(produce(draft => {
            const q = draft.find(q => q.id === id)
            if (q) {
                q.isPublished = true
            }
        }))
    }

    function add() {
        const r = Math.random().toString().slice(-3)
        // setQuestionList(questionList.concat(
        //     {
        //         id: 'q' + r,
        //         title: '问卷' + r,
        //         isPublished: false
        //     }
        // ))
        //immer 方法
        setQuestionList(produce(draft => {
            draft.push({
                id: 'q' + r,
                title: '问卷' + r,
                isPublished: false
            })
        }))
    }

    return (
        <div>
            <h1>问卷列表</h1>
            {
                questionList.map((q) => {
                    return (
                        <QuestionCard
                            key={q.id}
                            id={q.id}
                            title={q.title}
                            isPublished={q.isPublished}
                            deleteQuestion={deleteQuestion}
                            publishQuestion={publishQuestion}
                        />
                    )
                })
            }
            <button onClick={add}>添加问卷</button>
        </div>
    );
}

