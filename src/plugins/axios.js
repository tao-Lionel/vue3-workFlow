
import Auth from "@/plugins/utils/auth"
import { goLoginPage, sessionStorageUtil } from "@/plugins/utils/util"
import store from "@/store"
import { message } from "ant-design-vue"
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import global from "../global"
import { showFullScreenLoading, tryHideFullScreenLoading } from "./loading"

let isReloadToken = false // 是否正在刷新token

declare interface ResponseModel<T = any> {
    status: number
    msg: string
    data: T
}

const axios = Axios.create({
    baseURL: "",
    // baseURL: global.baseUrl,
    timeout: 180000, // 请求超时时间
    withCredentials: true
})

async function reloadToken() {
    //   const { status, data } = await axios.post("/uc/user/refreshToken", { refreshToken: Auth.getRefreshToken() });
    //   const {token:string, refreshToken:string} = data;
    //   if (status === 1) {
    //     Auth.setToken(toString(token),  toString(refreshToken));
    //   }
    //   console.log(`重置token成功咯`);
    //   isReloadToken = false;
}

// 请求拦截器
axios.interceptors.request.use(
    (request: AxiosRequestConfig) => {
        if (request.params) {
            if (!request.params.noLoading) {
                showFullScreenLoading()
            } else {
                const params = request.params
                delete params.noLoading
                request.params = params
            }
        }

        const token = Auth.getToken()
        if (token) {
            request.headers.token = Auth.getToken()
            request.headers.refreshToken = Auth.getRefreshToken()
        }

        request.headers["Content-Type"] = "application/json"
        request.headers.platform = 1
        return request
    },
    (error: AxiosError) => {
        tryHideFullScreenLoading()
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    (response: AxiosResponse<ResponseModel<any>>) => {
        // 加载图判断
        if (response.config.params) {
            if (!response.config.params.noLoading) {
                tryHideFullScreenLoading()
            } else {
                const params = response.config.params
                delete params.noLoading
                response.config.params = params
            }
        }
        // 登录超时判断
        if (response.headers.tokenstatus === "-1" && !isReloadToken) {
            console.log(`重新刷新token咯————————————`)
            isReloadToken = true
            reloadToken()
        }

        const rs = response.data
        // 请求结果失败
        if (response.status !== 200) {
            message.error("网络错误")
            return Promise.reject(new Error("网络错误"))
        }

        // 状态码
        if (rs.status === -100) {
            // 未登录
            Auth.removeToken()
            if (!store.getters.isShowLogin) {
                // store.commit("setIsShowLogin", true);
            }
            const requestUrl = response.config.url
            Auth.removeToken()
            sessionStorageUtil.clear()
            console.log(`requestUrl===`, requestUrl)
            if (requestUrl === "/uc/user/getCurrentUser") {
                // 请求资源，说明是重新刷新，此时强制退出到登录页面
                // store.commit("setIsShowLogin", false);
            } else {
                // store.commit("setIsShowLogin", true);
            }
            goLoginPage()
            return Promise.reject()
        }
        if (rs.status === -200) {
            // 没有权限
            message.error("没有权限")
            return Promise.reject(rs.msg)
        }
        if (rs.status === -300) {
            // 没有权限
            // message.error("没有权限")
            return Promise.reject(rs.msg)
        }
        if (rs.status < 0) {
            // 其他错误
            message.error(rs.msg)
            return Promise.reject(new Error("网络错误"))
        }
        return response.data
    },
    (error: AxiosError) => {
        message.error("网络错误")
        tryHideFullScreenLoading()
        return Promise.reject(error)
    }
)

const http = {
    get: (url: string, data: any) => {
        return axios.get(global.microUrl + "/" + url, { params: data })
    },
    post: (url: string, data: any) => {
        return axios.post(global.microUrl + "/" + url, data)
    },
    getSso: (url: string, data: any) => {
        return axios.get(global.ssoUrl + "/" + url, data)
    },
    postSso: (url: string, data: any) => {
        return axios.post(global.ssoUrl + "/" + url, data)
    }
}

export default http


Plugin.install = function (Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;