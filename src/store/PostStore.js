import BlogStore from './BlogStore'
import BoardStore from './BoardStore'
const state = {

}
const getters = {
    getCurViewNamePrefix (state, getters, rootState, rootGetters) {
        const name = rootGetters['menu/getCurViewName']
        return name.split('-')[0]
    },
    postData (state, getters, rootState, rootGetters) {
        const moduleState = state[getters.getCurViewNamePrefix]
        if (!moduleState) return undefined
        const data = moduleState.postData
        if (!data) return undefined
        const key = rootGetters['menu/getCurViewKey']
        if (!key) return undefined
        const postData = data.find(item => item.key === key)
        if (!postData) return undefined
        return postData.data
    },
    replyData (state, getters, rootState, rootGetters) {
        const moduleState = state[getters.getCurViewNamePrefix]
        if (!moduleState) return undefined
        const data = moduleState.postData
        if (!data) return undefined
        const key = rootGetters['menu/getCurViewKey']
        if (!key) return undefined
        const postData = data.find(item => item.key === key)
        if (!postData) return undefined
        return postData.reply
    },
    selectedPost (state, getters, rootState, rootGetters) {
        const moduleState = state[getters.getCurViewNamePrefix]
        if (!moduleState) return undefined
        const data = moduleState.postData
        if (!data) return undefined
        const key = rootGetters['menu/getCurViewKey']
        if (!key) return undefined
        const postData = data.find(item => item.key === key)
        return postData ? postData.selectedPost : {
            title: '',
            author: '',
            create_time: '',
            tags: '',
            body: ''
        }
    }
}

const mutations = {
}

const actions = {
    setSelectedPost ({ state, getters, commit, rootGetters }, { selectedPost }) {
        const key = rootGetters['menu/getCurViewKey']
        commit(`${getters.getCurViewNamePrefix}/setSelectedPost`, {
            key, selectedPost
        })
    },
    addPost ({ state, getters, dispatch }, { key, type, id }) {
        return dispatch(`${type}/addPost`, { key, id })
    },
    // KEY
    onActivate ({ dispatch, getters, rootGetters }, payload) {
        return dispatch(`${getters.getCurViewNamePrefix}/onActivate`, payload)
    },
    // KEY
    onList ({ commit, dispatch, getters }, payload) {
        return dispatch(`${getters.getCurViewNamePrefix}/onList`, payload)
    },
    // KEY SELECTEDPOST
    onEdit ({ commit, dispatch, rootState, getters }, payload) {
        return dispatch(`${getters.getCurViewNamePrefix}/onEdit`, payload)
    },
    // SELECTEDPOST KEY
    onView ({ commit, dispatch, getters }, payload) {
        return dispatch(`${getters.getCurViewNamePrefix}/onView`, payload)
    },
    onEditComplete ({ commit, dispatch, getters, rootState }, payload) {
        return dispatch(`${getters.getCurViewNamePrefix}/onEditComplete`, payload)
    },
    onRemove ({ dispatch, getters }, payload) {
        return dispatch(`${getters.getCurViewNamePrefix}/onRemove`, payload)
    },
    onReplyOpen ({ dispatch, getters, rootGetters }, payload) {
        return dispatch(`${getters.getCurViewNamePrefix}/onReplyOpen`, payload)
    },
    onReplyAdd ({ dispatch, getters, rootGetters }, payload) {
        return dispatch(`${getters.getCurViewNamePrefix}/onReplyAdd`, payload)
    }
}
// getCurViewName
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    modules: {
        blog: BlogStore,
        board: BoardStore
    }
}
