import api from '@/api'

const state = () => ({
    username: localStorage.username || '',
    token: localStorage.token || '',
    failure_time: localStorage.failure_time || '',
    permissions: []
})

const getters = {
    isLogin: state => {
        let retn = false
        if (state.token) {
            let unix = Date.parse(new Date())
            if (unix < state.failure_time * 1000) {
                retn = true
            }
        }
        return retn
    }
}

const actions = {
    login({ commit }, data) {
        return new Promise((resolve, reject) => {
            // 通过 mock 进行登录
            api.post('admin/login', data).then(res => {
                if (res.code === 1) {
                    commit('setLogin', res.data)
                }
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({ commit }) {
        commit('setLogout')
        commit('menu/invalidRoutes', null, { root: true })
        commit('keepAlive/clean', null, { root: true })
        commit('menu/removeRoutes', null, { root: true })
    },
    // 获取我的权限
    getPermissions({ commit }) {
        return new Promise(resolve => {
            // 通过 mock 获取权限
            api.post('admin/lerugeGetRuleArray').then(res => {
                commit('setPermissions', res.data.permissions)
                resolve(res.data.permissions)
            })
        })
    }
}

const mutations = {
    setLogin(state, data) {
        localStorage.setItem('username', data.username)
        localStorage.setItem('token', data.token)
        localStorage.setItem('failure_time', data.failure_time)
        state.username = data.username
        state.token = data.token
        state.failure_time = data.failure_time
    },
    setLogout(state) {
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        localStorage.removeItem('failure_time')
        state.username = ''
        state.token = ''
        state.failure_time = ''
    },
    setPermissions(state, permissions) {
        state.permissions = permissions
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
