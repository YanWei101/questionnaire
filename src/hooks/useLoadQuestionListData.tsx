import {useRequest} from "ahooks";
import {getQuestionList} from "@/services/question";
import {useSearchParams} from "next/navigation";
import {
    LISI_SEARCH_PARAM_KEY,
    LIST_SEARCH_PARAM_KEY_PAGE,
    LIST_SEARCH_PARAM_PAGE_KEY_SIZE, LIST_SEARCH_PARAM_PAGE_SIZE
} from "@/constant";

export interface QuestionListItem {
    _id: string
    title: string
    isPublished: boolean
    isStar: boolean
    isDeleted: boolean
    createdAt: string
    answerCount: number
}


export interface QuestionListData {
    list: QuestionListItem[]
    total: number
}

type OptionType = { isDeleted?: boolean, isStar?: boolean }

export default function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
    const searchParams = useSearchParams()
    const {isDeleted = false, isStar = false} = opt
    const {data, loading, error} = useRequest(
        async () => {
            const keyword = searchParams.get(LISI_SEARCH_PARAM_KEY) || ''
            const page = parseInt(searchParams.get(LIST_SEARCH_PARAM_KEY_PAGE) || '') || 1
            const pageSize = parseInt(searchParams.get(LIST_SEARCH_PARAM_PAGE_KEY_SIZE) || '') || LIST_SEARCH_PARAM_PAGE_SIZE
            return await getQuestionList({keyword, isDeleted, isStar, page, pageSize})

        },
        {
            refreshDeps: [searchParams]
        })
    const total = data?.total || 0
    const list = (data?.list || []) as QuestionListItem[]
    return {
        total,
        list,
        loading,
        error
    }
}