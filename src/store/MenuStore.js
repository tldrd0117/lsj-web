import router from '@/router'
import pathToregexp from 'path-to-regexp'
export default {
    namespaced: true,
    state: {
        menuMap: [{
            path: '/:key',
            name: 'home'
        },
        {
            path: '/:key/blog',
            name: 'blog-list'
        },
        {
            path: '/:key/board',
            name: 'board-list'
        }],
        menuViews: [],
        curView: null
    },
    getters: {
        getCurViewKey: (state) => {
            if (!state.curView) {
                return -1
            }
            return state.curView.key
        },
        getCurViewName: (state) => {
            return state.curView.name
        },
        isInKey: (state) => (key) => {
            return state.menuViews.find(item => item.key === key)
        },
        menuPaths (state) {
            return state.menuMap.map(item => item.path)
        },
        menuNames (state) {
            return state.menuMap.map(item => item.name)
        },
        menuNameFromPath: (state) => (path) => {
            return state.menuMap.find(item => {
                const regexp = pathToregexp(item.path)
                return regexp.test(path)
            }).name
        },
        menuViewKeys (state) {
            return state.menuViews.map(item => item.key)
        },
        menuPathFromKey: (state, getters) => (key) => {
            return getters.menuObjFromKey(key).path
        },
        menuNameFromKey: (state, getters) => (key) => {
            return getters.menuObjFromKey(key).name
        },
        menuObjFromKey: (state, getters) => (key) => {
            return state.menuViews.find((item, index) => {
                return item.key === key
            })
        }
    },
    mutations: {
        setCurView (state, obj) {
            state.curView = obj
        },
        setCurViewName (state, name) {
            state.curView.name = name
        },
        pushView (state, obj) {
            state.menuViews.push(obj)
        },
        removeView (state, index) {
            state.menuViews.splice(index, 1)
        }
    },
    actions: {
        newView ({ commit, state, getters }, menuObj) {
            commit('pushView', menuObj)
        },
        selectView ({ state, commit, getters, dispatch }, key) {
            const menuObj = getters.menuObjFromKey(key)
            commit('setCurView', menuObj)
        },
        closeView ({ state, commit, getters, dispatch }, key) {
            const menuObj = getters.menuObjFromKey(key)
            const removeIndex = state.menuViews.findIndex((item, index) => item === menuObj)
            console.log('before', state.menuViews, key)
            commit('removeView', removeIndex)
            console.log('after', state.menuViews, key)

            let nextMenuObj = null
            if (removeIndex !== 0 && state.menuViews.length > 0) {
                nextMenuObj = state.menuViews[removeIndex - 1]
                router.replace({
                    name: nextMenuObj.name,
                    params: {
                        key: nextMenuObj.key
                    }
                })
            } else if (removeIndex === 0 && state.menuViews.length > 0) {
                nextMenuObj = state.menuViews[removeIndex]
                router.replace({
                    name: nextMenuObj.name,
                    params: {
                        key: nextMenuObj.key
                    }
                })
            } else {
                router.push({
                    name: 'home',
                    params: {
                        key: '' + Date.now()
                    }
                })
            }
        }
    }
}
