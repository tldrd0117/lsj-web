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

export default class UserApi {
    signUp (body) {
        return api.post('user/signup', body)
    }
}
