import React, {useEffect, useState} from 'react';
import {Pagination} from "antd";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {LIST_SEARCH_PARAM_KEY_PAGE, LIST_SEARCH_PARAM_PAGE_KEY_SIZE, LIST_SEARCH_PARAM_PAGE_SIZE} from "@/constant";

interface ListPageProps {
    total : number

}

function ListPage(props:ListPageProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [_page, setPage] = useState(1)
    const [_pageSize, setPageSize] = useState(10)
    const {total} = props
    const searchParams = useSearchParams()


    useEffect(()=>{
        const page = parseInt(searchParams.get(LIST_SEARCH_PARAM_KEY_PAGE) || '') || 1
        setPage(page)
        const pageSize = parseInt(searchParams.get(LIST_SEARCH_PARAM_PAGE_KEY_SIZE) || '') || LIST_SEARCH_PARAM_PAGE_SIZE
        setPageSize(pageSize)
    },[searchParams])


    function handlePageChange(page:number,pageSize:number){
        const query = new URLSearchParams(searchParams.toString())
        query.set(LIST_SEARCH_PARAM_KEY_PAGE, page.toString())
        query.set(LIST_SEARCH_PARAM_PAGE_KEY_SIZE, pageSize.toString())
        router.push(`${pathname}?${query}`);
    }





    return (
        <Pagination current={_page} total={total} pageSize={_pageSize} onChange={handlePageChange} />
    );
}

export default ListPage;