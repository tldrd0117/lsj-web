import api from '@/api'
import ErrorCheck from '@/utils/ErrorCheck'
export default {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        signUp ({ commit }, payload) {
            const { userid, password, name, email } = payload
            const error = [
                ErrorCheck.checkUserid(userid),
                ErrorCheck.checkPassword(password),
                ErrorCheck.checkName(name),
                ErrorCheck.checkEmail(email)
            ].find(item => item.isError)
            console.log(error)
            if (error) {
                commit('modal/setModal', {
                    show: true,
                    head: '알림',
                    body: error.errorMsg,
                    name: 'modal'
                }, {
                    root: true
                })
                return
            }
            api.user.signUp(payload).then(res => {
                if (!res) {
                    return
                }
                if (res && res.id) {
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
        }
    }
}
