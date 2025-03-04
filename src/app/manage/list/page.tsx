"use client";
import React, {useEffect, useMemo, useRef, useState} from "react";
import QuestionCard from "@/components/QuestionCard";
import {Spin, Typography,Empty} from "antd";
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
    const [started,setStarted] = useState(false)
    const [total, setTotal] = useState(0)

    const haveLoadMore = total > list.length
    const keyword = searchParams.get(LISI_SEARCH_PARAM_KEY) || ''
    useEffect(() => {
        setList([])
        setTotal(0)
        setPage(1)
        setStarted(false)
    }, [keyword]);

    const {run, loading}= useRequest(
        async () => {
            return await getQuestionList({
                page,
                keyword,
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
            setStarted(true)
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

    const  LoadMoreContent =useMemo(
        ()=>{
            if(!started||loading) return <Spin/>
            if(total === 0) return <Empty description={'暂无数据'}/>
            if(!haveLoadMore) return <span>没有更多了</span>
            return <span>开始加载下一页</span>
        },[started,loading,haveLoadMore]
    )
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

            </main>


            <footer className="text-center py-4 mx-auto">
                <div ref={containerRef}>
                    {LoadMoreContent}
                </div>
            </footer>
        </div>

    );
}
