import api from '@/api'
export default {
    namespaced: true,
    state: {
        isLogin: false,
        name: '',
        emailHash: ''
    },
    getters: {
    },
    mutations: {
        login (state) {
            state.isLogin = true
        },
        logout (state) {
            state.isLogin = false
        },
        setName (state, value) {
            state.name = value
        },
        setEmailHash (state, value) {
            state.emailHash = value
        }
    },
    actions: {
        login ({ commit }, payload) {
            api.auth.login(payload).then(res => {
                if (!res) {
                    return
                }
                if (res && res.data && res.data.id) {
                    commit('setEmailHash', res.data.emailHash)
                    commit('login')
                    commit('modal/setModal', {
                        show: false
                    }, { root: true })
                } else {
                    commit('modal/setModal', {
                        show: true,
                        head: '알림',
                        body: res.data,
                        name: 'modal'
                    }, { root: true })
                }
            })
        },
        logout ({ commit }, payload) {
            api.auth.logout().then(res => {
                if (!res) {
                    console.log(res)
                    return
                }
                commit('logout')
            })
        },
        autoLogin ({ commit }) {
            return api.auth.autoLogin().then(res => {
                console.log(res)
                if (!res) {
                    return
                }
                if (res.data.login) {
                    commit('setName', res.data.name)
                    commit('setEmailHash', res.data.emailHash)
                    commit('login')
                } else {
                    commit('logout')
                }
            })
        }
    }
}
