import api from '@/api'
import moment from 'moment-timezone'
import ErrorCheck from '@/utils/ErrorCheck'
import router from '@/router'

const initPostData = {
    key: '',
    data: [],
    selectedPost: {}
}

const state = {
    // { key, data, state, selectedPost}
    postData: []
}

const getters = {
    findPostData: (state) => (key) => {
        return state.postData.find(item => {
            return item.key === key
        })
    },
    findSelectedPost: (state) => (key) => {
        const value = state.postData.find(item => {
            return item.key === key
        })
        return value ? value.selectedPost : {}
    }
}

const mutations = {
    setSelectedPost (state, { key, selectedPost }) {
        const postData = state.postData.find(item => {
            return item.key === key
        })
        postData.selectedPost = selectedPost || {}
    }
}

const actions = {
    addPost ({ state }, { key }) {
        state.postData.push({
            ...initPostData,
            key
        })
    },
    // KEY
    async onActivate ({ dispatch, getters, rootGetters, commit }, { id }) {
        const name = rootGetters['menu/getCurViewName']
        let selectedPost = null
        if (id) {
            const res = await dispatch('getBoard', { id })
            if (res && res.data && res.data.length > 0) {
                selectedPost = res.data[0]
            } else {
                router.replace('/board')
            }
        }
        if (!selectedPost) {
            const key = rootGetters['menu/getCurViewKey']
            selectedPost = getters.findSelectedPost(key)
        }

        if (name === 'board-list') {
            return dispatch('onList', {
                reload: true
            })
        } else if (name === 'board-write') {
            return dispatch('onEdit', {
                selectedPost
            })
        } else if (name === 'board-view') {
            return dispatch('onView', {
                selectedPost
            })
        }
    },
    // KEY
    async onList ({ commit, dispatch, getters, rootGetters }, { reload }) {
        const key = rootGetters['menu/getCurViewKey']
        commit('setSelectedPost', {
            selectedPost: {},
            key
        })
        commit('nav/setShow', {
            backShow: false,
            removeShow: false,
            editShow: true,
            editCompleteShow: false
        }, { root: true })

        if (!reload) {
            return Promise.resolve()
        }
        router.push({
            name: 'board-list',
            params: {
                key
            }
        })
        return dispatch('getBoardList', {
            key
        })
    },
    // KEY SELECTEDPOST
    onEdit ({ commit, dispatch, rootState, getters, rootGetters }) {
        if (!rootState.auth.isLogin) {
            commit('modal/setModal', {
                show: !this.show,
                name: 'loginModal'
            }, { root: true })
            return
        }
        const key = rootGetters['menu/getCurViewKey']
        const selectedPost = getters.findSelectedPost(key)
        if (selectedPost.id && selectedPost.author !== rootState.auth.name) {
            commit('modal/setModal', {
                show: true,
                head: '알림',
                body: '작성자만 수정할 수 있습니다.',
                name: 'modal'
            }, {
                root: true
            })
            return
        }
        commit('nav/setShow', {
            backShow: true,
            removeShow: false,
            editShow: false,
            editCompleteShow: true
        }, { root: true })
        router.push({
            name: 'board-write',
            params: {
                key
            }
        })
    },
    // SELECTEDPOST KEY
    async onView ({ commit, dispatch, getters, rootGetters }, { selectedPost }) {
        const key = rootGetters['menu/getCurViewKey']
        commit('setSelectedPost', {
            selectedPost,
            key
        })
        commit('nav/setShow', {
            backShow: true,
            removeShow: true,
            editShow: true,
            editCompleteShow: false
        }, { root: true })
        router.push({
            name: 'board-view',
            params: {
                key,
                id: selectedPost.id
            }
        })
    },
    onEditComplete ({ commit, dispatch, getters, rootState, rootGetters }) {
        const key = rootGetters['menu/getCurViewKey']
        const selectedPost = getters.findSelectedPost(key)
        const error = [ErrorCheck.checkTitle(selectedPost.title),
            ErrorCheck.checkContents(selectedPost.body)]
            .find(item => item.isError)
        if (error) {
            commit('modal/setModal', {
                show: true,
                head: '알림',
                body: error.errorMsg
            }, {
                root: true
            })
            return
        }
        const userName = rootState.auth.name
        if (!selectedPost.id) {
            return dispatch('addBoard', {
                title: selectedPost.title,
                body: selectedPost.body,
                author: userName,
                tags: selectedPost.tags || ''
            }).then(res => dispatch('onList', {
                reload: true
            })).catch(reason => console.log(reason))
        } else {
            return dispatch('updatePost', {
                id: selectedPost.id,
                title: selectedPost.title,
                body: selectedPost.body,
                author: userName,
                tags: selectedPost.tags
            }).then(res => dispatch('onList', {
                reload: true
            })).catch(reason => console.log(reason))
        }
    },
    onRemove ({ dispatch, getters, rootGetters }) {
        const key = rootGetters['menu/getCurViewKey']
        const selectedPost = getters.findSelectedPost(key)
        if (!selectedPost || !selectedPost.id) { return }
        return dispatch('deletePost', {
            id: selectedPost.id
        }).then(res => dispatch('onList', {
            reload: true
        })).catch(reason => console.log(reason))
    },
    checkLogin ({ commit }, { res }) {
        return new Promise((resolve, reject) => {
            console.log(res)
            if (res && res.data && res.data.error) {
                commit('modal/setModal', {
                    show: !this.show,
                    name: 'loginModal'
                }, { root: true })
                reject(new Error('not Login'))
            }
            resolve(res)
        })
    },
    getBoardList ({ getters }, { key }) {
        return api.post.getBoardList().then(res => {
            getters.findPostData(key).data = res.data.map(item => {
                item.create_time = moment(item.create_time).fromNow()
                return item
            })
        })
    },
    getBoard ({ getters }, body) {
        return api.post.getBoard(body).then(res => {
            if (res.data && res.data.length > 0) {
                res.data[0].create_time = moment(res.data[0].create_time).fromNow()
            }
            return res
        })
    },
    addBoard ({ dispatch }, body) {
        return api.post.addBoard(body).then(res => dispatch('checkLogin', { res }))
    },
    updatePost ({ dispatch }, body) {
        return api.post.updatePost(body).then(res => dispatch('checkLogin', { res }))
    },
    deletePost ({ dispatch }, body) {
        return api.post.deletePost(body).then(res => dispatch('checkLogin', { res }))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
