import type {responseType} from './ajax'
import axios from './ajax'

type SearchKeyword = {
    keyword: string
    isDeleted: boolean
    isStar: boolean
    page: number
    pageSize:number
}

export async function getQuestion(id: string): Promise<responseType> {
    const url = `http://localhost:3200/api/question/${id}`
    return (await axios.get(url)) as responseType
}

export async function createQuestion(): Promise<responseType> {
    const url = '/api/question'
    return (await axios.post(url)) as responseType
}

export async function getQuestionList(opt: Partial<SearchKeyword> = {}): Promise<responseType> {
    const url = '/api/question'
    return (await axios.get(url, {params: opt})) as responseType
}