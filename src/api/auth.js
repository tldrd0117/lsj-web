import api from './api'
import store from '@/store'
api.interceptors.request.use((config) => {
    store.commit('nav/setProgressShow', true)
    return config
})
api.interceptors.response.use((config) => {
    store.commit('nav/setProgressShow', false)
    return config
})

export default class AuthApi {
    login (body) {
        return api.post('auth/login', body)
    }
    logout (body) {
        return api.get('auth/logout', body)
    }
    autoLogin () {
        return api.post('auth/autoLogin')
    }
}
