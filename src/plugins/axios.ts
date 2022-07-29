
import store from "@/store"
import { message } from "ant-design-vue"
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

const baseUrl = '/'

declare interface ResponseModel<T = any> {
    status: number
    msg: string
    data: T
}

const axios = Axios.create({
    baseURL: "",
    timeout: 180000, // 请求超时时间
    withCredentials: true
})



// 请求拦截器
axios.interceptors.request.use(
    (request: AxiosRequestConfig) => {
        return request
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    (response: AxiosResponse<ResponseModel<any>>) => {
        return response.data
    },
    (error: AxiosError) => {
        message.error("网络错误")
        return Promise.reject(error)
    }
)

const http = {
    get: (url: string, data: any) => {
        return axios.get(url, { params: data })
    },
    post: (url: string, data: any) => {
        return axios.post(url, data)
    },
}

export default http


