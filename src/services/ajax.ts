import axios, {AxiosResponse} from 'axios'
import {message} from 'antd'
import {QuestionListData} from "@/hooks/useLoadQuestionListData";

const ajax = axios.create({
    timeout: 5000,
})


ajax.interceptors.response.use((res:AxiosResponse):AxiosResponse => {
    const resData = (res.data || {}) as responseType;
    const { errno, data, msg } = resData;
    if (errno !== 0) {
        if (msg) {
            message.error(msg);
        }
        throw new Error(msg);
    }
    res.data = data
    return res.data
});

export default ajax
export type responseType = {
    id: string;
    errno: number
    data: responseData
    msg: string
    list?: QuestionListData
    total?: number
}

export type responseData = {
    [key: string]: string | number | boolean | object | null

}
