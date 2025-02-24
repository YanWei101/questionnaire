"use client";
import React from "react";
import QuestionCard from "@/components/QuestionCard";
import {Typography,Spin} from "antd";
import ListSearch from '@/components/ListSearch';
const { Title } = Typography;

import useLoadQuestionListData from "@/hooks/useLoadQuestionListData";





export default function QuestionList() {

    const {list = {},loading} = useLoadQuestionListData()




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
                    {loading && <div className={'text-center mb-4'}>
                        <Spin/>
                    </div>}
                    {list.map((q) => {
                        return (
                            <QuestionCard
                                key={q._id}
                                id={q._id}
                                {...q}
                            />
                        );
                    })}

                </main>


                <footer className="text-center py-4">Loading More....</footer>
            </div>

    );
}
