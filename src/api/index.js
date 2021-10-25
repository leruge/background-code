import axios from 'axios'
// import Qs from 'qs'
import router from '@/router/index'
import { ElMessage } from 'element-plus'
import store from '@/store'

const toLogin = () => {
    store.dispatch('admin/logout').then(() => {
        router.push({
            path: '/login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        })
    })
}

const api = axios.create({
    baseURL: import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
    timeout: 10000,
    responseType: 'json'
})

api.interceptors.request.use(
    request => {
        request.headers.Authorization = localStorage.token
        return request
    }
)

api.interceptors.response.use(
    response => {
        if (response.data.code >= 0) {
            return Promise.resolve(response.data)
        } else {
            toLogin()
        }
    },
    error => {
        let message = error.message
        if (message == 'Network Error') {
            message = '后端网络故障'
        } else if (message.includes('timeout')) {
            message = '接口请求超时'
        } else if (message.includes('Request failed with status code')) {
            message = '接口' + message.substr(message.length - 3) + '异常'
        }
        ElMessage({
            message,
            type: 'error'
        })
        return Promise.reject(error)
    }
)

export default api
