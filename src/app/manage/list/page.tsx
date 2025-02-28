"use client";
import React, {useEffect, useRef, useState} from "react";
import QuestionCard from "@/components/QuestionCard";
import {Spin, Typography} from "antd";
import ListSearch from '@/components/ListSearch';
import {getQuestionList} from "@/services/question";
import {useSearchParams} from "next/navigation";
import {useDebounceFn, useRequest} from "ahooks";
import {LISI_SEARCH_PARAM_KEY, LIST_SEARCH_PARAM_PAGE_SIZE} from "@/constant";
import {QuestionListData, QuestionListItem} from "@/hooks/useLoadQuestionListData";


const {Title} = Typography;

export default function QuestionList() {
    // const {loading,list,total} = useLoadQuestionListData()
    const searchParams = useSearchParams()
    const [page, setPage] = useState(1)

    const [list, setList] = useState<QuestionListItem[]>([]);

    const containerRef = useRef<HTMLDivElement>(null)

    const [total, setTotal] = useState(0)

    const haveLoadMore = total > list.length

    const {run, loading}= useRequest(
        async () => {
            return await getQuestionList({
                page,
                keyword: searchParams.get(LISI_SEARCH_PARAM_KEY) || '',
                pageSize: LIST_SEARCH_PARAM_PAGE_SIZE
            })

        },
        {
            manual: true,
            onSuccess(result) {
                const { list: l = [], total = 0 } = result as unknown as QuestionListData;
                setList([...list, ...l]);
                setPage(page+1)
                setTotal(total)
            }
        }
    )
    const {run: tryLoadMore} = useDebounceFn(() => {
        const elem = containerRef.current
        if (elem == null) return
        const domRef = elem.getBoundingClientRect()
        if (domRef == null) return;
        const {bottom} = domRef
        if (bottom <= document.body.clientHeight) {
            run()
        }
    }, {
        wait: 1000
    })
    useEffect(() => {
        tryLoadMore()
    }, [searchParams])

    useEffect(() => {
        if (haveLoadMore){
            window.addEventListener('scroll', tryLoadMore)

        }
        return () => {
            window.removeEventListener('scroll', tryLoadMore)
        }
    }, [searchParams,haveLoadMore])


    return (

        <div className="flex flex-col ">
            <header className="flex items-center mb-4">
                <div className="flex-1">
                    <Title level={3}>我的问卷</Title>
                </div>
                <div className="flex-1 text-right">
                    <ListSearch/>
                </div>
            </header>

            <main className="flex-1">


                {list.map((q) => {
                    return (
                        <QuestionCard
                            key={q._id}
                            id={q._id}
                            {...q}
                        />
                    );
                })}
                {loading && <div className={'text-center mb-4'}>
                    <Spin/>
                </div>}

            </main>


            <footer className="text-center py-4 mx-auto">
                <div ref={containerRef}>
                    loadMore.....
                </div>
            </footer>
        </div>

    );
}
