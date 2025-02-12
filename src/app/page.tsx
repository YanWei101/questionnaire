import React from 'react';
import QuestionList from "@/components/questionList";

function Home() {
    return (
        <div className={'container p-6 h-screen'}>
            <div className={'flex h-14 mb-3'}>
                <div className={'flex-1 content-center'}>
                    <h1>问卷列表</h1>
                </div>
                <div className={'flex-1 content-center text-right'}>
                    Search
                </div>
            </div>
            <QuestionList/>

            <div>

            </div>
        </div>
    );
}

export default Home;