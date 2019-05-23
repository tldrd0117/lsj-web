import api from './api'
import store from '@/store'
api.interceptors.request.use((config) => {
    store.commit('nav/setProgressShow', true)
    return config
})
api.interceptors.response.use((config) => {
    store.commit('nav/setProgressShow', false)
    return config
}, (err) => {
    store.commit('nav/setProgressShow', false)
    console.log(err)
})

export default class PostApi {
    getBlogList () {
        return api.get('post/blog/list')
    }
    getBlog ({ id }) {
        return api.get(`post/blog/detail?id=${id}`)
    }
    getBoard ({ id }) {
        return api.get(`post/board/detail?id=${id}`)
    }
    getReplyList ({ postid }) {
        return api.get(`post/reply?postid=${postid}`)
    }
    addBlog (body) {
        return api.post('post/blog', body)
    }
    getBoardList () {
        return api.get('post/board/list')
    }
    addBoard (body) {
        return api.post('post/board', body)
    }
    addReply (body) {
        return api.post('post/reply', body)
    }
    updatePost (body) {
        return api.post('post/update', body)
    }
    deletePost (body) {
        return api.post('post/delete', body)
    }
    viewPost (body) {
        return api.post('post/view', body)
    }
    likePost (body) {
        return api.post('post/likenum', body)
    }
}
