import {useRequest} from "ahooks";
import {getQuestionList} from "@/services/question";
import {useSearchParams} from "next/navigation";


type OptionType = { isDeleted: boolean, isStar: boolean }

export default function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
    const searchParams = useSearchParams()
    const {isDeleted = false, isStar = false} = opt
    const {data = {}, loading, error} = useRequest(
        async () => {
            const keyword = searchParams.get('keyword') || ''
            return await getQuestionList({keyword, isDeleted, isStar})

        },
        {
            refreshDeps: [searchParams]
        })
    // @ts-ignore
    const {list = [], total = 0} = data

    return {
        list,
        total,
        loading,
        error
    }
}