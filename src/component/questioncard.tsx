import React from 'react';

interface IProps {
    id: string,
    title: string,
    isPublished: boolean,
    deleteQuestion?: (id: string) => void
    publishQuestion?: (id: string) => void
}

function QuestionCard(props: IProps) {
    const {id, title, isPublished, deleteQuestion, publishQuestion} = props

    function del(id: string) {
        deleteQuestion && deleteQuestion(id)
    }

    function publish(id: string) {
        publishQuestion && publishQuestion(id)
    }

    return (
            <div key={id} className={'flex gap-2'}>
                <strong>{title}</strong>
                &nbsp;
                {isPublished ? <span>已发布</span> : <span>未发布</span>}
                &nbsp;
                <button className={'mr-2'} onClick={() => {
                    publish(id)
                }}>发布问卷
                </button>
                <button onClick={() => {
                    del(id)
                }}>删除问卷
                </button>
            </div>
    );
}

export default QuestionCard;