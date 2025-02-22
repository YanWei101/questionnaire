
import axios from 'axios'
import {message} from 'antd'
const ajax = axios.create({
  timeout: 5000,
})


ajax.interceptors.response.use(res=>{
    const resData = (res.data || {}) as responseType
    const {errno,data,msg} = resData
    if(errno !== 0){
        if(msg){
            message.error(msg)
        }
        throw new Error(msg)
    }
    return data as any
})

export default ajax
export type responseType = {
    errno:number
    data:responseData
    msg:string
}

export type responseData = {
    [key:string]:any
}
